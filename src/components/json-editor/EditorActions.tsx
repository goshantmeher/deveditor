'use client';

import { Button } from '@/components/ui/button';
import { ArrowBigLeftDash, ArrowBigRightDash, GitCompare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorActionsProps {
   onCopyToRight: () => void;
   onCopyToLeft: () => void;
   onCompare: () => void;
   isComparing: boolean;
   canCompare: boolean;
}

export function EditorActions({ onCopyToRight, onCopyToLeft, onCompare, isComparing, canCompare }: EditorActionsProps) {
   return (
      <div className="editor-actions-panel flex flex-row md:flex-col gap-2 w-full md:w-[100px] md:max-w-[100px] items-center justify-center bg-card border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-border py-2 md:py-0">
         <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={onCopyToRight}
            aria-label="Copy to right panel"
         >
            <span className="hidden sm:inline mr-1">Copy</span> <ArrowBigRightDash className="md:rotate-0 rotate-90" />
         </Button>

         <Tooltip>
            <TooltipTrigger asChild>
               <div>
                  <Button
                     variant={isComparing ? 'default' : 'ghost'}
                     className="cursor-pointer"
                     size="sm"
                     onClick={onCompare}
                     disabled={!canCompare}
                     aria-label={isComparing ? 'Exit compare mode' : 'Compare JSON'}
                  >
                     <GitCompare />
                  </Button>
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <p>{isComparing ? 'Exit Compare Mode' : 'Compare JSON'}</p>
            </TooltipContent>
         </Tooltip>

         <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={onCopyToLeft}
            aria-label="Copy to left panel"
         >
            <ArrowBigLeftDash className="md:rotate-0 rotate-90" /> <span className="hidden sm:inline ml-1">Copy</span>
         </Button>
      </div>
   );
}
