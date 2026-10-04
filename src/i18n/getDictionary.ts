import en from "@/i18n/dictionaries/en.json";
import viJson from "@/i18n/dictionaries/vi.json";
import type { Locale } from "@/i18n/config";

export type Dictionary = typeof en;

// Typed assignment fails the build if vi.json is missing any key from en.json.
const vi: Dictionary = viJson;

const dictionaries: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export { format } from "@/i18n/format";
