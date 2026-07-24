"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/data";

export default function Projects({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects) {
      for (const tag of project.tags) tags.add(tag);
    }
    return ["All", ...tags];
  }, [projects]);

  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(active));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
              active === filter
                ? "bg-ink text-surface"
                : "text-muted hover:bg-line hover:text-ink"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug} className="flex">
            <Link
              href={`/projects/${project.slug}`}
              className="flex flex-1 flex-col rounded-md border border-line bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-baseline justify-between font-mono text-xs text-faint">
                <span>{project.years}</span>
                <span aria-hidden className="text-accent">
                  ↗
                </span>
              </div>
              <h3 className="mt-3 text-[15px] font-extrabold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xs bg-accent/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
