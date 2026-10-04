"use client";

import { useState } from "react";
import { VideoCard } from "@/components/video/VideoCard";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/cn";
import type { Video } from "@/types";

interface VideoGalleryProps {
  videos: Video[];
  topics: string[];
  productLinks: Record<string, string>;
  labels: Dictionary["videos"];
}

export function VideoGallery({ videos, topics, productLinks, labels }: VideoGalleryProps) {
  const [topic, setTopic] = useState<string | null>(null);
  const visible = topic ? videos.filter((video) => video.topic === topic) : videos;
  const filters: (string | null)[] = [null, ...topics];

  return (
    <>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item ?? "all"}
            type="button"
            onClick={() => setTopic(item)}
            aria-pressed={topic === item}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              topic === item ? "bg-olive-700 text-cream-50" : "bg-olive-50 text-olive-900 hover:bg-olive-100",
            )}
          >
            {item ?? labels.allVideos}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <li key={video.id}>
            <VideoCard
              video={video}
              productHref={video.productSlug ? productLinks[video.productSlug] : undefined}
              labels={labels}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
