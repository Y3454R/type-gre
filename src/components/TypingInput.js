export default function TypingInput({ typedText, onInputChange, isComplete }) {
  return (
    <input
      type="text"
      value={typedText}
      onChange={onInputChange}
      placeholder="Start typing here..."
      className="w-full max-w-4xl mt-4 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-blue-400 text-lg font-mono text-white placeholder-gray-500 p-2"
      autoFocus
      disabled={isComplete}
    />
  );
}
