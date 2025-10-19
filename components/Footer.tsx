import React from 'react';
import { HeartIcon } from './icons/HeartIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden lg:block py-4 px-4 md:px-8 border-t border-base-300/50">
      <div className="container mx-auto flex items-center justify-center gap-1.5 text-center text-sm text-text-secondary/80">
        <span>© {new Date().getFullYear()} AI Prompt Enhancer. Built with</span>
        <HeartIcon className="w-4 h-4 text-red-500" />
        <span>by adyber.</span>
      </div>
    </footer>
  );
};