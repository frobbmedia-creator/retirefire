import { AccountForm } from "@/components/account/AccountForm";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta("/account/register", { title: "Create a RetireFire account", robots: { index: false } });
export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string; returnTo?: string }> }) {
  const p = await searchParams;
  return <AccountForm mode="register" error={p.error} returnTo={p.returnTo?.startsWith("/") ? p.returnTo : "/account"} />;
}
