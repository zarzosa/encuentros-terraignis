import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { StripeBand } from "@/components/brand/stripes";
import { SectionHeading } from "@/components/layout/section-heading";
import { RegistrationForm } from "@/components/registration/registration-form";
import { event } from "@/content/event";
import { registrationClosed } from "@/content/registration";
import { getCountryOptions } from "@/lib/countries";
import { cn } from "@/lib/utils";

/* Con la inscripción cerrada la sección se mantiene (el QR impreso apunta a #inscripcion) y avisa. */
export function EventRegistration() {
  const isOpen = event.registrationOpen;

  return (
    <section
      id="inscripcion"
      aria-labelledby="registration-title"
      className="surface-dark relative isolate scroll-mt-16 overflow-hidden terra-gradient text-white lg:scroll-mt-20"
    >
      <div className="container-page grid grid-cols-1 gap-12 pt-20 pb-16 lg:grid-cols-12 lg:gap-16 lg:pt-28 lg:pb-20">
        <div className={isOpen ? "lg:sticky lg:top-28 lg:col-span-5 lg:self-start" : "lg:col-span-12"}>
          <SectionHeading
            tone="dark"
            eyebrow="Inscripción"
            title={isOpen ? "Confirmá tu participación" : registrationClosed.title}
            titleId="registration-title"
            description={
              <p>
                {isOpen
                  ? "Completá el formulario para registrarte en el Encuentro."
                  : registrationClosed.text}
              </p>
            }
          />
          <ul className={cn("mt-10", isOpen ? "space-y-6" : "flex flex-col gap-6 lg:flex-row lg:gap-16")}>
            <li className="flex items-center gap-4">
              <CalendarDaysIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-10 shrink-0 text-terra-orange"
              />
              <span className="text-xl font-extrabold">{event.dateLabel}</span>
            </li>
            <li className="flex items-center gap-4">
              <MapPinIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-10 shrink-0 text-terra-orange"
              />
              <span className="text-lg leading-snug">
                <strong className="font-extrabold">{event.location.name}.</strong>{" "}
                {event.location.address}
                <br />
                {event.location.regionLabel}
              </span>
            </li>
          </ul>
        </div>

        {isOpen && (
          <div className="surface-light relative bg-white p-6 text-terra-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.6)] sm:p-10 lg:col-span-7">
            <span aria-hidden="true" className="absolute -top-[11px] -left-[11px] size-4 bg-terra-orange" />
            <RegistrationForm countries={getCountryOptions("es")} />
          </div>
        )}
      </div>

      <StripeBand className="block h-20 w-full sm:h-24 lg:h-28" />
    </section>
  );
}
