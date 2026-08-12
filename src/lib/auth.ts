import "server-only";

import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const scrypt = promisify(scryptCallback);
export const SESSION_COOKIE = "retirefire_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;

export type AccountUser = { id: string; email: string };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt:${salt.toString("base64url")}:${derived.toString("base64url")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algorithm, saltText, hashText] = stored.split(":");
  if (algorithm !== "scrypt" || !saltText || !hashText) return false;
  const expected = Buffer.from(hashText, "base64url");
  const actual = (await scrypt(password, Buffer.from(saltText, "base64url"), expected.length)) as Buffer;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createAccount(email: string, password: string): Promise<AccountUser> {
  const normalized = normalizeEmail(email);
  if (!/^\S+@\S+\.\S+$/.test(normalized)) throw new Error("Enter a valid email address.");
  if (password.length < 12) throw new Error("Password must be at least 12 characters.");
  const sql = db();
  const rows = await sql<AccountUser[]>`
    INSERT INTO users (id, email, password_hash)
    VALUES (${randomUUID()}, ${normalized}, ${await hashPassword(password)})
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email
  `;
  if (!rows[0]) throw new Error("An account already exists for that email.");
  return rows[0];
}

export async function authenticate(email: string, password: string): Promise<AccountUser | null> {
  const rows = await db()<Array<AccountUser & { password_hash: string }>>`
    SELECT id, email, password_hash FROM users WHERE email = ${normalizeEmail(email)} LIMIT 1
  `;
  const user = rows[0];
  if (!user || !(await verifyPassword(password, user.password_hash))) return null;
  return { id: user.id, email: user.email };
}

export async function issueSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  await db()`INSERT INTO user_sessions (id, user_id, token_hash, expires_at) VALUES (${randomUUID()}, ${userId}, ${tokenHash(token)}, ${expiresAt})`;
  return { token, expiresAt };
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date, secure: boolean) {
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure, sameSite: "lax", path: "/", expires: expiresAt, priority: "high" });
}

export async function userForToken(token?: string): Promise<AccountUser | null> {
  if (!token) return null;
  const rows = await db()<AccountUser[]>`
    SELECT u.id, u.email FROM user_sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ${tokenHash(token)} AND s.expires_at > now() LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function currentUser(): Promise<AccountUser | null> {
  return userForToken((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function requestUser(request: NextRequest): Promise<AccountUser | null> {
  return userForToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export async function revokeSession(token?: string) {
  if (token) await db()`DELETE FROM user_sessions WHERE token_hash = ${tokenHash(token)}`;
}

export function safeReturnTo(value: FormDataEntryValue | null, fallback = "/account") {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}
