import type { Metadata } from "next";
import { Alegreya_Sans, Besley } from "next/font/google";
import { getProfile } from "@/lib/content";
import { plainText } from "@/lib/text-format";
import "./globals.css";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const alegreya = Alegreya_Sans({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();

  return {
    title: {
      default: profile.siteName,
      template: `%s | ${profile.siteName}`,
    },
    description: plainText(profile.bio),
    // Keep this site out of search results. Inherited by every route. Note:
    // robots.txt must NOT disallow crawling, because a blocked crawler never
    // reads these tags, and they are what actually keep pages out.
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${besley.variable} ${alegreya.variable} antialiased`}
    >
      {/* Browser extensions like Grammarly add attributes to <body>. */}
      <body suppressHydrationWarning className="min-h-svh">
        {children}
      </body>
    </html>
  );
}
