"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { format } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { resolveVideo } from "@/lib/video";

export interface VideoEmbedLabels {
  /** Play button label with a `{title}` placeholder. */
  play: string;
  unavailable: string;
}

interface VideoEmbedProps {
  url: string;
  title: string;
  thumbnail?: string;
  labels: VideoEmbedLabels;
  /** Fill a positioned parent instead of drawing its own 16:9 card. */
  fill?: boolean;
}

/**
 * YouTube links show a poster until clicked, so the YouTube player only loads
 * on demand. Other links use the browser's own video player, which shows the
 * first frame (or `thumbnail`) and only downloads the file when played.
 */
export function VideoEmbed({ url, title, thumbnail, labels, fill = false }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const source = resolveVideo(url);
  const frame = fill
    ? "absolute inset-0 overflow-hidden bg-olive-950"
    : "relative aspect-video overflow-hidden rounded-lg bg-olive-950 shadow-card";

  if (!source) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-olive-100 text-sm text-ink-500",
          fill ? "absolute inset-0" : "aspect-video rounded-lg",
        )}
      >
        {labels.unavailable}
      </div>
    );
  }

  if (source.kind === "file") {
    return (
      <div className={frame}>
        <video
          // `#t=0.1` makes iPhone Safari show the first frame instead of a blank box.
          src={source.src.includes("#") ? source.src : `${source.src}#t=0.1`}
          poster={thumbnail}
          title={title}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-contain"
        />
      </div>
    );
  }

  const poster = thumbnail ?? source.poster;

  return (
    <div className={frame}>
      {playing ? (
        <iframe
          src={`${source.embedUrl}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={format(labels.play, { title })}
        >
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-olive-950/30 transition-colors group-hover:bg-olive-950/45" />
          <span className="absolute left-1/2 top-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 text-ink-900 shadow-lift transition-transform group-hover:scale-110">
            <Icon name="play" className="ml-1 size-8" />
          </span>
        </button>
      )}
    </div>
  );
}
