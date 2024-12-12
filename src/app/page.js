"use client";

import { useState, useEffect } from "react";
import { greWords } from "../data/greWords";
import TypingText from "@/components/TypingText";
import SynonymDisplay from "@/components/SynonymDisplay";

const WORDS = Object.keys(greWords["group1"]);
const PARAGRAPH = WORDS.join(" ").trim();

export default function TypingTest() {
  const [typedText, setTypedText] = useState("");
  const [cursorIndex, setCursorIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [currentSynonym, setCurrentSynonym] = useState("");

  const handleKeyDown = (event) => {
    if (isComplete) return;

    const key = event.key;
    if (key === "Backspace") {
      if (typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        setCursorIndex((prev) => Math.max(0, prev - 1));
      }
    } else if (/^[a-zA-Z0-9\s,;.!?()\-_"']$/.test(key)) {
      setTypedText((prev) => prev + key);
      setCursorIndex((prev) => prev + 1);
    }
  };

  const getCharacterStyle = (index) => {
    const isTyped = index < typedText.length;
    const isCorrect = isTyped && typedText[index] === PARAGRAPH[index];
    const isError = isTyped && typedText[index] !== PARAGRAPH[index];

    if (index === cursorIndex) return "text-white bg-blue-500";
    if (isCorrect) return "text-green-500";
    if (isError) return "text-red-500";
    return "text-gray-600";
  };

  // Find the current word based on cursorIndex
  useEffect(() => {
    const wordsTyped = typedText.trim().split(" ");
    const currentWord = wordsTyped[wordsTyped.length - 1];
    setCurrentWord(currentWord);

    if (greWords.group1[currentWord]) {
      setCurrentSynonym(greWords.group1[currentWord]);
    } else {
      setCurrentSynonym(""); // Clear the synonym if no match
    }

    if (typedText === PARAGRAPH) {
      setIsComplete(true);
    }
  }, [typedText]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText, cursorIndex, isComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <SynonymDisplay synonym={currentSynonym} />

      {/* Typing Area */}
      <TypingText
        paragraph={PARAGRAPH}
        typedText={typedText}
        cursorIndex={cursorIndex}
        getCharacterStyle={getCharacterStyle}
      />

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-6 text-green-400 font-bold text-lg">
          🎉 Congratulations! You completed the words.
        </div>
      )}
    </div>
  );
}
