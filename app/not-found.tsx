import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="page detail">
      <Link href="/" className="back-link">
        <span aria-hidden>&larr;</span> Back
      </Link>
      <header className="detail-head">
        <h1>Page not found.</h1>
        <p className="detail-tagline">
          There&rsquo;s nothing at this address. It may have moved, or the link
          might have a typo.
        </p>
      </header>
    </main>
  );
}
