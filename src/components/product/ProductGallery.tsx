"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoEmbed, type VideoEmbedLabels } from "@/components/video/VideoEmbed";
import { format } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { resolveVideo } from "@/lib/video";
import type { ImageAsset } from "@/types";

interface ProductGalleryProps {
  images: ImageAsset[];
  /** Shown as the last slide, after the images. */
  video?: { url: string; title: string };
  labels: VideoEmbedLabels & {
    /** Image thumbnail label with `{index}` and `{alt}` placeholders. */
    showImage: string;
    /** Video thumbnail label with a `{title}` placeholder. */
    showVideo: string;
  };
}

export function ProductGallery({ images, video, labels }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const source = video ? resolveVideo(video.url) : null;
  const hasVideo = Boolean(video && source);
  const slideCount = images.length + (hasVideo ? 1 : 0);
  const showingVideo = hasVideo && active === images.length;
  const current = images[Math.min(active, images.length - 1)];
  const videoThumb = source?.kind === "youtube" ? source.poster : images[0].src;

  const nextSlide = () => setActive((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setActive((prev) => (prev - 1 + slideCount) % slideCount);

  return (
    <div>
      <div
        className={cn(
          "group relative aspect-[4/3] overflow-hidden rounded-lg border shadow-card touch-manipulation",
          showingVideo ? "border-olive-900 bg-olive-950" : "border-cream-300 bg-cream-200",
        )}
      >
        {showingVideo && video ? (
          <VideoEmbed url={video.url} title={video.title} thumbnail={images[0].src} labels={labels} fill />
        ) : (
          <button
            type="button"
            onClick={nextSlide}
            className="relative size-full text-left cursor-pointer focus:outline-none"
            aria-label={format(labels.showImage, { index: (active % images.length) + 1, alt: current.alt })}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover pointer-events-none"
            />
          </button>
        )}

        {/* Counter Badge */}
        {slideCount > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-olive-950/70 px-3 py-1 text-xs font-semibold text-cream-50 backdrop-blur pointer-events-none">
            {active + 1} / {slideCount}
          </div>
        )}

        {/* Prev / Next buttons */}
        {slideCount > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2.5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-olive-950/60 text-cream-50 backdrop-blur transition hover:bg-olive-950/80 active:scale-95 z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <Icon name="chevronLeft" className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2.5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-olive-950/60 text-cream-50 backdrop-blur transition hover:bg-olive-950/80 active:scale-95 z-10 cursor-pointer"
              aria-label="Next image"
            >
              <Icon name="chevronRight" className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {slideCount > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={format(labels.showImage, { index: index + 1, alt: image.alt })}
                aria-pressed={index === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-md border-2 transition cursor-pointer touch-manipulation",
                  index === active ? "border-olive-600 ring-2 ring-olive-600/30" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="120px" className="object-cover pointer-events-none" />
              </button>
            </li>
          ))}
          {hasVideo && video && (
            <li>
              <button
                type="button"
                onClick={() => setActive(images.length)}
                aria-label={format(labels.showVideo, { title: video.title })}
                aria-pressed={showingVideo}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-md border-2 transition cursor-pointer touch-manipulation",
                  showingVideo ? "border-olive-600 ring-2 ring-olive-600/30" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={videoThumb} alt="" fill sizes="120px" className="object-cover pointer-events-none" />
                <span className="absolute inset-0 bg-olive-950/40 pointer-events-none" />
                <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 text-ink-900 pointer-events-none">
                  <Icon name="play" className="ml-0.5 size-4" />
                </span>
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
