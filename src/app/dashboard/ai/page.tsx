"use client"
import React, { useState } from "react";
import { ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

type Suggestion = {
  message: string;
  replacements: { value: string }[];
  offset: number;
  length: number;
};

const AIAnalysisPanel: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (inputText: string) => {
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: inputText,
          language: "en-US",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const result = await response.json();
      setSuggestions(result.matches);
    } catch (err) {
      setError("Error analyzing text. Please try again.");
      console.error(err);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    analyzeText(newText);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Text Analysis</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type or paste your text here..."
      />
      <div className="mt-6">
        {error && (
          <div className="flex items-center p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            <ExclamationCircleIcon className="h-6 w-6 mr-2" />
            <span>{error}</span>
          </div>
        )}
        {suggestions.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Suggestions</h3>
            <ul className="list-disc pl-5">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  <strong>{suggestion.message}</strong>
                  <br />
                  <span className="text-gray-500">
                    {suggestion.replacements
                      .slice(0, 5)  // Limit to 5 replacements
                      .map((replacement) => replacement.value)
                      .join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">No suggestions</p>
        )}
        <div className="mt-6 p-4 bg-blue-100 text-blue-700 rounded-lg">
          <InformationCircleIcon className="h-6 w-6 mr-2" />
          <span>
            Use this panel to get real-time feedback on your writing. It offers suggestions for grammar, style, and content enhancements.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;
