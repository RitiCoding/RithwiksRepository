import Image from "next/image";
import type { Media } from "@/lib/content";

function Filler({
  word,
  problem,
}: {
  word: "image" | "video";
  problem?: string;
}) {
  return (
    <span className="filler">
      <span>{word === "video" ? "Video coming soon" : "Photo coming soon"}</span>
      {/* Only you see this, while editing on your own computer. */}
      {process.env.NODE_ENV === "development" && problem && (
        <span className="filler-problem">{problem}</span>
      )}
    </span>
  );
}

export function Thumbnail({
  media,
  sizes,
  eager,
}: {
  media: Media;
  sizes: string;
  eager: boolean;
}) {
  switch (media.kind) {
    case "filler":
      return <Filler word="image" />;
    case "image":
      return (
        <Image
          src={media.src}
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          unoptimized={media.external}
          sizes={sizes}
          className="object-cover"
        />
      );
    case "video":
      return (
        <video
          src={`${media.src}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      );
    case "youtube":
      return (
        // YouTube's preview image has black bars built in. The scale hides them.
        <Image
          src={`https://i.ytimg.com/vi/${media.id}/hqdefault.jpg`}
          alt=""
          fill
          loading={eager ? "eager" : "lazy"}
          unoptimized
          sizes={sizes}
          className="scale-[1.34] object-cover"
        />
      );
  }
}

export function mediaRatio(media: Media): number | undefined {
  if (media.kind === "image") return media.width / media.height;
  if (media.kind === "youtube" || media.kind === "filler") return 16 / 9;
  return undefined;
}

export function FigureMedia({
  media,
  word,
  alt,
  eager,
}: {
  media: Media;
  word: "image" | "video";
  alt: string;
  eager: boolean;
}) {
  switch (media.kind) {
    case "filler":
      return <Filler word={word} problem={media.problem} />;
    case "image":
      return (
        <Image
          src={media.src}
          alt={alt}
          fill
          loading={eager ? "eager" : "lazy"}
          unoptimized={media.external}
          sizes="(min-width: 1200px) 1100px, 94vw"
          className="object-contain"
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
          className="block max-h-[85vh] max-w-full"
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
