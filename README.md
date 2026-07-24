# Rithwik's Repository

Rithwik Nair's single-page portfolio — built with [Next.js 16](https://nextjs.org) (App Router, Turbopack) and [Tailwind CSS v4](https://tailwindcss.com), deployed on [Vercel](https://vercel.com). Black + dark red theme with a toggleable light/dark mode (dark by default, preference saved in localStorage). Design inspired by [Cooper's Corner](https://cooperscorner.vercel.app/).

## Editing content

**All site content lives in one file: [`lib/data.ts`](lib/data.ts)** — profile, experience, awards, publications, skills, and projects (sourced from LinkedIn/GitHub, July 2026).

- Each section is a typed array — add, edit, or remove entries freely.
- A section whose array is empty is hidden automatically (publications is empty
  today; add an entry and the section appears).
- Project filter buttons are derived from project tags — new tags become
  filters automatically.
- Every project has a subpage at `/projects/<slug>`. Drop photos/videos into
  `public/projects/<slug>/` and list them in that project's `media` array with
  a caption — images (.jpg/.png/.webp) and videos (.mp4/.mov/.webm) both work.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Fonts are Manrope (headings/body) and IBM Plex Mono (numbers, tags, filters), self-hosted via `next/font`. Theme palettes live in `app/globals.css`; the toggle is `components/theme-toggle.tsx`.

## Deploying to Vercel

Push to GitHub and import at [vercel.com/new](https://vercel.com/new) — every push deploys automatically. The site is fully static; no configuration needed.
