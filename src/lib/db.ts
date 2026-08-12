import "server-only";
import postgres, { type Sql } from "postgres";

let client: Sql | undefined;

export function db(): Sql {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  client ??= postgres(url, { max: 5, idle_timeout: 20 });
  return client;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}
