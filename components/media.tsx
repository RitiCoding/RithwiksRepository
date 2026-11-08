import Image from "next/image";
import type { FillerMedia, ImageMedia, Media } from "@/lib/content";

const TINTS = [
  "#d8c6a0",
  "#bccad3",
  "#dcb8a3",
  "#c6d0ae",
  "#e6d59b",
  "#cfc5cc",
];

export function Filler({
  media,
  word = "image",
  seed = 0,
}: {
  media: FillerMedia;
  word?: "image" | "video";
  seed?: number;
}) {
  return (
    <span
      className="filler"
      style={{ backgroundColor: TINTS[seed % TINTS.length] }}
    >
      <svg className="filler-sketch" viewBox="0 0 100 76" aria-hidden>
        {word === "video" ? (
          <path d="M10 13c20-1 60-1 80 0 2 16 2 34 0 50-20 1-60 1-80 0-2-16-2-34 0-50zM42 26l25 12-25 13z" />
        ) : (
          <path d="M8 25c0-4 2-6 5-6h15l7-10c1-1 3-2 5-2h20c2 0 4 1 5 2l7 10h15c3 0 5 2 5 6v39c0 4-2 6-5 6H13c-3 0-5-2-5-6zM50 27a16.500 16.500 0 1 1 0 33 16.500 16.500 0 0 1 0-33zM50 36a7.500 7.500 0 1 1 0 15 7.500 7.500 0 0 1 0-15zM79 29h6" />
        )}
      </svg>
      <span className="filler-label">
        {word === "video" ? "Video coming soon" : "Photo coming soon"}
      </span>
      {/* Only you see this, while editing on your own computer. */}
      {process.env.NODE_ENV === "development" && media.problem && (
        <span className="filler-problem">{media.problem}</span>
      )}
    </span>
  );
}

export function Thumbnail({
  media,
  seed,
}: {
  media: ImageMedia | FillerMedia;
  seed: number;
}) {
  if (media.kind === "filler") return <Filler media={media} seed={seed} />;

  return (
    <Image
      src={media.src}
      alt=""
      fill
      unoptimized={media.external}
      sizes="(min-width: 1000px) 340px, (min-width: 640px) 46vw, 92vw"
      className="object-cover"
    />
  );
}

export function mediaRatio(media: Media): number | undefined {
  if (media.kind === "image") return media.width / media.height;
  if (media.kind === "youtube") return 16 / 9;
  if (media.kind === "filler") return 16 / 9;
  return undefined;
}

export function FigureMedia({
  media,
  word,
  alt,
  seed,
  eager,
}: {
  media: Media;
  word: "image" | "video";
  alt: string;
  seed: number;
  eager: boolean;
}) {
  switch (media.kind) {
    case "filler":
      return <Filler media={media} word={word} seed={seed} />;
    case "image":
      return (
        <Image
          src={media.src}
          alt={alt}
          fill
          loading={eager ? "eager" : "lazy"}
          unoptimized={media.external}
          sizes="(min-width: 900px) 840px, 94vw"
          className="object-cover"
        />
      );
    case "video":
      return (
        <video
          src={`${media.src}#t=0.1`}
          controls
          playsInline
          preload="metadata"
          aria-label={alt}
          className="block max-h-[80vh] w-full"
        />
      );
    case "youtube":
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${media.id}`}
          title={alt || "Project video"}
          loading="lazy"
          allowFullScreen
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          className="absolute inset-0 size-full"
        />
      );
  }
}
