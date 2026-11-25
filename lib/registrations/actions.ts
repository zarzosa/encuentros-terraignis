"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { event } from "@/content/event";
import { privacyVersion, successPath } from "@/content/registration";
import { sendRegistrationConfirmation } from "@/lib/email/send-registration-confirmation";
import { createLimiter } from "@/lib/rate-limit";
import { insertRegistration, markConfirmationSent } from "@/lib/registrations/repository";
import {
  formDataToRegistration,
  registrationSchema,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/validation/registration";

export type RegistrationState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: FieldErrors }
  | { status: "duplicate" }
  | { status: "rate_limited" }
  | { status: "closed" }
  | { status: "error" };

/** Un humano tarda varios segundos en completar el formulario; un bot, milisegundos. */
const MIN_FILL_MS = 1500;

/**
 * 15 envíos cada 10 minutos por IP (en memoria, como copat3D: frena scripts, no a alguien
 * decidido). Alto a propósito: desde una misma oficina pueden inscribirse varias personas.
 */
const exceedsSubmitLimit = createLimiter(10 * 60 * 1000, 15);

export async function registerAction(
  _previous: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  // Ocultar el formulario no alcanza: el POST sigue siendo accesible.
  if (!event.registrationOpen) {
    return { status: "closed" };
  }

  // Honeypot: un humano no ve ni completa este campo. Se simula éxito sin guardar.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    redirect(successPath);
  }

  // Tiempo de completado medido en el navegador (no depende del reloj del servidor).
  // Sin el dato o demasiado rápido: bot. También se simula éxito, para no darle pistas.
  const elapsed = Number(formData.get("elapsed"));
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    redirect(successPath);
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "sin-ip";
  if (exceedsSubmitLimit(ip)) {
    return { status: "rate_limited" };
  }

  const parsed = registrationSchema.safeParse(formDataToRegistration(formData));
  if (!parsed.success) {
    return { status: "invalid", fieldErrors: toFieldErrors(parsed.error) };
  }

  let result;
  try {
    result = await insertRegistration(event.slug, parsed.data, privacyVersion);
  } catch (error) {
    // Nunca exponer errores de la base al usuario.
    console.error("[registro] Falló el INSERT en registrations", error);
    return { status: "error" };
  }

  if (result.status === "duplicate") {
    return { status: "duplicate" };
  }

  // La inscripción ya está guardada. El email se intenta DESPUÉS de responder (after):
  // la persona ve la confirmación al instante y una falla del correo nunca la invalida.
  const registrationId = result.id;
  const { email, fullName } = parsed.data;
  after(async () => {
    const sent = await sendRegistrationConfirmation({ email, fullName });
    if (sent.status !== "sent") return;
    try {
      await markConfirmationSent(registrationId);
    } catch (error) {
      console.error("[registro] El email salió pero no se pudo marcar email_sent", error);
    }
  });

  redirect(successPath);
}
