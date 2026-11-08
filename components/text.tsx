import type { ReactNode } from "react";
import { curlQuotes, type TextBlock } from "@/lib/text-format";

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders a line from a content file, with **bold** and [links](url). */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE)) {
    if (match.index > cursor) {
      parts.push(curlQuotes(text.slice(cursor, match.index)));
    }

    if (match[1] !== undefined) {
      parts.push(<strong key={match.index}>{curlQuotes(match[1])}</strong>);
    } else {
      const external = /^https?:/i.test(match[3]);
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className="text-link"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {curlQuotes(match[2])}
        </a>,
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) parts.push(curlQuotes(text.slice(cursor)));

  return <>{parts}</>;
}

export function Blocks({ blocks }: { blocks: TextBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.kind === "list" ? (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>
            <RichText text={block.text} />
          </p>
        ),
      )}
    </>
  );
}
