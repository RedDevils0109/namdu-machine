"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";

function preferredLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && isLocale(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language.
  }
  const browser = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  return browser.startsWith("vi") ? "vi" : defaultLocale;
}

export function LanguageRedirect() {
  useEffect(() => {
    window.location.replace(`/${preferredLocale()}/`);
  }, []);
  return null;
}
