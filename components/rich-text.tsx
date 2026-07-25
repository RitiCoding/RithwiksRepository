/**
 * Renders **bold** spans inside plain data strings so copy in lib/data.ts can
 * carry emphasis without being JSX. Use stripMarkers() where plain text is
 * required (e.g. metadata descriptions).
 */

export function stripMarkers(text: string) {
  return text.replace(/\*\*/g, "");
}

export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
