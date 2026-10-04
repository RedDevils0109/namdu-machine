import type { ProductSpec } from "@/types";

export function SpecTable({ specs, caption }: { specs: ProductSpec[]; caption: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-olive-200 bg-cream-50 shadow-soft">
      <table className="w-full text-left text-sm sm:text-base">
        <caption className="sr-only">{caption}</caption>
        <tbody className="divide-y divide-cream-300">
          {specs.map((spec) => (
            <tr key={spec.label}>
              <th scope="row" className="w-2/5 bg-cream-200 px-4 py-3 align-top font-semibold text-olive-900 sm:px-5">
                {spec.label}
              </th>
              <td className="px-4 py-3 text-ink-700 sm:px-5">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
