"use client";

export default function TypingText({
  paragraph,
  typedText,
  cursorIndex,
  getCharacterStyle,
}) {
  return (
    <div
      className="text-left font-mono text-xl tracking-wide"
      style={{ lineHeight: "2.5rem", wordWrap: "break-word" }}
    >
      {paragraph.split("").map((char, index) => (
        <span key={index}>
          {index === cursorIndex ? (
            <span className="cursor">{char === " " ? "\u00A0" : char}</span>
          ) : (
            <span
              className={`transition-all duration-150 ${getCharacterStyle(
                index
              )}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
