import { TerraIgnisLogo } from "@/components/brand/terra-ignis-logo";
import { MobileNav } from "@/components/event/mobile-nav";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";
import { ctaLabels, navItems } from "@/content/navigation";

/* Fondo = tono superior del degradé oficial, para continuar sin corte en el hero. */
export function EventHeader() {
  return (
    <header className="surface-dark sticky top-0 z-40 border-b border-white/15 bg-terra-teal text-white">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#inicio" className="shrink-0">
          <TerraIgnisLogo eager className="h-9 lg:h-11" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-block py-2 text-sm font-semibold tracking-[0.14em] text-white uppercase"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-terra-orange transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {event.registrationOpen && (
            <Button
              asChild
              variant="accent"
              size="cta"
              className="h-10 px-3 sm:h-11 sm:px-5 lg:h-12 lg:px-6"
            >
              <a href="#inscripcion">{ctaLabels.primary}</a>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
