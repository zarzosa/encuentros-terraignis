export const sectors = [
  { value: "energy_operator", label: "Empresa energética / operadora" },
  { value: "supplier", label: "Empresa proveedora de bienes o servicios" },
  { value: "public_agency", label: "Organismo público" },
  { value: "public_company", label: "Empresa pública / provincial" },
  { value: "business_chamber", label: "Cámara / asociación empresarial" },
  { value: "academic", label: "Institución académica" },
  { value: "media", label: "Medio de comunicación" },
  { value: "other", label: "Otro" },
] as const;

export type SectorValue = (typeof sectors)[number]["value"];

export const consentText =
  "Autorizo el uso de los datos consignados en este formulario para la organización y las comunicaciones vinculadas al Encuentro.";

export const successPath = "/inscripcion/exito";

/** Versión del texto de consentimiento que se guarda con cada inscripción. Cambiarla si cambia el texto. */
export const privacyVersion = "2026-10-v1";

/** Textos que se muestran con `event.registrationOpen` en false. */
export const registrationClosed = {
  title: "Inscripciones cerradas",
  text: "Ya no se reciben nuevas inscripciones para el Encuentro.",
} as const;

export const registrationMessages = {
  closed: `${registrationClosed.title}. ${registrationClosed.text}`,
  duplicate: "Este correo ya posee una inscripción registrada para el encuentro.",
  error: "No pudimos completar la inscripción. Intentá nuevamente en unos instantes.",
  invalid: "Revisá los campos marcados.",
  rateLimited: "Recibimos muchos intentos desde tu conexión. Esperá unos minutos y volvé a intentar.",
  pending: "Confirmando inscripción...",
} as const;
