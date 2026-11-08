# Rithwik's Repository

Rithwik Nair's portfolio, built with Next.js and deployed on Vercel.

**To change anything on the site, open [`public/content/START HERE.txt`](public/content/START%20HERE.txt).** All of the words, pictures, and projects live in that folder as plain text files and images. Adding or editing a project doesn't involve any code.

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

## How it fits together

- `public/content/` holds every word and image. `lib/content.ts` reads it at build time, and `lib/text-format.ts` is the forgiving parser for the `.txt` files.
- A mistake in a content file shows a filler image and a warning in the terminal. It never fails the build.
- Every route is prerendered. Pushing to `main` deploys through Vercel.
- The site is deliberately hidden from search engines (`robots` metadata in `app/layout.tsx`, `X-Robots-Tag` in `next.config.ts`). Don't add a sitemap or a `robots.txt` that disallows crawling, because crawlers have to be able to read the noindex.
