/*
 * Programa TENTATIVO del Encuentro, con la redacción del PDF oficial
 * ("Programa Encuentro Cuencas Maduras y Empresas Provinciales final").
 * Fuente única: no repetir este contenido en JSX ni agregar datos no confirmados.
 */

export type ProgramItem =
  | { kind: "moment"; time: string; text: string }
  | {
      kind: "panel";
      number: number;
      label?: string;
      /** Se muestra en naranja, como en el PDF. */
      title: string;
      /** Continuación del título en texto regular (panel 4). */
      detail?: string;
      /** Texto que sigue a "Participan:". */
      participants?: string;
    };

export type ProgramDay = {
  id: string;
  weekday: string;
  day: string;
  month: string;
  items: ProgramItem[];
};

export const programNotice = "Programa sujeto a modificaciones.";

export const program: ProgramDay[] = [
  {
    id: "jueves-26",
    weekday: "Jueves",
    day: "26",
    month: "de noviembre",
    items: [
      {
        kind: "moment",
        time: "09:30 h",
        text: "Acreditaciones + coffee de bienvenida",
      },
      {
        kind: "moment",
        time: "10:00 h",
        text: "Discurso inicial: Prof. Gustavo Melella, Gobernador de Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
      },
      {
        kind: "panel",
        number: 1,
        label: "Apertura",
        title:
          "El futuro energético desde las provincias: producción, inversión y desarrollo",
        participants: "Autoridades de provincias productoras de hidrocarburos.",
      },
      {
        kind: "panel",
        number: 2,
        title:
          "Cuencas maduras: desafíos y oportunidades para el desarrollo",
        participants: "CEOs y autoridades de empresas del sector energético.",
      },
      {
        kind: "panel",
        number: 3,
        title:
          "Empresas provinciales de energía: socios estratégicos para el desarrollo territorial",
        participants:
          "Presidentes y autoridades de empresas provinciales de energía.",
      },
      { kind: "moment", time: "13:30–15:00", text: "Almuerzo" },
      {
        kind: "panel",
        number: 4,
        title: "Explotación hidrocarburífera offshore:",
        detail:
          "Situación mundial actual y nuevas oportunidades en la Cuenca Austral",
      },
      {
        kind: "panel",
        number: 5,
        title:
          "Producción responsable: sustentabilidad y licencia social en las cuencas maduras",
        participants:
          "especialistas y referentes vinculados a la sustentabilidad, gestión ambiental y actividad hidrocarburífera.",
      },
      {
        kind: "panel",
        number: 6,
        title: "Potencial de Desarrollo de las Cuencas maduras",
      },
      {
        kind: "moment",
        time: "17:00 h aprox.",
        text: "Finalización primera jornada",
      },
    ],
  },
  {
    id: "viernes-27",
    weekday: "Viernes",
    day: "27",
    month: "de noviembre",
    items: [
      {
        kind: "moment",
        time: "09:30 h",
        text: "Apertura + coffee de bienvenida",
      },
      { kind: "moment", time: "10:00 h", text: "Comienzo primer panel" },
      {
        kind: "panel",
        number: 7,
        title: "Empresas petroleras convencionales: desafíos del sector",
        participants:
          "representantes de empresas vinculadas a la producción convencional.",
      },
      {
        kind: "panel",
        number: 8,
        title:
          "Inversiones y marco regulatorio para una nueva etapa del convencional",
        participants:
          "legisladores nacionales y referentes vinculados al sector energético, el trabajo y la innovación.",
      },
      { kind: "moment", time: "12:00 h", text: "Conferencia de cierre" },
      { kind: "moment", time: "13:00 h", text: "Finalización del encuentro" },
    ],
  },
];
