// Crea la tabla `registrations` a partir de db/schema.sql.
// Uso: npm run db:setup   (lee DATABASE_URL desde .env.local)
import { readFile } from "node:fs/promises";

import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL en .env.local");
  process.exit(1);
}

// Muestra el host (sin credenciales) para confirmar contra qué base se aplica el esquema.
console.log(`Base de datos: ${new URL(url).host}`);

const sql = postgres(url, { max: 1, onnotice: () => {} });
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

try {
  // Protocolo simple: ejecuta todas las sentencias del archivo en una sola llamada.
  await sql.unsafe(schema);
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM registrations`;
  console.log(`Esquema aplicado. Inscripciones actuales: ${count}.`);
} finally {
  await sql.end();
}
