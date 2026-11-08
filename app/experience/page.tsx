import type { Metadata } from "next";
import SubPage from "@/components/sub-page";
import { RichText } from "@/components/text";
import { getExperience, getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

const STILL_GOING = /\b(now|present|current)\s*$/i;

export default async function ExperiencePage() {
  const [profile, { intro, jobs }] = await Promise.all([
    getProfile(),
    getExperience(),
  ]);

  return (
    <SubPage
      href="/experience"
      title="Experience"
      note={profile.experienceDrawer}
      intro={intro}
    >
      <ol>
        {jobs.map((job, i) => (
          <li key={i} className="log-entry">
            <p className="note log-when">
              {job.when}
              {STILL_GOING.test(job.when) && (
                <span className="log-still">Still at it</span>
              )}
            </p>
            <div>
              <h2 className="log-place">
                <RichText text={job.place} />
              </h2>
              <p className="mt-0.5 font-medium">
                <RichText text={job.role} />
              </p>
              {job.about && (
                <p className="mt-2 max-w-[42rem] leading-[1.42] text-soft">
                  <RichText text={job.about} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SubPage>
  );
}
