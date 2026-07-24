import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: profile.siteTitle };
  return {
    title: `${project.title} — ${profile.siteTitle}`,
    description: project.description,
  };
}

const isVideo = (src: string) => /\.(mp4|mov|webm)$/i.test(src);

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10 md:py-20">
      <Link
        href="/"
        className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        ← back
      </Link>

      <header className="mt-12">
        <p className="font-mono text-sm text-faint">{project.years}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-xs bg-accent/[0.06] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-faint"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          {project.description}
        </p>
      </header>

      {project.details && project.details.length > 0 && (
        <div className="mt-8 max-w-2xl space-y-4">
          {project.details.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {project.media && project.media.length > 0 && (
        <div className="mt-6">
          {project.media.map((item, i) => (
            <figure key={item.src} className="mt-14">
              <figcaption className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold tracking-[0.1em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-muted">
                  {item.caption}
                </span>
              </figcaption>
              {isVideo(item.src) ? (
                <video
                  src={item.src}
                  controls
                  playsInline
                  className="w-full rounded-md border border-line bg-surface"
                />
              ) : (
                // Plain <img> keeps user-supplied media free of dimension
                // config; files live in public/projects/<slug>/.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full rounded-md border border-line bg-surface"
                />
              )}
            </figure>
          ))}
        </div>
      )}

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          More Info <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}
