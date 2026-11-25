import { PartnerLogo } from "@/components/partners/partner-logo";
import { event } from "@/content/event";
import { isLinkAvailable } from "@/content/navigation";
import { programNotice } from "@/content/program";

const footerLinks = [
  { href: "#programa", label: "Programa" },
  { href: "#inscripcion", label: "Inscripción" },
  { href: "#acompanan", label: "Acompañan" },
].filter(isLinkAvailable);

export function EventFooter() {
  return (
    <footer className="surface-dark bg-terra-navy text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-lg font-extralight uppercase">Encuentro:</p>
          <p className="text-2xl leading-tight font-extrabold uppercase">{event.name}</p>
          <p className="mt-4 text-white/80">
            {event.dateLabel}
            <br />
            {event.location.name}. {event.location.address} · {event.location.city},{" "}
            {event.location.province}
          </p>
        </div>

        <nav aria-label="Pie de página" className="lg:col-span-3">
          <p className="text-lg font-semibold">Secciones:</p>
          <ul className="mt-5 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 lg:col-span-4">
          {event.partnerGroups.map((group) => (
            <div key={group.role}>
              <p className="text-lg font-semibold">{group.role}:</p>
              <ul className="mt-4 space-y-3">
                {group.partners.map((partner) => (
                  <li key={partner.name}>
                    <PartnerLogo partner={partner} className="h-12" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/75 sm:flex-row sm:justify-between">
          <p>© 2026 {event.organizer}</p>
          <p>{programNotice}</p>
        </div>
      </div>
    </footer>
  );
}
