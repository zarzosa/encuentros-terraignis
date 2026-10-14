import "server-only";

import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

// Un único pool por proceso (App Platform corre un servidor Node persistente).
// En desarrollo se guarda en globalThis para que el hot reload no abra conexiones de más.
const globalForDb = globalThis as typeof globalThis & { __encuentrosSql?: Sql };

/**
 * Cliente PostgreSQL (TCP). Solo servidor: DATABASE_URL nunca llega al navegador.
 * El `sslmode=require` de la connection string de DigitalOcean activa TLS.
 */
export function getSql(): Sql {
  if (globalForDb.__encuentrosSql) return globalForDb.__encuentrosSql;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está configurada.");
  }

  const sql = postgres(url, {
    max: 5,
    idle_timeout: 30,
    connect_timeout: 10,
  });
  globalForDb.__encuentrosSql = sql;
  return sql;
}
