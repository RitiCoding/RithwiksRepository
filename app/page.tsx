import Contact from "@/components/contact";
import ProjectPrint from "@/components/project-print";
import { Blocks, RichText } from "@/components/text";
import ToolChest from "@/components/tool-chest";
import { getProfile, getProjects } from "@/lib/content";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <main className="sheet pb-16">
      <section className="hero">
        <div>
          <h1 className="greeting">
            <RichText text={profile.greeting} />
          </h1>
          <div className="bio prose-flow">
            <Blocks blocks={profile.bio} />
          </div>
          {profile.status && (
            <p className="note status">
              <RichText text={profile.status} />
            </p>
          )}
          <Contact profile={profile} sayHi={profile.sayHi} />
        </div>
        <ToolChest profile={profile} />
      </section>

      <section aria-labelledby="projects-heading">
        <div className="mb-11 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <h2 id="projects-heading" className="section-heading">
            <RichText text={profile.projectsHeading} />
          </h2>
          {profile.projectsNote && (
            <p className="note text-[1.12rem]">
              <RichText text={profile.projectsNote} />
            </p>
          )}
        </div>
        <div className="prints">
          {projects.map((project, index) => (
            <ProjectPrint key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t-[1.5px] border-ink/40 pt-5">
        {profile.footer && (
          <p className="note text-[1.12rem]">
            <RichText text={profile.footer} />
          </p>
        )}
        <Contact profile={profile} />
      </footer>
    </main>
  );
}
