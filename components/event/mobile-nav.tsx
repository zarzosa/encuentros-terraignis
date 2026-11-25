"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { StripeBand } from "@/components/brand/stripes";
import { TerraIgnisLogo } from "@/components/brand/terra-ignis-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { event } from "@/content/event";
import { ctaLabels, navItems } from "@/content/navigation";

/**
 * Menú móvil a pantalla completa (como copat3D), sobre el Sheet de Radix:
 * foco atrapado, Escape y bloqueo del scroll de fondo ya resueltos.
 * Fondo azul noche liso (no el degradé del hero) para que se distinga de la portada.
 * Naranja sobre #152841 ≈ 5:1: sirve para el estado activo/foco de los ítems.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  // El scroll al ancla se hace al cerrar: mientras el Sheet está abierto el body está bloqueado.
  const pendingHash = useRef<string | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="size-11 text-white hover:bg-white/10 hover:text-white focus-visible:ring-white lg:hidden"
          aria-label="Abrir menú"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="surface-dark h-dvh gap-0 overflow-y-auto border-0 bg-terra-navy text-white data-[side=right]:w-full data-[side=right]:sm:max-w-none"
        // El foco inicial va al primer ítem del menú (no a la X), así lo primero que se ve es la navegación.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          firstLink.current?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={(e) => {
          const hash = pendingHash.current;
          if (!hash) return;
          e.preventDefault();
          pendingHash.current = null;
          document.querySelector(hash)?.scrollIntoView();
          history.replaceState(null, "", hash);
        }}
      >
        <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-white/15">
          <a href="#inicio" onClick={(e) => navigate(e, "#inicio")} className="shrink-0">
            <TerraIgnisLogo className="h-9" />
          </a>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-11 text-white hover:bg-white/10 hover:text-white focus-visible:ring-white"
              aria-label="Cerrar menú"
            >
              <XIcon className="size-6" />
            </Button>
          </SheetClose>
        </div>

        <SheetTitle className="sr-only">Menú</SheetTitle>
        <SheetDescription className="sr-only">
          Secciones del Encuentro {event.name}
        </SheetDescription>

        <div className="container-page flex flex-1 flex-col justify-center py-10">
          <p className="text-lg font-extralight tracking-wide uppercase">Encuentro:</p>
          <p className="text-xl leading-tight font-extrabold uppercase">{event.name}</p>

          <nav aria-label="Principal" className="mt-8">
            <ol>
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    ref={index === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={(e) => navigate(e, item.href)}
                    className="group relative flex items-baseline gap-4 border-b border-white/15 py-4 pl-4 outline-none transition-colors hover:text-terra-orange focus-visible:text-terra-orange"
                  >
                    {/* Barra de estado: aparece al pasar el mouse o con foco de teclado. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-3 left-0 w-1 scale-y-0 bg-terra-orange transition-transform group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="w-7 text-sm font-bold text-terra-orange tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.75rem,8vw,2.5rem)] leading-tight font-extrabold tracking-tight uppercase">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {event.registrationOpen && (
            <Button asChild variant="accent" size="cta" className="mt-9 w-full focus-visible:ring-white">
              <a href="#inscripcion" onClick={(e) => navigate(e, "#inscripcion")}>
                {ctaLabels.primary}
              </a>
            </Button>
          )}

          <p className="mt-7 text-white/85">
            {event.dateLabel}
            <br />
            {event.location.name} · {event.location.city}, {event.location.province}
          </p>
        </div>

        <StripeBand className="block h-16 w-full shrink-0 sm:h-20" />
      </SheetContent>
    </Sheet>
  );
}
