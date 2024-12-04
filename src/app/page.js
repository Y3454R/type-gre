"use client";

import { useState, useEffect, useRef } from "react";
import paragraphData from "../data/paragraph.json";
import TypingText from "@/components/TypingText";

const PARAGRAPH = paragraphData.dummy.trim();

export default function TypingTest() {
  const [typedText, setTypedText] = useState("");
  const [cursorIndex, setCursorIndex] = useState(0); // Tracks cursor position
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Timer
  const [intervalId, setIntervalId] = useState(null);

  const handleKeyDown = (event) => {
    if (isComplete) return; // Prevent typing after completion

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

    if (index === cursorIndex) return "text-white bg-blue-500"; // Cursor position
    if (isCorrect) return "text-green-500"; // Green for correct characters
    if (isError) return "text-red-500"; // Red for incorrect characters
    return "text-gray-600"; // Gray for untapped characters
  };

  const handleReset = () => {
    setTypedText("");
    setCursorIndex(0);
    setIsComplete(false);
    setIsStarted(false);
    setTimeLeft(60);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleStartTest = () => {
    setIsStarted(true);
    startTimer();
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(id);
          setIsComplete(true);
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText, cursorIndex, isComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide">Typing Test</h1>
        <p className="text-gray-400 mt-2">
          Type the text below as quickly and accurately as you can.
        </p>
      </div>

      {/* Timer */}
      {!isComplete && (
        <div className="text-lg mb-4">
          Time Left: <span className="font-bold">{timeLeft}</span> seconds
        </div>
      )}

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
          🎉 Congratulations! You completed the test.
        </div>
      )}

      {/* Start Button */}
      {!isStarted && !isComplete && (
        <button
          onClick={handleStartTest}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Start Test
        </button>
      )}

      {/* Reset Button */}
      {isComplete && (
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Restart Test
        </button>
      )}
    </div>
  );
}
