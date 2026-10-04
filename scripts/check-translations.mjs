#!/usr/bin/env node
/**
 * Checks that every language folder in src/data (and every dictionary in
 * src/i18n/dictionaries) has the same structure as the English source, and
 * that fields which must not be translated (slugs, links, images, flags)
 * are identical. Exit code 1 means something needs fixing.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "src", "data");
const dictDir = join(root, "src", "i18n", "dictionaries");
const SOURCE = "en";

// Values under these keys are shared across languages and must match exactly.
const MUST_MATCH = new Set([
  "slug",
  "categorySlug",
  "productSlug",
  "id",
  "href",
  "src",
  "url",
  "videoUrl",
  "thumbnail",
  "avatar",
  "featured",
  "order",
  "step",
  "icon",
  "platform",
  "model",
  "phone",
  "phoneHref",
  "email",
  "whatsapp",
  "whatsappDisplay",
  "zalo",
  "mapEmbedUrl",
  "mapLink",
  "siteUrl",
  "favicon",
  "ogImage",
]);

const problems = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    problems.push(`${path}: cannot read JSON (${error.message})`);
    return undefined;
  }
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function compare(source, target, where, key, strict = true) {
  const sourceType = typeOf(source);
  const targetType = typeOf(target);

  if (target === undefined) {
    problems.push(`${where}: missing`);
    return;
  }
  if (sourceType !== targetType) {
    problems.push(`${where}: expected ${sourceType}, found ${targetType}`);
    return;
  }
  if (sourceType === "array") {
    if (source.length !== target.length) {
      problems.push(`${where}: ${source.length} items in ${SOURCE}, ${target.length} here`);
    }
    source.forEach((item, index) => compare(item, target[index], `${where}[${index}]`, key, strict));
    return;
  }
  if (sourceType === "object") {
    for (const childKey of Object.keys(source)) {
      compare(source[childKey], target[childKey], `${where}.${childKey}`, childKey, strict);
    }
    for (const extra of Object.keys(target)) {
      if (!(extra in source)) problems.push(`${where}.${extra}: not present in ${SOURCE}`);
    }
    return;
  }
  if (strict && MUST_MATCH.has(key) && source !== target) {
    problems.push(`${where}: must match ${SOURCE} ("${source}"), found "${target}"`);
  }
}

// Content folders
const languages = readdirSync(dataDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const sourceFiles = readdirSync(join(dataDir, SOURCE)).filter((file) => file.endsWith(".json"));

for (const lang of languages.filter((l) => l !== SOURCE)) {
  const files = new Set(readdirSync(join(dataDir, lang)).filter((file) => file.endsWith(".json")));
  for (const file of sourceFiles) {
    const label = `src/data/${lang}/${file}`;
    if (!files.has(file)) {
      problems.push(`${label}: file missing`);
      continue;
    }
    compare(readJson(join(dataDir, SOURCE, file)), readJson(join(dataDir, lang, file)), label, "");
  }
}

// Interface dictionaries (text only, so only structure is compared)
const sourceDict = readJson(join(dictDir, `${SOURCE}.json`));
for (const file of readdirSync(dictDir).filter((f) => f.endsWith(".json") && f !== `${SOURCE}.json`)) {
  compare(sourceDict, readJson(join(dictDir, file)), `src/i18n/dictionaries/${file}`, "", false);
}

if (problems.length > 0) {
  console.error(`Translation check found ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`Translations OK: ${languages.join(", ")} match ${SOURCE}.`);
