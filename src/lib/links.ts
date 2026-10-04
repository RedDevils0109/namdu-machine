import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

/** Prefixes an internal path with the language segment: ("vi", "/products") -> "/vi/products". */
export function localeHref(lang: Locale, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function contactHref(lang: Locale, productName?: string): string {
  const base = localeHref(lang, "/contact");
  return productName ? `${base}?product=${encodeURIComponent(productName)}` : base;
}

export function quoteMessage(dict: Pick<Dictionary, "quote">, company: string, productName?: string): string {
  return productName
    ? format(dict.quote.messageProduct, { company, product: productName })
    : format(dict.quote.messageGeneric, { company });
}

export function quoteSubject(dict: Pick<Dictionary, "quote">, productName?: string): string {
  return productName
    ? format(dict.quote.emailSubjectProduct, { product: productName })
    : dict.quote.emailSubjectGeneric;
}

export function whatsappHref(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function zaloHref(number: string): string {
  return `https://zalo.me/${number}`;
}

export function emailHref(address: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${address}${query ? `?${query}` : ""}`;
}
