'use client';

import React from 'react';
import { Layout } from 'lucide-react';

interface ScrollToTopButtonProps {
   label?: string;
}

export function ScrollToTopButton({ label = 'Scroll up to Start' }: ScrollToTopButtonProps) {
   return (
      <div
         onClick={() => {
            const topElement = document.getElementById('page-top');
            if (topElement) {
               topElement.scrollIntoView({ behavior: 'smooth' });
            } else {
               window.scrollTo({ top: 0, behavior: 'smooth' });
            }
         }}
         className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl active:scale-95"
      >
         {label}
         <Layout className="w-4 h-4" />
      </div>
   );
}
