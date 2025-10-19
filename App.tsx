import React, { useState, useEffect } from 'react';
import { PromptInput } from './components/PromptInput';
import { PromptOutput } from './components/PromptOutput';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { enhancePrompt } from './services/geminiService';
import { ApiKeyModal } from './components/ApiKeyModal';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [promptType, setPromptType] = useState('Default');
  const [promptLength, setPromptLength] = useState('Medium');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKey(key);
    setIsModalOpen(false);
  };

  const handleEnhance = async (prompt: string) => {
    if (!apiKey) {
      setError("API Key is not set. Please provide your API key.");
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setError(null);
    try {
      const enhancedPrompt = await enhancePrompt(prompt, promptType, promptLength, apiKey);
      setResponse(enhancedPrompt);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
         if (err.message.includes('API Key is invalid')) {
          setIsModalOpen(true);
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-text-primary font-sans">
      {isModalOpen && <ApiKeyModal onSave={handleSaveApiKey} />}
      
      <Header />
      <main className={`flex-grow container mx-auto p-4 md:p-8 max-w-7xl w-full flex items-center transition-filter duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full w-full">
          <PromptInput
            onEnhance={handleEnhance}
            isLoading={isLoading}
            promptType={promptType}
            setPromptType={setPromptType}
            promptLength={promptLength}
            setPromptLength={setPromptLength}
          />
          <PromptOutput
            response={response}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
