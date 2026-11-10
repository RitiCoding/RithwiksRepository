import type { Metadata } from "next";
import { Wix_Madefor_Display, Wix_Madefor_Text } from "next/font/google";
import { getProfile } from "@/lib/content";
import { plainText } from "@/lib/text-format";
import "./globals.css";

const display = Wix_Madefor_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const text = Wix_Madefor_Text({
  variable: "--font-text",
  subsets: ["latin"],
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
      className={`${display.variable} ${text.variable} antialiased`}
    >
      {/* Browser extensions like Grammarly add attributes to <body>. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
