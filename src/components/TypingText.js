"use client";

import "./TypingText.css";

export default function TypingText({
  paragraph,
  cursorIndex,
  getCharacterStyle,
}) {
  const maxLineWidth = 80; // Maximum characters per line

  // Function to split paragraph into lines without breaking words
  const splitParagraphIntoLines = (text, maxWidth) => {
    const words = text.split(" "); // Split text into words
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      if (currentLine.length + word.length + 1 <= maxWidth) {
        currentLine += (currentLine.length > 0 ? " " : "") + word;
      } else {
        lines.push(currentLine); // Save the current line
        currentLine = word; // Start a new line with the current word
      }
    });

    if (currentLine) lines.push(currentLine); // Add the remaining text
    return lines;
  };

  // Split the paragraph into lines
  const lines = splitParagraphIntoLines(paragraph, maxLineWidth);

  return (
    <div className="typing-area">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="line">
          {line.split("").map((char, charIndex) => {
            // Compute the global index of the character
            const absoluteIndex =
              lines
                .slice(0, lineIndex) // Sum up lengths of previous lines
                .reduce((total, prevLine) => total + prevLine.length + 1, 0) +
              charIndex;

            return (
              <span key={absoluteIndex} className="relative">
                {/* Render the cursor */}
                {absoluteIndex === cursorIndex && (
                  <span className="cursor absolute -left-1"></span>
                )}
                <span
                  className={`transition-all duration-150 ${getCharacterStyle(
                    absoluteIndex
                  )}`}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
