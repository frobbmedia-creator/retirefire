import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="border-b border-amber-500/20 bg-amber-500/5">
      <div className="mx-auto max-w-6xl px-4 py-3 text-center text-xs leading-relaxed text-amber-100/90 sm:px-6 sm:text-sm">
        <strong className="font-medium text-amber-200">Important:</strong>{" "}
        RetireFire provides educational calculators only. Results are not
        financial, investment, tax, or legal advice. Past market returns do not
        guarantee future results.{" "}
        <Link
          href="/disclaimer"
          className="font-medium text-amber-300 underline-offset-2 hover:underline"
        >
          Full disclaimer
        </Link>
      </div>
    </div>
  );
}
