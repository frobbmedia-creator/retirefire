/**
 * Run: npx tsx src/lib/coast-tables.test.ts
 */
import {
  buildCoastAgeTable,
  coastAgeTableToCsv,
  discountToPresent,
} from "./coast-tables";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

function approx(a: number, b: number, tol = 1) {
  return Math.abs(a - b) <= tol;
}

{
  const v = discountToPresent(1_500_000, 0.05, 20);
  const expected = 1_500_000 / Math.pow(1.05, 20);
  assert(approx(v, expected, 1), `discount ${v} vs ${expected}`);
}

{
  const rows = buildCoastAgeTable({
    fireNumber: 1_500_000,
    retirementAge: 65,
    realReturn: 0.05,
    altRealReturn: 0.04,
    ageFrom: 30,
    ageTo: 40,
    ageStep: 10,
  });
  assert(rows.length === 2, `expected 2 rows got ${rows.length}`);
  assert(rows[0]!.age === 30, "first age 30");
  assert(rows[0]!.yearsToRetirement === 35, "30→65 is 35y");
  assert(rows[0]!.coastNumberAlt != null, "alt present");
  assert(
    (rows[0]!.coastNumberAlt as number) > rows[0]!.coastNumber,
    "lower r → higher coast",
  );
}

{
  // ages past retirement skipped
  const rows = buildCoastAgeTable({
    fireNumber: 1_000_000,
    retirementAge: 65,
    realReturn: 0.05,
    ageFrom: 60,
    ageTo: 70,
    ageStep: 5,
  });
  assert(rows.every((r) => r.yearsToRetirement > 0), "no zero/negative years");
  assert(rows.every((r) => r.age < 65), "only pre-retirement ages");
}

{
  const rows = buildCoastAgeTable({
    fireNumber: 1_000_000,
    retirementAge: 65,
    realReturn: 0.05,
    ageFrom: 35,
    ageTo: 35,
  });
  const csv = coastAgeTableToCsv(rows, {
    fireNumber: 1_000_000,
    retirementAge: 65,
    realReturn: 0.05,
  });
  assert(csv.includes("coast_number"), "csv header");
  assert(csv.includes("Educational"), "disclaimer in csv");
}

console.log("All coast-tables tests passed.");
