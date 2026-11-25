import { ArrowRightIcon } from "lucide-react";

import { CornerBox } from "@/components/brand/corner-box";
import { mainActions } from "@/content/navigation";
import { cn } from "@/lib/utils";

/* Accesos principales pedidos por la organización: Inscripción, Programa y Acompañan. */
export function EventInfo() {
  return (
    <section aria-label="Accesos principales" className="bg-white">
      <div className="container-page py-16 lg:py-20">
        <ul
          className={cn(
            "grid gap-8 md:gap-6",
            mainActions.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          )}
        >
          {mainActions.map((action, index) => (
            <li key={action.href}>
              <CornerBox className="h-full transition-colors hover:border-terra-petrol">
                <a href={action.href} className="group flex h-full flex-col gap-6 p-6 sm:p-8">
                  <span className="flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className="text-5xl leading-none font-black text-terra-orange tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-6 text-terra-petrol transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </span>
                  <span>
                    <span className="block text-2xl font-extrabold tracking-tight text-terra-petrol uppercase">
                      {action.title}
                    </span>
                    <span className="mt-2 block text-terra-ink">{action.description}</span>
                  </span>
                </a>
              </CornerBox>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
