/*
 * Programa del Encuentro, con la redacción del PDF oficial del 25/11/2026
 * (public/docs/programa-cuencas-maduras.pdf). Si cambia el PDF, actualizar también este archivo.
 * Fuente única: no repetir este contenido en JSX ni agregar datos no confirmados.
 */

export type ProgramPerson = { name: string; role: string };

export type ProgramItem =
  | {
      kind: "moment";
      time: string;
      text: string;
      /** Quiénes hablan (apertura y cierre). */
      people?: ProgramPerson[];
    }
  | {
      kind: "panel";
      number: number;
      time: string;
      /** Se muestra en naranja, como en el PDF. */
      title: string;
      speakers: ProgramPerson[];
      moderators: ProgramPerson[];
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
        time: "10:00–10:15",
        text: "Apertura institucional y discurso inaugural",
        people: [
          {
            name: "Gustavo Melella",
            role: "Gobernador de Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
          },
        ],
      },
      {
        kind: "panel",
        number: 1,
        time: "10:30–11:30",
        title:
          "El futuro energético desde las provincias: producción, inversión y desarrollo",
        speakers: [
          {
            name: "Gabriela Castillo",
            role: "Ministra de Energía, Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
          },
          {
            name: "Fabricio Audelino Gulino",
            role: "Subsecretario de Energía, Minería e Hidrocarburos, Neuquén.",
          },
          {
            name: "Manuel Sánchez Bandini",
            role: "Subsecretario de Energía y Minería, Mendoza.",
          },
          {
            name: "Sebastián Madariaga",
            role: "Director General de Recursos Energéticos y Mineros, Salta.",
          },
          {
            name: "Verónica Lorenzone",
            role: "Asesora Legal del Ministerio de Energía, Jujuy.",
          },
        ],
        moderators: [
          {
            name: "Alejandro Monteiro",
            role: "Director Ejecutivo de la Organización Federal de Estados Productores de Hidrocarburos (OFEPHI).",
          },
        ],
      },
      {
        kind: "panel",
        number: 2,
        time: "11:30–12:15",
        title: "Cuencas maduras: desafíos y oportunidades para el desarrollo",
        speakers: [
          {
            name: "Juan Martín Bulgheroni",
            role: "Jefe de Gabinete, Pan American Energy (PAE).",
          },
          {
            name: "Gianfranco Ungaro",
            role: "Director del Asset Tierra del Fuego, Total Austral.",
          },
          {
            name: "ENAP — Gustavo Martínez",
            role: "Director de operaciones Refino Magallanes.",
          },
        ],
        moderators: [
          {
            name: "Miguel Peirano",
            role: "Director de la Cámara Argentina de la Energía (CADE).",
          },
        ],
      },
      {
        kind: "panel",
        number: 3,
        time: "12:15–13:00",
        title:
          "Explotación hidrocarburífera offshore: situación mundial actual y nuevas oportunidades en la Cuenca Austral",
        speakers: [
          {
            name: "Sebastián Estrada",
            role: "Gerente de Geociencias, Total Austral.",
          },
          {
            name: "Emilio Cafoncelli",
            role: "Gerente de Asuntos Públicos y Relaciones Gubernamentales, Equinor Argentina.",
          },
          {
            name: "Néstor Bolatti",
            role: "Geólogo, ejecutivo de exploración energética y especialista offshore.",
          },
        ],
        moderators: [
          {
            name: "Gonzalo López Nardone",
            role: "Gerente de Asuntos Públicos, TotalEnergies.",
          },
        ],
      },
      { kind: "moment", time: "13:00–14:20", text: "Almuerzo y networking" },
      {
        kind: "panel",
        number: 4,
        time: "14:30–15:15",
        title: "Sustentabilidad y licencia social en las cuencas maduras",
        speakers: [
          {
            name: "Hilton Aparecido Magri Lucio",
            role: "CEO, Antea Group Brasil.",
          },
          { name: "Federico Bordelois", role: "Presidente de GreecoEnergy." },
          {
            name: "Juan Pérsico",
            role: "Especialista en pasivos ambientales de la Fundación Ambiente y Medio.",
          },
          {
            name: "Fabricio Audelino Gulino",
            role: "Subsecretario de Energía, Minería e Hidrocarburos, Gobierno de la Provincia del Neuquén.",
          },
        ],
        moderators: [
          {
            name: "Sergio Federovitsky",
            role: "Asesor Ambiental de Terra Ignis Energía S.A.",
          },
        ],
      },
      {
        kind: "panel",
        number: 5,
        time: "15:15–16:00",
        title: "Empresas petroleras convencionales: desafíos del sector",
        speakers: [
          { name: "Javier Chacra", role: "Director de Roch S.A." },
          {
            name: "Leonardo Deccechis",
            role: "Director de Upstream, Clear Petroleum.",
          },
          {
            name: "Pedro Arias",
            role: "Gerente del Área Tierra del Fuego, Velitec S.A.",
          },
          {
            name: "Alejandro Eloff",
            role: "Director Titular de Terra Ignis Energía S.A.",
          },
        ],
        moderators: [
          {
            name: "Maximiliano D’Alessio",
            role: "Presidente de Terra Ignis Energía S.A.",
          },
        ],
      },
      {
        kind: "panel",
        number: 6,
        time: "16:15–17:00",
        title: "¿Cómo potenciar el desarrollo de las cuencas maduras?",
        speakers: [
          {
            name: "Adrián Ramírez",
            role: "Gerente de Distrito Tierra del Fuego, TotalEnergies.",
          },
          {
            name: "Guillermo Aspiroz",
            role: "Asesor Gobierno Tierra del Fuego AeIAS. Andinia Consulting S.A.",
          },
          {
            name: "Lucas Erio",
            role: "Director de Hidrocarburos, Provincia de Mendoza.",
          },
          {
            name: "Marcio Felix Bezerra",
            role: "Presidente de la Asociación Brasileña de Productores Independientes de Petróleo y Gas Natural (ABPIP), Brasil.",
          },
        ],
        moderators: [
          {
            name: "Julieta Balderramas",
            role: "Secretaria de Hidrocarburos, Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
          },
        ],
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
      {
        kind: "panel",
        number: 7,
        time: "10:00–10:50",
        title: "Empresas petroleras convencionales: desafíos del sector",
        speakers: [
          {
            name: "Gastón Fondevila",
            role: "Gerente de Ingeniería, CAPSA-CAPEX.",
          },
          {
            name: "Jorge López Kessler",
            role: "Director Ejecutivo de Upstream, PECOM.",
          },
          {
            name: "Alejandro H. Fernández",
            role: "Vicepresidente de Marketing, Quintana Energy.",
          },
        ],
        moderators: [
          {
            name: "Alejandro Eloff",
            role: "Director Titular de Terra Ignis Energía S.A.",
          },
        ],
      },
      {
        kind: "panel",
        number: 8,
        time: "10:50–11:40",
        title:
          "Inversiones y marco regulatorio para una nueva etapa del convencional",
        speakers: [
          { name: "Flavia Royón", role: "Senadora Nacional." },
          {
            name: "Marcelo Aldecco",
            role: "Presidente de la Comisión de Asuntos Laborales de la CEPH.",
          },
          {
            name: "Nicolás Bühler",
            role: "Líder de la Comisión de Convencionales - CEPH.",
          },
        ],
        moderators: [
          {
            name: "Verónica Tito",
            role: "Gerente Legal e Institucional de Terra Ignis Energía S.A.",
          },
        ],
      },
      {
        kind: "moment",
        time: "11:40–12:25",
        text: "Cierre: Exposición final del encuentro",
        people: [
          {
            name: "Gabriela Castillo",
            role: "Ministra de Energía, Gobierno de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur.",
          },
          {
            name: "Verónica Tito",
            role: "Gerente Legal e Institucional de Terra Ignis Energía S.A.",
          },
        ],
      },
    ],
  },
];
