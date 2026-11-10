import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FigureMedia, mediaRatio } from "@/components/media";
import { Blocks, RichText } from "@/components/text";
import { getProjects } from "@/lib/content";
import { plainText } from "@/lib/text-format";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="page detail">
      <Link href="/" className="back-link">
        <span aria-hidden>&larr;</span> Back
      </Link>

      <header className="detail-head">
        {project.years && <p className="availability">{project.years}</p>}
        <h1>
          <RichText text={project.title} />
        </h1>
        {project.tagline && (
          <p className="detail-tagline">
            <RichText text={project.tagline} />
          </p>
        )}
        {project.tags.length > 0 && (
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {project.story.length > 0 && (
        <div className="detail-story prose-flow">
          <Blocks blocks={project.story} />
        </div>
      )}

      {project.figures.length > 0 && (
        <div className="figures">
          {project.figures.map((figure, i) => {
            const ratio = mediaRatio(figure.media);
            return (
              <figure key={i}>
                <div
                  className="figure-photo"
                  style={
                    ratio ? ({ "--ratio": ratio } as CSSProperties) : undefined
                  }
                >
                  <FigureMedia
                    media={figure.media}
                    word={figure.word}
                    alt={plainText(figure.caption)}
                    eager={i === 0}
                  />
                </div>
                <figcaption>
                  <span className="figure-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="prose-flow">
                    <Blocks blocks={figure.caption} />
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="more-info"
        >
          <RichText text={project.link.label} />
          <span aria-hidden>&#8599;</span>
        </a>
      )}

      <footer className="detail-foot">
        <Link href="/" className="back-link">
          <span aria-hidden>&larr;</span> Back
        </Link>
        {projects.length > 1 && (
          <Link href={`/projects/${next.slug}`} className="next-link">
            Next: <RichText text={next.title} /> <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </footer>
    </main>
  );
}
