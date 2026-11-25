"use client";

import { useActionState, useEffect, useRef, useState, startTransition, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { ctaLabels } from "@/content/navigation";
import { consentText, registrationMessages, sectors } from "@/content/registration";
import type { CountryOption } from "@/lib/countries";
import { suggestEmail } from "@/lib/text/email-suggestion";
import { registerAction, type RegistrationState } from "@/lib/registrations/actions";
import {
  formDataToRegistration,
  registrationSchema,
  toFieldErrors,
  type FieldErrors,
  type RegistrationField,
} from "@/lib/validation/registration";

const inputClassName = "h-12 bg-white px-4 text-base md:text-base";
const selectClassName =
  "w-full [&_select]:h-12 [&_select]:bg-white [&_select]:pr-10 [&_select]:pl-4 [&_select]:text-base [&>svg]:right-4";

/* Orden de foco al validar: el primer campo con error recibe el foco. */
const fieldOrder: RegistrationField[] = [
  "fullName",
  "organization",
  "role",
  "sector",
  "sectorOther",
  "city",
  "region",
  "country",
  "email",
  "phone",
  "consent",
];

const initialState: RegistrationState = { status: "idle" };

export function RegistrationForm({ countries }: { countries: CountryOption[] }) {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [sector, setSector] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // Momento en que el formulario quedó listo: el servidor descarta envíos de menos de 1,5 s (bots).
  const readyAt = useRef(0);

  useEffect(() => {
    readyAt.current = performance.now();
  }, []);

  const errors =
    Object.keys(clientErrors).length > 0
      ? clientErrors
      : state.status === "invalid"
        ? state.fieldErrors
        : {};

  const statusMessage =
    state.status === "duplicate"
      ? registrationMessages.duplicate
      : state.status === "rate_limited"
        ? registrationMessages.rateLimited
        : state.status === "closed"
          ? registrationMessages.closed
          : state.status === "error"
            ? registrationMessages.error
            : null;

  useEffect(() => {
    if (state.status === "invalid") focusFirstError(state.fieldErrors);
    if (
      state.status === "duplicate" ||
      state.status === "rate_limited" ||
      state.status === "closed" ||
      state.status === "error"
    ) {
      statusRef.current?.focus();
    }
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const formData = new FormData(event.currentTarget);
    const parsed = registrationSchema.safeParse(formDataToRegistration(formData));
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setClientErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }

    setClientErrors({});
    formData.set("elapsed", String(Math.round(performance.now() - readyAt.current)));
    startTransition(() => formAction(formData));
  }

  function clearError(field: RegistrationField) {
    if (!clientErrors[field]) return;
    setClientErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
      clearError(target.name as RegistrationField);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      className="grid grid-cols-1 gap-6"
    >
      <p className="text-sm text-terra-ink">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      {/* Honeypot: invisible para personas, los bots suelen completarlo. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">No completar este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="fullName" label="Nombre y apellido" required error={errors.fullName}>
        <Input id="fullName" name="fullName" required autoComplete="name" className={inputClassName} {...a11y("fullName", errors)} />
      </Field>

      <Field id="organization" label="Empresa / Organismo / Institución" required error={errors.organization}>
        <Input
          id="organization"
          name="organization" required
          autoComplete="organization"
          className={inputClassName}
          {...a11y("organization", errors)}
        />
      </Field>

      <Field id="role" label="Cargo / Función" required error={errors.role}>
        <Input
          id="role"
          name="role" required
          autoComplete="organization-title"
          className={inputClassName}
          {...a11y("role", errors)}
        />
      </Field>

      <Field id="sector" label="Sector" required error={errors.sector}>
        <NativeSelect
          id="sector"
          name="sector" required
          value={sector}
          onChange={(event) => setSector(event.target.value)}
          className={selectClassName}
          {...a11y("sector", errors)}
        >
          <NativeSelectOption value="" disabled>
            Seleccioná un sector
          </NativeSelectOption>
          {sectors.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      {sector === "other" && (
        <Field id="sectorOther" label="Especifique el sector" required error={errors.sectorOther}>
          <Input id="sectorOther" name="sectorOther" required className={inputClassName} {...a11y("sectorOther", errors)} />
        </Field>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="city" label="Ciudad" required error={errors.city}>
          <Input
            id="city"
            name="city" required
            autoComplete="address-level2"
            className={inputClassName}
            {...a11y("city", errors)}
          />
        </Field>

        <Field id="region" label="Provincia / Estado / Región" error={errors.region}>
          <Input
            id="region"
            name="region"
            autoComplete="address-level1"
            className={inputClassName}
            {...a11y("region", errors)}
          />
        </Field>
      </div>

      <Field id="country" label="País" required error={errors.country}>
        <NativeSelect
          id="country"
          name="country" required
          autoComplete="country"
          defaultValue=""
          className={selectClassName}
          {...a11y("country", errors)}
        >
          <NativeSelectOption value="" disabled>
            Seleccioná un país
          </NativeSelectOption>
          {countries.map((country) => (
            <NativeSelectOption key={country.code} value={country.code}>
              {country.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      <Field id="email" label="Correo electrónico" required error={errors.email}>
        <Input
          id="email"
          name="email" required
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          ref={emailRef}
          onBlur={(event) => setEmailSuggestion(suggestEmail(event.target.value))}
          className={inputClassName}
          {...a11y("email", errors)}
        />
        {emailSuggestion && (
          <p className="text-sm text-terra-ink" role="status">
            ¿Quisiste decir{" "}
            <button
              type="button"
              className="font-bold text-terra-petrol underline underline-offset-2"
              onClick={() => {
                if (emailRef.current) emailRef.current.value = emailSuggestion;
                setEmailSuggestion(null);
                clearError("email");
              }}
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
      </Field>

      <Field
        id="phone"
        label="Teléfono de contacto"
        hint="Incluí el código de país, por ejemplo +54 para Argentina."
        error={errors.phone}
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={inputClassName}
          {...a11y("phone", errors, true)}
        />
      </Field>

      <div className="grid gap-2 border-t border-border pt-6">
        <div className="flex gap-3">
          <Checkbox
            id="consent"
            name="consent" required
            onCheckedChange={() => clearError("consent")}
            className="mt-0.5 size-5 border-input [&_svg]:size-4"
            {...a11y("consent", errors)}
          />
          <Label htmlFor="consent" className="block text-[0.9375rem] leading-relaxed font-normal">
            {consentText} <span aria-hidden="true">*</span>
          </Label>
        </div>
        {errors.consent && <FieldError id="consent">{errors.consent}</FieldError>}
      </div>

      <Button type="submit" variant="accent" size="cta" className="w-full" disabled={isPending} aria-disabled={isPending}>
        {isPending ? registrationMessages.pending : ctaLabels.submit}
      </Button>

      <p
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        className="min-h-5 text-[0.9375rem] font-medium text-destructive outline-none"
      >
        {statusMessage ?? (Object.keys(errors).length > 0 ? registrationMessages.invalid : null)}
      </p>
    </form>
  );
}

function focusFirstError(fieldErrors: FieldErrors) {
  const first = fieldOrder.find((field) => fieldErrors[field]);
  if (first) document.getElementById(first)?.focus();
}

function a11y(field: RegistrationField, errors: FieldErrors, hasHint = false) {
  const describedBy = [hasHint ? `${field}-hint` : null, errors[field] ? `${field}-error` : null]
    .filter(Boolean)
    .join(" ");
  return {
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

function Field({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Label htmlFor={id} className="text-[0.9375rem] leading-snug">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </Label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-terra-ink/80">
          {hint}
        </p>
      )}
      {error && <FieldError id={id}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={`${id}-error`} className="text-sm font-medium text-destructive">
      {children}
    </p>
  );
}
