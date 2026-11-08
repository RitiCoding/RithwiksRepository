import type { Metadata } from "next";
import { PencilCircle } from "@/components/marks";
import SubPage from "@/components/sub-page";
import { RichText } from "@/components/text";
import { getAwards, getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Awards" };

export default async function AwardsPage() {
  const [profile, { intro, awards }] = await Promise.all([
    getProfile(),
    getAwards(),
  ]);

  return (
    <SubPage
      href="/awards"
      title="Awards"
      note={profile.awardsDrawer}
      intro={intro}
    >
      <ul>
        {awards.map((award, i) => (
          <li key={i} className="award">
            <div>
              {award.mark && (
                <span className="award-mark">
                  <RichText text={award.mark} />
                  <PencilCircle />
                </span>
              )}
            </div>
            <div>
              <h2 className="log-place">
                <RichText text={award.title} />
              </h2>
              {award.from && (
                <p className="mt-0.5 font-medium">
                  <RichText text={award.from} />
                </p>
              )}
              {award.about && (
                <p className="mt-2 max-w-[42rem] leading-[1.42] text-soft">
                  <RichText text={award.about} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
