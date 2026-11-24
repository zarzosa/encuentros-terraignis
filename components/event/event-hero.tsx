import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { NotchRule } from "@/components/brand/notch-rule";
import { StripeColumn } from "@/components/brand/stripes";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";
import { ctaLabels } from "@/content/navigation";

/*
 * Traducción web de la tapa del programa oficial.
 *
 * Entra completo en la primera pantalla: alto = viewport menos el header (4rem / 5rem en lg)
 * y tipografía + espacios en `svh` con clamp(), para notebooks bajas (1366×768) y celulares
 * (piso: 360×640). Criterio tomado de copat3D (trampa 14). Si se agrega contenido, volver a medir.
 */
/* Padding izquierdo propio para no pisar la columna de franjas (compartido por contenido y pie). */
const contentPadding =
  "mx-auto w-full max-w-7xl pr-4 pl-14 sm:pr-6 sm:pl-20 md:pl-28 lg:pr-8 lg:pl-[max(2rem,calc(10rem_-_max(0px,(100vw_-_80rem)/2)))]";

export function EventHero() {
  const { location } = event;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="surface-dark relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center overflow-hidden terra-gradient-hero text-white lg:min-h-[calc(100svh-5rem)] lg:scroll-mt-20"
    >
      <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-9 sm:w-12 md:w-16 lg:w-24 xl:w-[7.5rem]" />

      <div className={`${contentPadding} flex flex-1 flex-col justify-center py-[clamp(0.75rem,2svh,3.5rem)] sm:py-[clamp(0.75rem,3svh,3.5rem)]`}>
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-[clamp(2.5rem,5vw,5rem)]">
        <div>
          <p className="text-[clamp(1.25rem,min(5vw,4svh),3rem)] leading-none font-extralight tracking-wide uppercase">
            {event.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-[clamp(0.25rem,1svh,0.75rem)] text-[clamp(2.25rem,min(11vw,8svh),6.25rem)] leading-[0.9] font-black tracking-[-0.025em] uppercase"
          >
            {event.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <NotchRule className="mt-[clamp(0.75rem,2.4svh,1.75rem)] max-w-2xl text-white" />

          {/* ≥ 20 px extrabold: naranja sobre el degradé oscuro cumple como texto grande WCAG. */}
          <p className="mt-[clamp(0.75rem,2.4svh,1.75rem)] max-w-2xl text-[clamp(1.25rem,min(5.2vw,3.2svh),2rem)] leading-tight font-extrabold text-pretty text-terra-orange">
            {event.tagline}
          </p>

          <ul className="mt-[clamp(0.75rem,2.6svh,2rem)] grid gap-[clamp(0.5rem,1.6svh,1.25rem)] sm:grid-cols-2 sm:gap-8">
            <li className="flex items-center gap-3 sm:gap-4">
              <CalendarDaysIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-8 shrink-0 text-terra-orange sm:size-[clamp(2.25rem,5svh,3rem)]"
              />
              <p className="text-[clamp(1.125rem,min(5vw,3svh),1.75rem)] leading-[1.05] font-extrabold">
                <span className="block whitespace-nowrap">{event.dateLines[0]}</span>
                <span className="block whitespace-nowrap">{event.dateLines[1]}</span>
              </p>
            </li>
            <li className="flex items-center gap-3 sm:gap-4">
              <MapPinIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-8 shrink-0 text-terra-orange sm:size-[clamp(2.25rem,5svh,3rem)]"
              />
              <p className="text-[0.9375rem] leading-snug sm:text-[clamp(0.9375rem,2svh,1.125rem)]">
                <strong className="font-extrabold">{location.name}.</strong> {location.address}
                <br />
                {location.regionLabel}
              </p>
            </li>
          </ul>

          {/* Pedido de la organización: a quién está dirigido, entre fecha/lugar y los botones. */}
          <div className="mt-[clamp(0.75rem,2.6svh,1.75rem)] max-w-3xl">
            <h2 className="text-xl leading-tight font-extrabold text-terra-orange sm:text-[clamp(1.25rem,2.6svh,1.5rem)]">
              {event.audience.title}
            </h2>
            <p className="mt-1 text-sm leading-snug text-pretty text-white/90 sm:text-[clamp(0.9375rem,2svh,1.125rem)]">
              {event.audience.text}
            </p>
          </div>

          <div className="mt-[clamp(1rem,3svh,2.25rem)] flex flex-col items-start gap-x-3 gap-y-3 sm:flex-row sm:items-center">
            <Button asChild variant="accent" size="cta" className="h-[clamp(3rem,6.5svh,3.5rem)] w-full sm:w-auto">
              <a href="#inscripcion">
                {ctaLabels.primary}
                <ArrowRightIcon aria-hidden="true" />
              </a>
            </Button>
            {/* En celular, link de texto para no sumar otro botón alto; desde sm, botón. */}
            <a
              href={event.dossierUrl}
              target="_blank"
              rel="noopener"
              className="py-1 text-base font-bold tracking-wide uppercase underline decoration-terra-orange decoration-2 underline-offset-[6px] sm:hidden"
            >
              Ver programa
            </a>
            <Button
              asChild
              variant="outline-light"
              size="cta"
              className="hidden h-[clamp(3rem,6.5svh,3.5rem)] sm:inline-flex"
            >
              <a href={event.dossierUrl} target="_blank" rel="noopener">
                Ver programa
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop: logos a la derecha, apoyados a la altura de los botones. El filete vertical
            acompaña solo al bloque de logos (no toda la columna) para marcarlo sin partir la pantalla. */}
        <aside aria-label="Organiza y acompaña" className="hidden lg:flex lg:flex-col lg:justify-end lg:pb-1">
          <div className="flex flex-col gap-[clamp(1.5rem,4svh,2.75rem)] border-l border-white/25 pl-[clamp(2rem,3.5vw,3.5rem)]">
            {event.partnerGroups.map((group) => (
              <div key={group.role}>
                <p className="text-base font-semibold">{group.role}:</p>
                <div className="mt-3 flex flex-wrap items-center gap-6">
                  {group.partners.map((partner) => (
                    <PartnerLogo
                      key={partner.name}
                      partner={partner}
                      className="h-[clamp(2.75rem,6.5svh,4rem)]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        </div>
      </div>

      {/* Celular y tablet: pie del hero con Organiza / Acompaña, como el de la tapa del PDF. */}
      <div className="border-t border-white/15 lg:hidden [@media(max-height:949px)]:hidden">
        <div
          className={`${contentPadding} grid grid-cols-2 gap-4 py-[clamp(0.75rem,2.2svh,1.25rem)] sm:flex sm:flex-wrap sm:items-center sm:gap-x-[clamp(2rem,5vw,4rem)] sm:gap-y-3`}
        >
          {event.partnerGroups.map((group) => (
            <div key={group.role} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-xs font-semibold whitespace-nowrap sm:text-base">{group.role}:</p>
              {group.partners.map((partner) => (
                <PartnerLogo
                  key={partner.name}
                  partner={partner}
                  className="h-8 self-start sm:h-11 sm:self-auto"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
