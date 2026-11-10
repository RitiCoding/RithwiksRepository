import "server-only";

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
import { cache } from "react";
import {
  parseEntries,
  parseFields,
  parseProject,
  toBlocks,
  type Entry,
  type TextBlock,
} from "./text-format";

/**
 * Everything on the site comes from public/content (see "START HERE.txt"
 * in that folder). A mistake in those files should show up as a filler image
 * and a line in the terminal, never as a broken build.
 */

const CONTENT_ROOT = path.join(process.cwd(), "public", "content");

const IMAGE_TYPES = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);
const VIDEO_TYPES = new Set([".mp4", ".webm", ".mov", ".m4v"]);

export type ImageMedia = {
  kind: "image";
  src: string;
  width: number;
  height: number;
  external?: boolean;
};
export type FillerMedia = { kind: "filler"; problem?: string };
export type Media =
  | ImageMedia
  | FillerMedia
  | { kind: "video"; src: string }
  | { kind: "youtube"; id: string };

export type Figure = {
  media: Media;
  word: "image" | "video";
  caption: TextBlock[];
};

export type Project = {
  slug: string;
  title: string;
  years: string;
  tagline: string;
  tags: string[];
  thumbnail: Media;
  story: TextBlock[];
  figures: Figure[];
  link?: { href: string; label: string };
};

export type Profile = {
  siteName: string;
  name: string;
  greeting: string;
  status: string;
  portrait: Media;
  portraitFocus: string;
  email: string;
  github: string;
  linkedin: string;
  bio: TextBlock[];
  footer: string;
};

export type SkillArea = {
  name: string;
  groups: { label: string; items: string }[];
  seenIn: { title: string; slug: string }[];
};
export type Job = {
  place: string;
  role: string;
  when: string;
  about: string;
};
export type Award = {
  title: string;
  mark: string;
  from: string;
  about: string;
};

function warn(where: string, problem: string) {
  console.warn(`[site content] ${where}: ${problem}`);
}

function readText(...segments: string[]): string {
  try {
    return readFileSync(path.join(CONTENT_ROOT, ...segments), "utf8");
  } catch {
    warn(segments.join("/"), "this file is missing");
    return "";
  }
}

function listFolder(...segments: string[]): string[] {
  try {
    return readdirSync(path.join(CONTENT_ROOT, ...segments));
  } catch {
    return [];
  }
}

function webPath(segments: string[]): string {
  return `/content/${segments.map(encodeURIComponent).join("/")}`;
}

function field(entry: Entry[], key: string): string {
  return entry.find((item) => item.key === key)?.value ?? "";
}

async function resolveLocalFile(
  value: string,
  folder: string[],
  where: string,
): Promise<Media> {
  const fail = (problem: string): FillerMedia => {
    warn(where, problem);
    return { kind: "filler", problem };
  };

  // Matching ignores capitals: Windows doesn't care about them but Vercel does.
  const files = listFolder(...folder);
  const wanted = value.toLowerCase();
  const name =
    files.find((file) => file.toLowerCase() === wanted) ??
    files.find((file) => path.parse(file).name.toLowerCase() === wanted);

  if (!name) return fail(`couldn't find a file called "${value}"`);

  const type = path.extname(name).toLowerCase();
  const src = webPath([...folder, name]);

  if (VIDEO_TYPES.has(type)) return { kind: "video", src };
  if (!IMAGE_TYPES.has(type)) {
    return fail(`"${name}" can't be shown on a website, save it as a .jpg`);
  }

  try {
    const size = await imageSizeFromFile(
      path.join(CONTENT_ROOT, ...folder, name),
    );
    // Phone photos often store "rotate me" separately from their pixels.
    const sideways = (size.orientation ?? 1) >= 5;
    return {
      kind: "image",
      src,
      width: sideways ? size.height : size.width,
      height: sideways ? size.width : size.height,
    };
  } catch {
    return fail(`"${name}" looks damaged and couldn't be read`);
  }
}

