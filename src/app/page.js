"use client";

import { useState } from "react";

const PARAGRAPH = `
In tense situations, finding ways to placate opposing sides is an art. It requires understanding human proclivity—the tendencies and habits that drive behavior. However, immaturity, or a puerile approach, can derail even the best-intentioned efforts. Some might dismiss such attempts as quixotic, chasing idealistic but unrealistic outcomes.`.trim();

export default function TypingTest() {
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (isComplete) return; // Prevent further typing after completion

    const isCorrect = PARAGRAPH.startsWith(value); // Check if input matches the expected paragraph so far
    if (isCorrect) {
      setTypedText(value);
      if (value === PARAGRAPH) {
        setIsComplete(true); // Mark as complete when finished
      }
    } else {
      setTypedText(value); // Allow incorrect text for feedback
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide">Typing Test</h1>
        <p className="text-gray-400 mt-2">
          Type the text below as quickly and accurately as you can.
        </p>
      </div>

      {/* Typing Area */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <div
          className="text-left font-mono text-xl tracking-wide"
          style={{ lineHeight: "2.5rem", wordWrap: "break-word" }}
        >
          {PARAGRAPH.split("").map((char, index) => {
            const isTyped = index < typedText.length;
            const isCorrect = isTyped && typedText[index] === char;
            const isError = isTyped && typedText[index] !== char;

            return (
              <span
                key={index}
                className={`transition-all duration-150 ${
                  isTyped
                    ? isCorrect
                      ? "text-white"
                      : "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Invisible Text Area for Capturing Input */}
      <input
        type="text"
        value={typedText}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        className="w-full max-w-4xl mt-4 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-blue-400 text-lg font-mono text-white placeholder-gray-500 p-2"
        autoFocus
        disabled={isComplete}
      />

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-6 text-green-400 font-bold text-lg">
          🎉 Congratulations! You completed the test.
        </div>
      )}
    </div>
  );
}
