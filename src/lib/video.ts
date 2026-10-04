const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;

export type VideoSource =
  | { kind: "youtube"; embedUrl: string; poster: string }
  | { kind: "file"; src: string };

/**
 * Decides how a video link is played: YouTube links (watch, youtu.be, embed,
 * shorts, live) use the YouTube player; any other https link is treated as a
 * direct video file such as a Cloudinary MP4. Non-https links are rejected so
 * the player never loads arbitrary schemes.
 */
export function resolveVideo(url: string | undefined): VideoSource | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;

  const youtubeId = url.match(YOUTUBE_ID)?.[1];
  if (youtubeId) {
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`,
      poster: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  return { kind: "file", src: url };
}
