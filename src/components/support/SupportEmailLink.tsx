import { SITE } from "@/lib/constants";

export function SupportEmailLink({ className }: { className?: string }) {
  return (
    <a className={className} href={`mailto:${SITE.supportEmail}`}>
      {SITE.supportEmail}
    </a>
  );
}
