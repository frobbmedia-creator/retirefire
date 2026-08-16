export type SeppUiModel = Readonly<{
  phase: "review_pending" | "unavailable";
  inputState: "recognized" | "invalid";
  exposesMethodology: true;
  exposesExampleInputs: true;
  paymentOutput: null;
  message: string;
}>;

const REVIEW_PENDING_MESSAGE =
  "Payment output is unavailable while independent professional validation is pending.";
const UNAVAILABLE_MESSAGE =
  "Payment output is unavailable because the calculator release status is not recognized as review-pending.";
const DATE_LIKE = /^\d{4}-\d{2}-\d{2}$/;

function isDateLike(value: unknown): boolean {
  return typeof value === "string" && DATE_LIKE.test(value);
}

/**
 * Shallow example-input shape only. Do not call calculateSepp or inspect
 * rates, factors, or field-level engine errors from this boundary.
 */
function isRecognizedExampleInput(inputs: unknown): boolean {
  if (!inputs || typeof inputs !== "object") return false;
  const candidate = inputs as Record<string, unknown>;
  return (
    Number.isFinite(candidate.accountBalance) &&
    isDateLike(candidate.birthDate) &&
    isDateLike(candidate.firstDistributionDate) &&
    typeof candidate.method === "string" &&
    candidate.method.length > 0
  );
}

/**
 * Convert a public SEPP preview into a fail-closed UI state.
 * Never import or invoke the governed calculation core.
 */
export function seppUiModel(
  registryStatus: unknown,
  inputs: unknown,
): SeppUiModel {
  if (registryStatus !== "blocked_external_review") {
    return {
      phase: "unavailable",
      inputState: "invalid",
      exposesMethodology: true,
      exposesExampleInputs: true,
      paymentOutput: null,
      message: UNAVAILABLE_MESSAGE,
    };
  }

  return {
    phase: "review_pending",
    inputState: isRecognizedExampleInput(inputs) ? "recognized" : "invalid",
    exposesMethodology: true,
    exposesExampleInputs: true,
    paymentOutput: null,
    message: REVIEW_PENDING_MESSAGE,
  };
}
