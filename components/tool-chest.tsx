import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/lib/content";
import { ArrowToPhoto, ArrowUp, Mug } from "./marks";
import { Filler } from "./media";
import { RichText } from "./text";

/** The main page's way into Skills, Experience, and Awards. */
export default function ToolChest({ profile }: { profile: Profile }) {
  const drawers = [
    { href: "/skills", label: "Skills", note: profile.skillsDrawer },
    {
      href: "/experience",
      label: "Experience",
      note: profile.experienceDrawer,
    },
    { href: "/awards", label: "Awards", note: profile.awardsDrawer },
  ];

  return (
    <div className="desk">
      <div className="desk-top">
        <div className="frame">
          <div className="frame-mat">
            <div className="frame-photo">
              {profile.portrait.kind === "image" ? (
                <Image
                  src={profile.portrait.src}
                  alt={profile.name ? `Photo of ${profile.name}` : ""}
                  fill
                  loading="eager"
                  sizes="(min-width: 900px) 220px, 50vw"
                  className="object-cover object-[45%_center]"
                />
              ) : (
                <Filler media={{ kind: "filler" }} />
              )}
            </div>
          </div>
        </div>
        <div className="desk-side">
          {profile.portraitNote && (
            <p className="note portrait-note">
              <RichText text={profile.portraitNote} />
              <ArrowToPhoto />
            </p>
          )}
          <Mug className="mug" />
        </div>
      </div>

      <nav aria-label="More about me" className="chest">
        <div className="chest-lid">
          <span className="chest-plate">
            <RichText text={profile.siteName} />
          </span>
        </div>
        <div className="chest-body">
          {drawers.map((drawer) => (
            <Link key={drawer.href} href={drawer.href} className="drawer">
              <span className="drawer-row">
                <span className="label-holder">
                  <span className="label drawer-label">{drawer.label}</span>
                </span>
                {drawer.note && (
                  <span className="drawer-note">
                    <RichText text={drawer.note} />
                  </span>
                )}
              </span>
              <span className="drawer-pull" aria-hidden />
            </Link>
          ))}
        </div>
        <div className="chest-base" />
      </nav>

      <p className="note drawers-note">
        <ArrowUp />
        <RichText text={profile.drawersNote} />
      </p>
    </div>
  );
}