function resolveWebAddress(value: string, where: string): Media {
  const youtube = value.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/i,
  );
  if (youtube) return { kind: "youtube", id: youtube[1] };

  const type = path.extname(value.split(/[?#]/)[0]).toLowerCase();
  if (VIDEO_TYPES.has(type)) return { kind: "video", src: value };
  if (IMAGE_TYPES.has(type)) {
    return {
      kind: "image",
      src: value,
      width: 1600,
      height: 1000,
      external: true,
    };
  }

  const problem = `"${value}" isn't a YouTube link or a direct link to a file`;
  warn(where, problem);
  return { kind: "filler", problem };
}

function resolveMedia(
  target: string,
  folder: string[],
  where: string,
): Media | Promise<Media> {
  const value = target.trim();
  if (!value || value.toLowerCase() === "filler") return { kind: "filler" };
  if (/^https?:\/\//i.test(value)) return resolveWebAddress(value, where);
  return resolveLocalFile(value, folder, where);
}

function folderToSlug(folder: string): string {
  const withoutNumber = folder.replace(/^\d+[\s._-]*/, "") || folder;
  return withoutNumber
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function folderToTitle(folder: string): string {
  const words = (folder.replace(/^\d+[\s._-]*/, "") || folder).replace(
    /[-_]+/g,
    " ",
  );
  return words.charAt(0).toUpperCase() + words.slice(1);
}

async function loadProject(folder: string): Promise<Project | null> {
  const where = `projects/${folder}`;
  const location = ["projects", folder];
  const files = listFolder(...location);

  // Windows can hide extensions and leave "project.txt.txt"; any .txt will do.
  const textFile =
    files.find((file) => file.toLowerCase() === "project.txt") ??
    files.find((file) => file.toLowerCase().endsWith(".txt"));

  if (!textFile) {
    warn(where, "skipped because there's no project.txt in this folder");
    return null;
  }

  const raw = parseProject(readText(...location, textFile), files);

  const figures: Figure[] = await Promise.all(
    raw.media.map(async (item) => ({
      media: await resolveMedia(item.target, location, where),
      word: item.word,
      caption: toBlocks(item.lines),
    })),
  );

  const chosen = await resolveMedia(
    raw.fields.get("thumbnail") ?? "",
    location,
    where,
  );
  // With no thumbnail chosen, use the first real photo, then the first video.
  const firstMedia =
    figures.find((figure) => figure.media.kind === "image") ??
    figures.find((figure) => figure.media.kind !== "filler");
  const thumbnail =
    chosen.kind === "filler" ? (firstMedia?.media ?? chosen) : chosen;

  const linkAddress = raw.fields.get("link")?.trim();

  return {
    slug: folderToSlug(folder),
    title: raw.fields.get("title") || folderToTitle(folder),
    years: raw.fields.get("years") ?? "",
    tagline: raw.fields.get("tagline") ?? "",
    tags: (raw.fields.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    thumbnail,
    story: toBlocks(raw.storyLines),
    figures,
    link: linkAddress
      ? {
          href: /^https?:\/\//i.test(linkAddress)
            ? linkAddress
            : `https://${linkAddress}`,
          label: raw.fields.get("link text") || "More Info",
        }
      : undefined,
  };
}

/** Folders appear in the order you see them in File Explorer. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const folders = listFolder("projects")
    .filter((name) => !name.startsWith("_") && !name.startsWith("."))
    .filter((name) =>
      statSync(path.join(CONTENT_ROOT, "projects", name)).isDirectory(),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const loaded = await Promise.all(folders.map(loadProject));

  const seen = new Set<string>();
  return loaded.filter((project): project is Project => {
    if (!project) return false;
    if (seen.has(project.slug)) {
      warn(project.slug, "two project folders share this name, showing one");
      return false;
    }
    seen.add(project.slug);
    return true;
  });
});

const ABOUT_KEYS = [
  "site name",
  "name",
  "greeting",
  "status",
  "portrait",
  "portrait focus",
  "email",
  "github",
  "linkedin",
  "bio",
  "footer",
] as const;

export const getProfile = cache(async (): Promise<Profile> => {
  const fields = parseFields(readText("about.txt"), ABOUT_KEYS);
  const line = (key: (typeof ABOUT_KEYS)[number], fallback = "") =>
    fields
      .get(key)
      ?.map((text) => text.trim())
      .filter(Boolean)
      .join(" ") || fallback;

  return {
    siteName: line("site name", "Portfolio"),
    name: line("name"),
    greeting: line("greeting", "hello."),
    status: line("status"),
    portrait: await resolveMedia(line("portrait"), [], "about.txt"),
    portraitFocus: line("portrait focus", "50% 50%"),
    email: line("email"),
    github: line("github"),
    linkedin: line("linkedin"),
    bio: toBlocks(fields.get("bio") ?? []),
    footer: line("footer"),
  };
});

export const getSkills = cache(
  async (): Promise<{ intro: string; areas: SkillArea[] }> => {
    const projects = await getProjects();
    const { head, entries } = parseEntries(readText("skills.txt"), "area");

    return {
      intro: field(head, "intro"),
      areas: entries.map((entry) => ({
        name: field(entry, "area"),
        groups: entry
          .filter((item) => item.key !== "area" && item.key !== "seen in")
          .map((item) => ({ label: item.label, items: item.value })),
        seenIn: field(entry, "seen in")
          .split(",")
          .map((slug) =>
            projects.find((project) => project.slug === slug.trim()),
          )
          .filter((project) => project !== undefined)
          .map(({ title, slug }) => ({ title, slug })),
      })),
    };
  },
);

export const getExperience = cache(
  async (): Promise<{ intro: string; jobs: Job[] }> => {
    const { head, entries } = parseEntries(
      readText("experience.txt"),
      "place",
      ["role", "when", "about"],
    );

    return {
      intro: field(head, "intro"),
      jobs: entries.map((entry) => ({
        place: field(entry, "place"),
        role: field(entry, "role"),
        when: field(entry, "when"),
        about: field(entry, "about"),
      })),
    };
  },
);

export const getAwards = cache(
  async (): Promise<{ intro: string; awards: Award[] }> => {
    const { head, entries } = parseEntries(readText("awards.txt"), "award", [
      "mark",
      "from",
      "about",
    ]);

    return {
      intro: field(head, "intro"),
      awards: entries.map((entry) => ({
        title: field(entry, "award"),
        mark: field(entry, "mark"),
        from: field(entry, "from"),
        about: field(entry, "about"),
      })),
    };
  },
);
