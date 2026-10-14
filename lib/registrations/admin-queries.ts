import "server-only";

import { sectors } from "@/content/registration";
import { getSql } from "@/lib/db/client";

/** Fila tal como la usan el panel y el CSV: una sola consulta para que nunca muestren datos distintos. */
export type RegistrationRow = {
  id: string;
  fullName: string;
  organization: string;
  role: string;
  sector: string;
  /** Etiqueta legible; para "Otro" incluye lo que especificó la persona. */
  sectorLabel: string;
  city: string;
  region: string | null;
  country: string;
  countryName: string;
  email: string;
  phone: string | null;
  emailSent: boolean;
  /** ISO para ordenar en el cliente. */
  createdAt: string;
  /** "DD/MM/YYYY HH:MM" en hora de Ushuaia. */
  createdAtLabel: string;
};

type DbRow = {
  id: string;
  full_name: string;
  organization: string;
  role: string;
  sector: string;
  sector_other: string | null;
  city: string;
  region: string | null;
  country: string;
  email: string;
  phone: string | null;
  email_sent: boolean;
  created_at: string;
  created_at_label: string;
};

const sectorLabels = new Map<string, string>(sectors.map((s) => [s.value, s.label]));

export async function listRegistrations(eventSlug: string): Promise<RegistrationRow[]> {
  const sql = getSql();
  // Fecha formateada en SQL y no con Date en JS: evita corrimientos de huso horario (lección de copat3D).
  const rows = await sql<DbRow[]>`
    SELECT
      id, full_name, organization, role, sector, sector_other, city, region,
      country, email, phone, email_sent,
      to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS created_at,
      to_char(created_at AT TIME ZONE 'America/Argentina/Ushuaia', 'DD/MM/YYYY HH24:MI') AS created_at_label
    FROM registrations
    WHERE event_slug = ${eventSlug}
    ORDER BY created_at DESC
  `;

  const countryNames = new Intl.DisplayNames(["es"], { type: "region" });

  return rows.map((row) => {
    const country = row.country.trim();
    const label = sectorLabels.get(row.sector) ?? row.sector;
    return {
      id: row.id,
      fullName: row.full_name,
      organization: row.organization,
      role: row.role,
      sector: row.sector,
      sectorLabel: row.sector === "other" && row.sector_other ? `${label}: ${row.sector_other}` : label,
      city: row.city,
      region: row.region,
      country,
      countryName: countryNames.of(country) ?? country,
      email: row.email,
      phone: row.phone,
      emailSent: row.email_sent,
      createdAt: row.created_at,
      createdAtLabel: row.created_at_label,
    };
  });
}

export type RegistrationMetrics = {
  total: number;
  bySector: { label: string; count: number }[];
  byCountry: { label: string; count: number }[];
};

export function computeMetrics(rows: RegistrationRow[]): RegistrationMetrics {
  const count = (keyOf: (row: RegistrationRow) => string, labelOf: (row: RegistrationRow) => string) => {
    const map = new Map<string, { label: string; count: number }>();
    for (const row of rows) {
      const key = keyOf(row);
      const entry = map.get(key) ?? { label: labelOf(row), count: 0 };
      entry.count += 1;
      map.set(key, entry);
    }
    return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "es"));
  };

  const bySector = count((r) => r.sector, (r) => sectorLabels.get(r.sector) ?? r.sector);
  const byCountry = count((r) => r.country, (r) => r.countryName);

  return { total: rows.length, bySector, byCountry };
}
