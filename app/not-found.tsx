import type { Metadata } from "next";
import { BackHome } from "@/components/sub-page";

export const metadata: Metadata = { title: "Nothing here" };

export default function NotFound() {
  return (
    <main className="sheet py-24">
      <h1 className="greeting">This drawer&rsquo;s empty.</h1>
      <p className="bio">
        There&rsquo;s nothing at this address. It may have moved, or the link
        might have a typo.
      </p>
      <div className="mt-6">
        <BackHome />
      </div>
    </main>
  );
}
