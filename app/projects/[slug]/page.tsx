import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/marks";
import { FigureMedia, mediaRatio } from "@/components/media";
import { BackHome } from "@/components/sub-page";
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
    <main className="sheet pb-20 pt-7">
      <BackHome />

      <header>
        <h1 className="project-title">
          <RichText text={project.title} />
        </h1>
        <div className="project-head">
          <div>
            {project.years && (
              <p className="note text-[1.15rem]">{project.years}</p>
            )}
            {project.tagline && (
              <p className="mt-2 text-[1.5rem] leading-[1.3]">
                <RichText text={project.tagline} />
              </p>
            )}
          </div>
          <div className="prose-flow leading-[1.45]">
            <Blocks blocks={project.story} />
            {project.link && (
              <p>
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  <RichText text={project.link.label} />
                </a>
              </p>
            )}
          </div>
        </div>
      </header>

      {project.figures.length > 0 && (
        <div className="figures">
          {project.figures.map((figure, i) => {
            const ratio = mediaRatio(figure.media);
            return (
              <figure key={i} className="figure">
                <div
                  className="print figure-print"
                  style={
                    ratio ? ({ "--ratio": ratio } as CSSProperties) : undefined
                  }
                >
                  <span className="strip" aria-hidden />
                  <div className="figure-photo">
                    <FigureMedia
                      media={figure.media}
                      word={figure.word}
                      alt={plainText(figure.caption)}
                      seed={i}
                      eager={i === 0}
                    />
                  </div>
                </div>
                <figcaption className="mt-4 flex max-w-[44rem] gap-4">
                  <span className="note shrink-0 pt-1 text-[0.98rem]">
                    Fig. {i + 1}
                  </span>
                  <div className="prose-flow leading-[1.42]">
                    <Blocks blocks={figure.caption} />
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-6">
        <BackHome />
        {projects.length > 1 && (
          <Link
            href={`/projects/${next.slug}`}
            className="back-home next-project"
          >
            Next up: <RichText text={next.title} />
            <ArrowRight />
          </Link>
        )}
      </footer>
    </main>
  );
}
