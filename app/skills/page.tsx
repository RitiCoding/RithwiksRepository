import type { Metadata } from "next";
import Link from "next/link";
import SubPage from "@/components/sub-page";
import { RichText } from "@/components/text";
import { getProfile, getSkills } from "@/lib/content";

export const metadata: Metadata = { title: "Skills" };

export default async function SkillsPage() {
  const [profile, { intro, areas }] = await Promise.all([
    getProfile(),
    getSkills(),
  ]);

  return (
    <SubPage
      href="/skills"
      title="Skills"
      note={profile.skillsDrawer}
      intro={intro}
    >
      <div className="cards">
        {areas.map((area) => (
          <article key={area.name} className="card">
            <span className="strip" aria-hidden />
            <h2 className="card-title">
              <RichText text={area.name} />
            </h2>
            <dl>
              {area.groups.map((group) => (
                <div key={group.label}>
                  <dt>
                    <RichText text={group.label} />
                  </dt>
                  <dd>
                    <RichText text={group.items} />
                  </dd>
                </div>
              ))}
            </dl>
            {area.seenIn.length > 0 && (
              <p>
                <span className="note text-[0.98rem]">Seen in </span>
                {area.seenIn.map((project, i) => (
                  <span key={project.slug}>
                    {i > 0 && ", "}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-link"
                    >
                      <RichText text={project.title} />
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </article>
        ))}
      </div>
    </SubPage>
  );
}
