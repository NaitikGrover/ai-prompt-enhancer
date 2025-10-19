import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

export const Header: React.FC = () => {
  return (
    <header className="hidden lg:block py-4 px-4 md:px-8 sticky top-0 z-10 bg-base-100/80 backdrop-blur-sm border-b border-base-300/50">
      <div className="container mx-auto flex items-center gap-4 max-w-7xl">
        <div className="relative">
            <MagicWandIcon className="w-10 h-10 text-brand-primary" />
            <div className="absolute inset-0 -z-10 bg-brand-primary/50 rounded-full blur-lg"></div>
        </div>
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                AI Prompt Enhancer
            </h1>
            <p className="text-sm md:text-base text-text-secondary">
                Transform your simple ideas into powerful, detailed prompts.
            </p>
        </div>
      </div>
    </header>
  );
};