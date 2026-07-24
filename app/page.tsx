import Projects from "@/components/projects";
import {
  awards,
  education,
  experience,
  profile,
  projects,
  publications,
  skills,
} from "@/lib/data";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <p className="font-mono text-xs font-semibold tracking-[0.1em] text-accent">
        {number}
      </p>
      <h2 className="mt-2 mb-10 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  const sections: { title: string; body: React.ReactNode }[] = [];

  if (experience.length > 0) {
    sections.push({
      title: "Experience",
      body: (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="rounded-md border border-line bg-surface p-5"
            >
              <h3 className="text-[15px] font-extrabold tracking-tight">
                {job.company}
              </h3>
              <p className="mt-1 text-sm font-semibold text-ink/90">
                {job.role}
              </p>
              {job.summary && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {job.summary}
                </p>
              )}
              <p className="mt-3 font-mono text-xs text-faint">{job.period}</p>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (education.length > 0) {
    sections.push({
      title: "Education",
      body: (
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((school) => (
            <li
              key={school.school}
              className="rounded-md border border-line bg-surface p-5"
            >
              <h3 className="text-[15px] font-extrabold tracking-tight">
                {school.school}
              </h3>
              <p className="mt-1 text-sm font-semibold text-ink/90">
                {school.credential}
              </p>
              <ul className="mt-2 space-y-1.5">
                {school.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-sm leading-relaxed text-muted"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-xs text-faint">
                {school.period}
              </p>
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
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={award.title} className="border-l-2 border-accent/40 pl-4">
              <h3 className="text-[15px] font-extrabold tracking-tight">
                {award.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {award.description}
              </p>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (publications.length > 0) {
    sections.push({
      title: "Publications",
      body: (
        <ul className="space-y-8">
          {publications.map((pub) => (
            <li key={pub.title} className="max-w-3xl">
              {pub.href ? (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold leading-snug underline-offset-4 hover:underline"
                >
                  {pub.title}
                </a>
              ) : (
                <p className="font-semibold leading-snug">{pub.title}</p>
              )}
              <p className="mt-1.5 text-sm text-muted">{pub.authors}</p>
              <p className="mt-0.5 text-sm italic text-faint">{pub.venue}</p>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (skills.length > 0) {
    sections.push({
      title: "Skills",
      body: (
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((area) => (
            <div
              key={area.area}
              className="rounded-md border border-line bg-surface p-6"
            >
              <h3 className="text-lg font-extrabold tracking-tight">
                {area.area}
              </h3>
              <dl className="mt-5 space-y-4">
                {area.groups.map((group) => (
                  <div key={group.label}>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                      {group.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">
                      {group.items}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (projects.length > 0) {
    sections.push({
      title: "Projects",
      body: <Projects projects={projects} />,
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 sm:px-10">
      <header className="flex min-h-[85svh] flex-col justify-center py-24">
        <p className="flex items-center gap-2.5 font-mono text-sm text-muted">
          <span
            aria-hidden
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"
          />
          {profile.availability}
        </p>
        <h1 className="mt-6 text-6xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl">
          hi, i&apos;m {profile.firstName}!
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.intro}
        </p>
        <nav className="mt-10 flex gap-6">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {sections.map((section, i) => (
          <Section
            key={section.title}
            number={String(i + 1).padStart(2, "0")}
            title={section.title}
          >
            {section.body}
          </Section>
        ))}
      </main>

      <footer className="border-t border-line py-10 font-mono text-xs text-faint">
        <p>
          © {new Date().getFullYear()} {profile.fullName}
        </p>
      </footer>
    </div>
  );
}
