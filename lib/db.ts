import { Pool, type QueryResult, type QueryResultRow } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not configured. Add it to .env.local",
    );
  }

  return new Pool({ connectionString });
}

function getPool() {
  if (!globalForPg.pgPool) {
    globalForPg.pgPool = createPool();
  }

  return globalForPg.pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const pool = getPool();
  return pool.query<T>(text, params);
}
