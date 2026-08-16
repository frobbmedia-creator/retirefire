export type QuickYearsInputs = {
  currentPortfolio?: number | null;
  annualContribution?: number | null;
  annualReturn?: number | null;
  targetAmount?: number | null;
};

/**
 * Years need the same four inputs as `calculateYearsToFire`.
 * Spending and withdrawal rate only produce a FIRE target — never a timeline.
 */
export function shouldShowQuickYears(input: QuickYearsInputs): boolean {
  const { currentPortfolio, annualContribution, annualReturn, targetAmount } =
    input;
  if (
    currentPortfolio == null ||
    annualContribution == null ||
    annualReturn == null ||
    targetAmount == null
  ) {
    return false;
  }
  if (
    ![currentPortfolio, annualContribution, annualReturn, targetAmount].every(
      Number.isFinite,
    )
  ) {
    return false;
  }
  if (currentPortfolio < 0 || annualContribution < 0 || targetAmount <= 0) {
    return false;
  }
  return currentPortfolio > 0 || annualContribution > 0;
}
