import { NotFoundContent } from "@/components/layout/NotFoundContent";
import en from "@/i18n/dictionaries/en.json";
import vi from "@/i18n/dictionaries/vi.json";

// not-found receives no route params, so the client picks the language from the URL.
export default function NotFound() {
  return <NotFoundContent labels={{ en: en.notFound, vi: vi.notFound }} />;
}
