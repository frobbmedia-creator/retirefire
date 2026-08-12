import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/layout/Footer";

const html = renderToStaticMarkup(<Footer />);

assert.match(
  html,
  /href="mailto:support@retirefire\.net"/,
  "The customer-visible footer must link to the RetireFire support inbox",
);
assert.match(
  html,
  />support@retirefire\.net</,
  "The support address must remain visible and copyable",
);

console.log("Support email rendering test passed.");
