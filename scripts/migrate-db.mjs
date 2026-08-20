import fs from "node:fs";
import postgres from "postgres";

const rawDatabaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!rawDatabaseUrl) {
  console.log("Database migration skipped: no DATABASE_URL or POSTGRES_URL.");
  process.exit(0);
}

const databaseUrl = rawDatabaseUrl.trim();

let parsedDatabaseUrl;
try {
  parsedDatabaseUrl = new URL(databaseUrl);
} catch {
  throw new Error(
    "Database migration failed: DATABASE_URL/POSTGRES_URL is not a valid URL. Check the Vercel production environment variable value.",
  );
}

if (!["postgres:", "postgresql:"].includes(parsedDatabaseUrl.protocol)) {
  throw new Error(
    `Database migration failed: unsupported database protocol ${parsedDatabaseUrl.protocol}. Expected postgres:// or postgresql://.`,
  );
}

const sql = postgres(databaseUrl, { max: 1, idle_timeout: 10 });

try {
  await sql.unsafe(fs.readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
  const rows = await sql`
    SELECT count(*)::int AS count
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('users', 'user_sessions', 'entitlements', 'stripe_webhook_events', 'email_leads')
  `;
  if (rows[0]?.count !== 5) throw new Error("Account schema verification failed");
  console.log("Database migration complete: 5 account tables verified.");
} finally {
  await sql.end();
}
