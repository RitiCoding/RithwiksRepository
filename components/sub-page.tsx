import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "./marks";
import { RichText } from "./text";

const DRAWERS = [
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/awards", label: "Awards" },
];

export function BackHome() {
  return (
    <Link href="/" className="back-home">
      <ArrowLeft />
      Back home
    </Link>
  );
}

/** Shared frame for Skills, Experience, and Awards: you're in the open drawer. */
export default function SubPage({
  href,
  title,
  note,
  intro,
  children,
}: {
  href: string;
  title: string;
  note: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="sheet pb-20 pt-7">
      <BackHome />

      <header className="sub-head">
        <div className="sub-chest">
          <div className="drawer">
            <div className="drawer-row">
              <span className="label-holder">
                <h1 className="label sub-title">{title}</h1>
              </span>
              {note && (
                <span className="drawer-note">
                  <RichText text={note} />
                </span>
              )}
            </div>
            <span className="drawer-pull" aria-hidden />
          </div>
        </div>
        {intro && (
          <p className="sub-intro">
            <RichText text={intro} />
          </p>
        )}
      </header>

      <div className="mt-14">{children}</div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-6">
        <BackHome />
        <nav aria-label="The other drawers" className="other-drawers">
          <span className="note text-[1.02rem]">Or try another drawer</span>
          {DRAWERS.filter((drawer) => drawer.href !== href).map((drawer) => (
            <Link key={drawer.href} href={drawer.href}>
              <span className="label-holder">
                <span className="label">{drawer.label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}
