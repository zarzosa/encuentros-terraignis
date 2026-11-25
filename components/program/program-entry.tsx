import { CornerBox } from "@/components/brand/corner-box";
import type { ProgramItem, ProgramPerson } from "@/content/program";
import { cn } from "@/lib/utils";

/*
 * Naranja sobre blanco ≈ 3.1:1: los textos naranjas del panel van en ≥ 20 px
 * extrabold (texto grande WCAG), igual que en el PDF.
 */
export function ProgramEntry({ item }: { item: ProgramItem }) {
  if (item.kind === "moment") {
    return (
      <>
        <p className="text-lg leading-snug font-extrabold text-terra-ink sm:text-xl">
          <Time>{item.time}</Time>
          {item.text}
        </p>
        {item.people && <People people={item.people} className="mt-2" />}
      </>
    );
  }

  return (
    <CornerBox className="px-5 py-5 sm:px-7 sm:py-6">
      <h4 className="text-xl leading-snug font-extrabold text-terra-orange">
        <span className="block uppercase">
          <Time>{item.time}</Time>
          Panel {item.number}
        </span>
        <span className="block text-pretty">{item.title}</span>
      </h4>
      <PeopleGroup label="Expositores" people={item.speakers} />
      <PeopleGroup label="Moderación" people={item.moderators} />
    </CornerBox>
  );
}

function Time({ children }: { children: string }) {
  return (
    <>
      <span className="whitespace-nowrap tabular-nums">{children}</span>
      <span aria-hidden="true"> | </span>
      <span className="sr-only">: </span>
    </>
  );
}

function PeopleGroup({ label, people }: { label: string; people: ProgramPerson[] }) {
  return (
    <>
      <p className="mt-4 text-base tracking-wide text-terra-ink uppercase">{label}</p>
      <People people={people} className="mt-1.5" />
    </>
  );
}

/* Nombre en negrita + cargo, con la viñeta cuadrada del PDF. */
function People({ people, className }: { people: ProgramPerson[]; className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {people.map((person) => (
        <li
          key={person.name}
          className="relative pl-5 text-base leading-snug text-pretty text-terra-ink before:absolute before:top-[0.45em] before:left-0 before:size-2 before:bg-terra-ink sm:text-lg"
        >
          <strong className="font-extrabold">{person.name}</strong> — {person.role}
        </li>
      ))}
    </ul>
  );
}
