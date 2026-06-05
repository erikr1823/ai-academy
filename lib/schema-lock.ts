import { query } from "@/lib/db";

const SCHEMA_LOCK_ID = 8347291042;

export async function runWithSchemaLock<T>(fn: () => Promise<T>): Promise<T> {
  await query("SELECT pg_advisory_lock($1)", [SCHEMA_LOCK_ID]);
  try {
    return await fn();
  } finally {
    await query("SELECT pg_advisory_unlock($1)", [SCHEMA_LOCK_ID]);
  }
}
