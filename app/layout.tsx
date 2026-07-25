import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { stripMarkers } from "@/components/rich-text";
import ThemeToggle from "@/components/theme-toggle";
import { profile } from "@/lib/data";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: profile.siteTitle,
  description: stripMarkers(profile.intro),
};

// Applies a stored light-theme preference before first paint (dark is the
// CSS default, so only "light" needs to be set).
const themeInit = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
