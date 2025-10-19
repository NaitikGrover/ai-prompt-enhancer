import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface PromptInputProps {
  onEnhance: (prompt: string) => void;
  isLoading: boolean;
  promptType: string;
  setPromptType: (type: string) => void;
  promptLength: string;
  setPromptLength: (length: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
    onEnhance, 
    isLoading,
    promptType,
    setPromptType,
    promptLength,
    setPromptLength
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onEnhance(prompt);
    }
  };

  return (
    <div className="bg-base-200/50 backdrop-blur-sm rounded-xl shadow-lg p-6 h-full border border-base-300/50 flex flex-col">
      <h2 className="text-lg font-semibold mb-3 text-text-primary">Enter Your Prompt</h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'An image of a cat wearing a wizard hat'"
          className="w-full flex-grow p-3 bg-base-100/70 border border-base-300/70 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 text-text-secondary resize-none"
          rows={10}
          disabled={isLoading}
        />
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="prompt-type" className="block text-sm font-medium text-text-secondary mb-1">
                    Prompt Type
                </label>
                <select
                    id="prompt-type"
                    value={promptType}
                    onChange={(e) => setPromptType(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-2.5 bg-base-100/70 border border-base-300/70 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 text-text-primary"
                >
                    <option>Default</option>
                    <option>Paragraph</option>
                    <option>Bullet Points</option>
                    <option>Code Snippet</option>
                    <option>JSON</option>
                </select>
            </div>
            <div>
                <label htmlFor="prompt-length" className="block text-sm font-medium text-text-secondary mb-1">
                    Prompt Length
                </label>
                <select
                    id="prompt-length"
                    value={promptLength}
                    onChange={(e) => setPromptLength(e.target.value)}
                    disabled={isLoading}
                    className="w-full p-2.5 bg-base-100/70 border border-base-300/70 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 text-text-primary"
                >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Detailed</option>
                </select>
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold bg-brand-primary hover:bg-brand-secondary text-white rounded-md transition-all duration-200 disabled:bg-brand-primary/50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="w-5 h-5" />
              <span>Enhancing...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Enhance Prompt</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};