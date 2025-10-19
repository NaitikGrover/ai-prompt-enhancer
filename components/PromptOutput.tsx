import React, { useState, useEffect, useRef } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface PromptOutputProps {
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

// FIX: Update SkeletonLoader to reflect the simplified single-output structure.
const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse space-y-8">
        {/* Skeleton for Enhanced Prompt */}
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <div className="h-5 bg-base-300 rounded w-1/3"></div>
                <div className="h-8 bg-base-300 rounded-md w-20"></div>
            </div>
            <div className="space-y-2 p-4 bg-base-100/70 border border-base-300/70 rounded-md">
                <div className="h-4 bg-base-300 rounded"></div>
                <div className="h-4 bg-base-300 rounded w-5/6"></div>
                <div className="h-4 bg-base-300 rounded w-3/4"></div>
                 <div className="h-4 bg-base-300 rounded w-4/6"></div>
                <div className="h-4 bg-base-300 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);


export const PromptOutput: React.FC<PromptOutputProps> = ({ response, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (response && !isLoading && outputContainerRef.current) {
      outputContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response, isLoading]);

  const handleCopy = () => {
    // FIX: Copy the prompt string directly.
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-red-400 p-4 animate-fade-in-scale">
                <ExclamationTriangleIcon className="w-12 h-12 mb-4" />
                <h3 className="text-lg font-semibold text-red-300">An Error Occurred</h3>
                <p className="text-sm">{error}</p>
            </div>
        );
    }
    
    // FIX: Render only the enhanced prompt.
    if (response) {
      return (
        <div className="animate-fade-in-scale">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-text-primary">Enhanced Prompt</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-base-300/70 hover:bg-brand-primary/80 text-text-primary rounded-md transition-all duration-200"
              >
                {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="w-full p-4 bg-base-100/70 border border-base-300/70 rounded-md text-text-secondary whitespace-pre-wrap text-sm leading-relaxed font-sans max-h-72 overflow-y-auto">
              <code>{response}</code>
            </pre>
          </div>
        </div>
      );
    }
    
    return (
        <div className="flex flex-col items-center justify-center text-center text-text-secondary h-full p-4">
          <div className="relative w-20 h-20 mb-4 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-primary/30 rounded-full blur-2xl"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
          </div>
            <h3 className="text-lg font-semibold">Your enhanced prompt will appear here</h3>
            <p className="text-sm max-w-xs mx-auto">Enter a prompt on the left, or try an example, then click "Enhance" to see the magic happen.</p>
        </div>
    );
  };

  return (
    <div ref={outputContainerRef} className="bg-base-200/50 backdrop-blur-sm rounded-xl shadow-lg p-6 h-full border border-base-300/50 flex flex-col">
        <div className="flex-grow flex flex-col justify-center">
            {renderContent()}
        </div>
    </div>
  );
};