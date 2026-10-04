"use client";

import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n/getDictionary";
import { emailHref, quoteMessage, quoteSubject, whatsappHref, zaloHref } from "@/lib/links";
import type { SiteConfig } from "@/types";

const MAX_PRODUCT_LENGTH = 120;

interface QuotePanelProps {
  company: string;
  contact: SiteConfig["contact"];
  labels: Dictionary["contact"];
  quote: Dictionary["quote"];
}

export function QuotePanel({ company, contact, labels, quote }: QuotePanelProps) {
  const raw = useSearchParams().get("product");
  const product = raw ? raw.slice(0, MAX_PRODUCT_LENGTH) : undefined;
  const message = quoteMessage({ quote }, company, product);

  const channels = [
    {
      name: "WhatsApp",
      description: labels.whatsappDescription,
      href: whatsappHref(contact.whatsapp, message),
      icon: <Icon name="chat" className="size-6" />,
      tone: "bg-success text-cream-50",
    },
    {
      name: "Zalo",
      description: labels.zaloDescription,
      href: zaloHref(contact.zalo),
      icon: <span className="text-sm font-bold">Zalo</span>,
      tone: "bg-info text-cream-50",
    },
    {
      name: labels.emailLabel,
      description: labels.emailDescription,
      href: emailHref(contact.email, quoteSubject({ quote }, product), message),
      icon: <Icon name="mail" className="size-6" />,
      tone: "bg-olive-700 text-cream-50",
    },
  ];

  return (
    <div className="rounded-xl border border-cream-300 bg-cream-50 p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-bold">{labels.quoteTitle}</h2>
      {product ? (
        <p className="mt-3 rounded-md bg-amber-50 px-4 py-3 text-ink-900 ring-1 ring-inset ring-amber-200">
          {labels.askingAbout} <strong>{product}</strong>
        </p>
      ) : (
        <p className="mt-2 text-ink-700">{labels.pickChannel}</p>
      )}

      <ul className="mt-6 space-y-3">
        {channels.map((channel) => (
          <li key={channel.name}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-lg border border-cream-300 bg-cream-100 p-4 transition hover:border-olive-300 hover:bg-olive-50"
            >
              <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${channel.tone}`}>
                {channel.icon}
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-olive-950">{channel.name}</span>
                <span className="block text-sm text-ink-700">{channel.description}</span>
              </span>
              <Icon name="arrowRight" className="size-5 text-olive-600 transition-transform group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-lg bg-olive-50 p-4 text-sm text-ink-700">
        <p className="font-semibold text-olive-900">{labels.includeTitle}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {labels.includeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
