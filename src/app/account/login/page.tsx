import { AccountForm } from "@/components/account/AccountForm";
export const metadata = { title: "Sign in to RetireFire", robots: { index: false } };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; returnTo?: string }> }) {
  const p = await searchParams;
  return <AccountForm mode="login" error={p.error} returnTo={p.returnTo?.startsWith("/") ? p.returnTo : "/account"} />;
}
