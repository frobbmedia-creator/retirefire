import fs from "node:fs";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.log("Database migration skipped: no DATABASE_URL or POSTGRES_URL.");
  process.exit(0);
}

const sql = postgres(databaseUrl, { max: 1, idle_timeout: 10 });

try {
  await sql.unsafe(fs.readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
  const rows = await sql`
    SELECT count(*)::int AS count
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('users', 'user_sessions', 'entitlements', 'stripe_webhook_events')
  `;
  if (rows[0]?.count !== 4) throw new Error("Account schema verification failed");
  console.log("Database migration complete: 4 account tables verified.");
} finally {
  await sql.end();
}
