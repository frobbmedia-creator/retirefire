import assert from "node:assert/strict";
import { isValidLeadEmail, parseLeadSource } from "./leads";

assert.equal(isValidLeadEmail("you@retirefire.net"), true);
assert.equal(isValidLeadEmail("  you@retirefire.net  "), true);
assert.equal(isValidLeadEmail("nope"), false);
assert.equal(isValidLeadEmail("a @b.com"), false);
assert.equal(isValidLeadEmail(""), false);

assert.equal(parseLeadSource("coast_checklist"), "coast_checklist");
assert.equal(parseLeadSource("spam"), null);

console.log("leads tests passed");
