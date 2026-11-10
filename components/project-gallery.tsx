"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Media } from "@/lib/content";
import { Thumbnail } from "./media";
import { RichText } from "./text";

export type GalleryProject = {
  slug: string;
  title: string;
  years: string;
  tagline: string;
  tags: string[];
  thumbnail: Media;
};

// How wide each button is, out of 12 columns. Each line is one row, and the
// pattern repeats all the way down the page.
const ROWS = [
  [7, 5],
  [4, 4, 4],
  [5, 7],
  [4, 4, 4],
  [3, 3, 3, 3],
];

// When too few projects are left to finish a row, these shapes fill it.
const LAST_ROW: Record<number, number[]> = {
  1: [12],
  2: [7, 5],
  3: [4, 4, 4],
};

function arrange(count: number) {
  const cells: { span: number; position: number }[] = [];
  for (let row = 0; cells.length < count; row++) {
    const left = count - cells.length;
    const pattern = ROWS[row % ROWS.length];
    const spans = left < pattern.length ? LAST_ROW[left] : pattern;
    spans.forEach((span, position) => cells.push({ span, position }));
  }
  return cells;
}

const SIZES: Record<number, string> = {
  12: "(min-width: 1000px) 700px, (min-width: 640px) 58vw, 92vw",
  // Wider than its box, because a landscape photo is cropped to fit it.
  7: "(min-width: 1000px) 640px, (min-width: 640px) 58vw, 92vw",
  5: "(min-width: 1000px) 490px, (min-width: 640px) 58vw, 92vw",
  4: "(min-width: 1000px) 390px, 46vw",
  3: "(min-width: 1000px) 290px, 46vw",
};

export default function ProjectGallery({
  projects,
}: {
  projects: GalleryProject[];
}) {
  const filters = useMemo(() => {
    const tags = [...new Set(projects.flatMap((project) => project.tags))];
    const isOther = (tag: string) => tag.toLowerCase() === "other";
    return ["All", ...tags.filter((t) => !isOther(t)), ...tags.filter(isOther)];
  }, [projects]);

  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(active));

  const cells = arrange(visible.length);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="filter"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="gallery">
        {visible.map((project, index) => {
          const { span, position } = cells[index];
          // On smaller screens, the last of three goes full width so a row
          // of two never leaves a gap beside it.
          const third = span === 4 && position === 2;
          // A long button on the right of its row mirrors, with the picture
          // on the outside edge.
          const flip = span >= 5 && position === 1;
          return (
            <div
              key={project.slug}
              className={`project-cell span-${span}${third ? " third" : ""}${flip ? " flip" : ""}`}
            >
              <Link href={`/projects/${project.slug}`} className="project">
                <div className="project-photo">
                  <Thumbnail
                    media={project.thumbnail}
                    sizes={SIZES[third ? 5 : span]}
                    eager={index < 2}
                  />
                </div>
                <div className="project-text">
                  {project.years && (
                    <span className="project-years">{project.years}</span>
                  )}
                  <h3>
                    <RichText text={project.title} />
                  </h3>
                  {project.tagline && (
                    <p className="project-line">
                      <RichText text={project.tagline} />
                    </p>
                  )}
                  <div className="project-foot">
                    {project.tags.length > 0 && (
                      <div className="tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="project-go" aria-hidden>
                      <span className="project-go-label">View project</span>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.750 8h10.500M9 3.750 13.250 8 9 12.250" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
