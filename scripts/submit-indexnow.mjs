import { readFile, writeFile } from "node:fs/promises";

const host = "retirefire.net";
const key = "4bfe8a26f36c4d30b0bd3b8e21a0b732";
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;

const args = process.argv.slice(2);
const argumentValue = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

const sitemapFile = argumentValue("--sitemap-file");
const payloadFile = argumentValue("--payload-file");

let sitemap;
if (sitemapFile) {
  sitemap = await readFile(sitemapFile, "utf8");
} else {
  const sitemapResponse = await fetch(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not load sitemap: ${sitemapResponse.status}`);
  }
  sitemap = await sitemapResponse.text();
}

const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);

if (urlList.length === 0) {
  throw new Error("No URLs found in the production sitemap.");
}

const payload = JSON.stringify(
  {
    host,
    key,
    keyLocation,
    urlList,
  },
  null,
  2,
);

if (payloadFile) {
  await writeFile(payloadFile, `${payload}\n`);
  console.log(`Wrote ${urlList.length} canonical URLs to ${payloadFile}.`);
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: payload,
});

if (!response.ok && response.status !== 202) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed: ${response.status} ${body}`);
}

console.log(
  `Submitted ${urlList.length} canonical URLs to IndexNow (${response.status}).`,
);
