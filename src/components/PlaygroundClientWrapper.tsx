'use client';

import React from 'react';
import { usePersistence } from '@/contexts/PersistenceContext';
import { cn } from '@/lib/utils';

export function PlaygroundClientWrapper({ children, className, style }: React.ComponentProps<'div'>) {
   const { isMounted } = usePersistence();

   return (
      <div
         className={cn('transition-opacity duration-300', isMounted ? 'opacity-100' : 'opacity-0', className)}
         style={style}
      >
         {children}
      </div>
   );
}
