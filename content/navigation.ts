import { event } from "@/content/event";

/** Con la inscripción cerrada, los links a #inscripcion no se muestran en ningún menú. */
export function isLinkAvailable(link: { href: string }) {
  return event.registrationOpen || link.href !== "#inscripcion";
}

export const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#programa", label: "Programa" },
  { href: "#acompanan", label: "Acompañan" },
  { href: "#inscripcion", label: "Inscripción" },
].filter(isLinkAvailable);

export const mainActions = [
  {
    href: "#inscripcion",
    title: "Inscripción",
    description: "Completá el formulario para registrar tu participación.",
  },
  {
    href: "#programa",
    title: "Programa",
    description: "Paneles y actividades de las dos jornadas.",
  },
  {
    href: "#acompanan",
    title: "Acompañan",
    description: "Instituciones que organizan y acompañan el encuentro.",
  },
].filter(isLinkAvailable);

/* Textos de los botones (pedido de la organización). Cambiarlos acá cambia todo el sitio. */
export const ctaLabels = {
  /** Botón naranja principal (hero, header, menú): lleva al formulario. */
  primary: "Inscribirme",
  /** Botón que envía el formulario. */
  submit: "Confirmar inscripción",
} as const;
