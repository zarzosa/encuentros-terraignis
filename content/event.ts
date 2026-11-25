export type Partner = {
  name: string;
  /** Logo oficial en /public: negativo para fondos oscuros; los auspiciantes, a color sobre blanco. */
  logo?: { src: string; width: number; height: number };
};

export type PartnerGroup = {
  role: string;
  partners: Partner[];
};

/* Logos extraídos en vectores del PDF oficial del programa; no redibujar. */
export const logos = {
  terraIgnis: {
    src: "/logos/terra-ignis-energia-negativo.svg",
    width: 201,
    height: 76,
  },
  gobiernoTdf: {
    src: "/logos/gobierno-tierra-del-fuego-negativo.svg",
    width: 359,
    height: 97,
  },
} as const;

/*
 * Auspiciantes confirmados, en orden de jerarquía (pedido de la organización: no reordenar).
 * Logos del archivo del diseñador (Sponsors_Web-TIE.ai), todos a la misma escala: width/height
 * son los de cada mesa de trabajo y se usan para mantener esa proporción entre ellos.
 * TotalEnergies exige fondo blanco: estos logos van solo en la franja blanca, nunca en fondos oscuros.
 * El de TotalEnergies es PNG porque sus degradados no se exportan bien a SVG.
 * El de Roch llegó aparte (LogoRoch 2026.pdf, vectores del PDF): su tamaño se ajustó a ojo
 * para equilibrarlo con el resto, no sale de una mesa de trabajo.
 */
export const sponsors = [
  {
    name: "TotalEnergies",
    logo: { src: "/logos/auspiciantes/totalenergies.png", width: 190, height: 139 },
  },
  {
    name: "Pan American Energy",
    logo: { src: "/logos/auspiciantes/pan-american-energy.svg", width: 279, height: 116 },
  },
  {
    name: "Equinor",
    logo: { src: "/logos/auspiciantes/equinor.svg", width: 338, height: 138 },
  },
  {
    name: "Roch",
    logo: { src: "/logos/auspiciantes/roch.svg", width: 225, height: 72 },
  },
  {
    name: "Velitec",
    logo: { src: "/logos/auspiciantes/velitec.svg", width: 316, height: 43 },
  },
] satisfies Partner[];

export const event = {
  slug: "cuencas-maduras",
  eyebrow: "Encuentro:",
  name: "Repensar las Cuencas Maduras",
  titleLines: ["Repensar", "las Cuencas", "Maduras"],
  tagline:
    "Una agenda federal para el desarrollo de los hidrocarburos convencionales",
  description:
    "Un espacio federal de diálogo e intercambio entre autoridades nacionales y provinciales, empresas de energía, operadores, organizaciones gremiales, proveedores y referentes del sector, para compartir experiencias y abordar los desafíos y oportunidades de una nueva etapa de los hidrocarburos convencionales.",
  audience: {
    title: "¿A quién está dirigido?",
    text: "El encuentro está dirigido a autoridades nacionales y provinciales, representantes de empresas del sector energético, compañías operadoras, cámaras empresarias, empresas de servicios y proveedores, organizaciones gremiales, especialistas y referentes de la industria hidrocarburífera.",
  },
  axes: [
    "Inversión",
    "Competitividad",
    "Sustentabilidad",
    "Empleo",
    "Desarrollo Regional",
  ],
  startDate: "2026-11-26",
  endDate: "2026-11-27",
  dateLines: ["26 y 27 de", "noviembre de 2026"],
  dateLabel: "26 y 27 de noviembre de 2026",
  location: {
    name: "Fábrica de Talentos",
    address: "Av. Maipú 1255",
    city: "Ushuaia",
    province: "Tierra del Fuego",
    regionLabel: "Ushuaia, Tierra del Fuego, AeIAS",
    country: "Argentina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=F%C3%A1brica%20de%20Talentos%2C%20Av.%20Maip%C3%BA%201255%2C%20Ushuaia%2C%20Tierra%20del%20Fuego",
    /** Embed público de Google Maps (sin clave de API). */
    mapEmbedUrl:
      "https://www.google.com/maps?q=F%C3%A1brica%20de%20Talentos%2C%20Av.%20Maip%C3%BA%201255%2C%20Ushuaia%2C%20Tierra%20del%20Fuego%2C%20Argentina&z=16&hl=es&output=embed",
  },
  /** PDFs en /public que abre "Ver programa" en el hero: A4 desde sm, vertical en celular. */
  programPdf: {
    desktop: "/docs/programa-cuencas-maduras.pdf",
    mobile: "/docs/programa-cuencas-maduras-mobile.pdf",
  },
  organizer: "Terra Ignis Energía S.A.",
  partnerGroups: [
    {
      role: "Organiza",
      partners: [{ name: "Terra Ignis Energía S.A.", logo: logos.terraIgnis }],
    },
    {
      role: "Acompaña",
      partners: [
        {
          name: "Gobierno de Tierra del Fuego, Antártida e Islas del Atlántico Sur",
          logo: logos.gobiernoTdf,
        },
      ],
    },
  ] satisfies PartnerGroup[],
  /**
   * false = inscripción cerrada: oculta botones, links y formulario, y el servidor rechaza envíos.
   * Para reabrir, volver a true (cambia todo el sitio).
   */
  registrationOpen: false as boolean,
} as const;
