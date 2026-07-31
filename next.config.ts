import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the user's home directory makes Next.js
  // infer the wrong workspace root; pin it to this project.
  turbopack: {
    root: __dirname,
  },
  // Belt-and-braces companion to the `robots` metadata in app/layout.tsx:
  // covers non-HTML responses (images, icon.svg) that carry no meta tags.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
