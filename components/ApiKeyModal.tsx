import React, { useState } from 'react';
import { KeyIcon } from './icons/KeyIcon';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-scale">
      <div className="bg-base-200 border border-base-300/50 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-brand-primary/10 rounded-full border border-brand-primary/20 mb-4">
                <KeyIcon className="w-8 h-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Enter Your API Key</h2>
            <p className="text-text-secondary mb-6">
                Please provide your Gemini API key to use the application. Your key is stored locally in your browser and not sent to any servers.
            </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="api-key" className="sr-only">
              Gemini API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full p-3 bg-base-100/70 border border-base-300/70 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 text-text-primary"
            />
          </div>
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold bg-brand-primary hover:bg-brand-secondary text-white rounded-md transition-all duration-200 disabled:bg-brand-primary/50 disabled:cursor-not-allowed"
          >
            Save and Continue
          </button>
        </form>
        <p className="text-xs text-center text-text-secondary/70 mt-4">
          You can get your API key from{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-primary transition-colors"
          >
            Google AI Studio
          </a>
          .
        </p>
      </div>
    </div>
  );
};
