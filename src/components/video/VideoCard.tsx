import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { VideoEmbed, type VideoEmbedLabels } from "@/components/video/VideoEmbed";
import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  productHref?: string;
  labels: VideoEmbedLabels & { viewMachine: string };
}

export function VideoCard({ video, productHref, labels }: VideoCardProps) {
  return (
    <article className="flex h-full flex-col">
      <VideoEmbed url={video.videoUrl} title={video.title} thumbnail={video.thumbnail} labels={labels} />
      <div className="mt-4 flex-1">
        <Badge>{video.topic}</Badge>
        <h3 className="mt-3 text-lg font-bold">{video.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-700">{video.description}</p>
        {productHref && (
          <Link href={productHref} className="mt-2 inline-block text-sm font-semibold text-olive-700 hover:underline">
            {labels.viewMachine}
          </Link>
        )}
      </div>
    </article>
  );
}
