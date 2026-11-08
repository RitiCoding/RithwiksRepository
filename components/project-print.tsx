import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowRight } from "./marks";
import { Thumbnail } from "./media";
import { RichText } from "./text";

/** A project's button on the main page: a taped-down photo print. */
export default function ProjectPrint({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div>
      <Link href={`/projects/${project.slug}`} className="print print-link">
        <span className="strip" aria-hidden />
        <span className="print-photo">
          <Thumbnail media={project.thumbnail} seed={index} />
        </span>
        <span className="block px-1 pb-1 pt-3.5">
          <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.01em]">
            <RichText text={project.title} />
          </h3>
          {project.years && (
            <span className="note mt-1 block text-[0.98rem]">
              {project.years}
            </span>
          )}
          {project.tagline && (
            <span className="mt-1.5 block text-[1.13rem] leading-[1.32] text-soft">
              <RichText text={project.tagline} />
            </span>
          )}
          <span className="print-cta note mt-2.5 flex items-center gap-2 text-[0.98rem]">
            See the project
            <ArrowRight />
          </span>
        </span>
      </Link>
    </div>
  );
}
