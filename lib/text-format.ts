/**
 * The forgiving little format behind every .txt file in public/content.
 *
 * It is deliberately not YAML or Markdown front matter: a stray colon, quote,
 * or missing space in a text file should never be able to break the site.
 * Lines that aren't understood are treated as ordinary writing.
 */

export type TextBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

export type Entry = { key: string; label: string; value: string };

export type RawMedia = {
  word: "image" | "video";
  target: string;
  lines: string[];
};

export type RawProject = {
  fields: Map<string, string>;
  storyLines: string[];
  media: RawMedia[];
};

const NOTE_TO_SELF = /^\s*#(\s|$)/;
const BULLET = /^\s*[-*•]\s+/;
const FILE_EXTENSION = /\.[a-z0-9]{2,5}$/i;
const PROJECT_FIELDS = new Set([
  "title",
  "years",
  "tagline",
  "tags",
  "thumbnail",
  "link",
  "link text",
]);

export function readLines(raw: string): string[] {
  return raw
    .replace(/^﻿/, "") // Notepad can save a byte-order mark
    .split(/\r?\n/)
    .filter((line) => !NOTE_TO_SELF.test(line));
}

function splitKey(line: string): Entry | null {
  const match = line.match(/^\s*([^:]{1,40}?)\s*:\s*(.*)$/);
  if (!match) return null;
  return {
    key: match[1].toLowerCase(),
    label: match[1],
    value: match[2].trim(),
  };
}

/** Recognises "image: robot.jpg" without tripping on a caption like "Video: the first walk". */
function readMediaMarker(
  line: string,
  folderFiles: Set<string>,
): Pick<RawMedia, "word" | "target"> | null {
  const match = line.match(/^\s*(image|picture|photo|video)\s*:\s*(.*)$/i);
  if (!match) return null;
  const target = match[2].trim();
  const looksLikeAFile =
    target === "" ||
    /^https?:\/\//i.test(target) ||
    FILE_EXTENSION.test(target) ||
    !/\s/.test(target) ||
    folderFiles.has(target.toLowerCase());
  if (!looksLikeAFile) return null;
  return {
    word: match[1].toLowerCase() === "video" ? "video" : "image",
    target,
  };
}

export function parseProject(
  raw: string,
  fileNames: string[] = [],
): RawProject {
  const fields = new Map<string, string>();
  const storyLines: string[] = [];
  const media: RawMedia[] = [];
  const folderFiles = new Set(
    fileNames.flatMap((name) => [
      name.toLowerCase(),
      name.toLowerCase().replace(FILE_EXTENSION, ""),
    ]),
  );
  let section: "head" | "story" | "media" = "head";
  let lastField: string | null = null;

  for (const line of readLines(raw)) {
    const marker = readMediaMarker(line, folderFiles);
    if (marker) {
      media.push({ ...marker, lines: [] });
      section = "media";
      continue;
    }

    if (section === "media") {
      media[media.length - 1].lines.push(line);
      continue;
    }

    if (section === "story") {
      storyLines.push(line);
      continue;
    }

    const storyStart = line.match(/^\s*story\s*:\s*(.*)$/i);
    if (storyStart) {
      section = "story";
      if (storyStart[1]) storyLines.push(storyStart[1]);
      continue;
    }

    if (!line.trim()) {
      lastField = null;
      continue;
    }

    const pair = splitKey(line);
    if (pair && PROJECT_FIELDS.has(pair.key)) {
      fields.set(pair.key, pair.value);
      lastField = pair.key;
    } else if (lastField) {
      // A long value that spilled onto the next line.
      fields.set(lastField, `${fields.get(lastField)} ${line.trim()}`.trim());
    } else {
      // Writing with no "story:" above it is still the story.
      section = "story";
      storyLines.push(line);
    }
  }

  return { fields, storyLines, media };
}

/** Reads "key: value" lines; anything else belongs to the key above it. */
export function parseFields(
  raw: string,
  known: readonly string[],
): Map<string, string[]> {
  const fields = new Map<string, string[]>();
  let current: string[] | null = null;

  for (const line of readLines(raw)) {
    const pair = splitKey(line);
    if (pair && known.includes(pair.key)) {
      current = pair.value ? [pair.value] : [];
      fields.set(pair.key, current);
    } else {
      current?.push(line);
    }
  }

  return fields;
}

/**
 * Reads a list of entries, where each new `startKey` line begins a new entry.
 * With no `known` list, any short "label: value" line counts as a field.
 */
export function parseEntries(
  raw: string,
  startKey: string,
  known?: readonly string[],
): { head: Entry[]; entries: Entry[][] } {
  const head: Entry[] = [];
  const entries: Entry[][] = [];
  let bucket = head;

  for (const line of readLines(raw)) {
    if (!line.trim()) continue;

    const pair = splitKey(line);
    const isField =
      pair &&
      (pair.key === startKey ||
        pair.key === "intro" ||
        !known ||
        known.includes(pair.key));

    if (isField) {
      if (pair.key === startKey) {
        bucket = [];
        entries.push(bucket);
      }
      bucket.push(pair);
    } else if (bucket.length > 0) {
      const last = bucket[bucket.length - 1];
      last.value = `${last.value} ${line.trim()}`.trim();
    }
  }

  return { head, entries };
}

export function toBlocks(lines: string[]): TextBlock[] {
  const blocks: TextBlock[] = [];
  let group: string[] = [];

  const closeGroup = () => {
    if (group.length === 0) return;
    blocks.push(
      group.every((line) => BULLET.test(line))
        ? {
            kind: "list",
            items: group.map((line) => line.replace(BULLET, "").trim()),
          }
        : {
            kind: "paragraph",
            text: group.map((line) => line.trim()).join(" "),
          },
    );
    group = [];
  };

  for (const line of lines) {
    if (line.trim()) group.push(line);
    else closeGroup();
  }
  closeGroup();

  return blocks;
}

/** Strips **bold** and [link](url) markers for places that need plain words. */
export function plainText(blocks: TextBlock[]): string {
  return blocks
    .flatMap((block) => (block.kind === "list" ? block.items : [block.text]))
    .join(" ")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}

/** Curls straight quotes so text typed in Notepad still looks typeset. */
export function curlQuotes(text: string): string {
  return text
    .replace(/(^|[\s([{])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s([{])'/g, "$1‘")
    .replace(/'/g, "’");
}
