import Image from "next/image";
import type { ReactNode } from "react";
import Contact from "@/components/contact";
import ProjectGallery from "@/components/project-gallery";
import { Blocks, RichText } from "@/components/text";
import {
  getAwards,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/content";

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <p className="section-number">{String(number).padStart(2, "0")}</p>
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

export default async function Home() {
  const [profile, projects, { jobs }, { awards }, { areas }] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperience(),
      getAwards(),
      getSkills(),
    ]);

  const sections: { title: string; body: ReactNode }[] = [];

  if (jobs.length > 0) {
    sections.push({
      title: "Experience",
      body: (
        <ul className="entries">
          {jobs.map((job, i) => (
            <li key={i} className="entry">
              <h3>
                <RichText text={job.place} />
              </h3>
              <p className="entry-role">
                <RichText text={job.role} />
              </p>
              {job.when && <p className="entry-when">{job.when}</p>}
              {job.about && (
                <p className="entry-about">
                  <RichText text={job.about} />
                </p>
              )}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (awards.length > 0) {
    sections.push({
      title: "Awards",
      body: (
        <ul className="awards">
          {awards.map((award, i) => (
            <li key={i} className="award">
              <div className="award-head">
                <h3>
                  <RichText text={award.title} />
                </h3>
                {award.mark && (
                  <span className="award-mark">
                    <RichText text={award.mark} />
                  </span>
                )}
              </div>
              {award.from && (
                <p className="entry-role">
                  <RichText text={award.from} />
                </p>
              )}
              {award.about && (
                <p className="entry-about">
                  <RichText text={award.about} />
                </p>
              )}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (areas.length > 0) {
    sections.push({
      title: "Skills",
      body: (
        <div className="skills">
          {areas.map((area) => (
            <article key={area.name} className="skill">
              <h3>
                <RichText text={area.name} />
              </h3>
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
            </article>
          ))}
        </div>
      ),
    });
  }

  if (projects.length > 0) {
    sections.push({
      title: "Projects",
      body: (
        <ProjectGallery
          projects={projects.map(
            ({ slug, title, years, tagline, tags, thumbnail }) => ({
              slug,
              title,
              years,
              tagline,
              tags,
              thumbnail,
            }),
          )}
        />
      ),
    });
  }

  return (
    <div className="page">
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <header className="hero">
        {profile.portrait.kind === "image" && (
          <div className="hero-photo">
            <Image
              src={profile.portrait.src}
              alt={profile.name ? `Photo of ${profile.name}` : ""}
              fill
              loading="eager"
              sizes="540px"
              className="object-cover"
              style={{ objectPosition: profile.portraitFocus }}
            />
          </div>
        )}
        <div>
          {profile.status && (
            <p className="availability">
              <RichText text={profile.status} />
            </p>
          )}
          <h1>
            <RichText text={profile.greeting} />
          </h1>
          <div className="bio prose-flow">
            <Blocks blocks={profile.bio} />
          </div>
          <Contact profile={profile} />
        </div>
      </header>

      <main id="content">
        {sections.map((section, i) => (
          <Section key={section.title} number={i + 1} title={section.title}>
            {section.body}
          </Section>
        ))}
      </main>

      <footer className="site-foot">
        {profile.footer && (
          <p>
            <RichText text={profile.footer} />
          </p>
        )}
        <Contact profile={profile} />
      </footer>
    </div>
  );
}
