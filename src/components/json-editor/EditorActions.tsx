'use client';

import { Button } from '@/components/ui/button';
import { ArrowBigLeftDash, ArrowBigRightDash, GitCompare } from 'lucide-react';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditorActionsProps {
   onCopyToRight: () => void;
   onCopyToLeft: () => void;
   onCompare: () => void;
   isComparing: boolean;
   canCompare: boolean;
}

export function EditorActions({
   onCopyToRight,
   onCopyToLeft,
   onCompare,
   isComparing,
   canCompare,
}: EditorActionsProps) {
   return (
      <div className="editor-actions-panel flex flex-col gap-2 w-full md:w-[100px] md:max-w-[100px] items-center justify-center bg-card border-l border-r border-border">
         <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={onCopyToRight}
            aria-label="Copy to right panel"
         >
            Copy <ArrowBigRightDash />
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
                     aria-label={
                        isComparing ? 'Exit compare mode' : 'Compare JSON'
                     }
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
            <ArrowBigLeftDash /> Copy
         </Button>
      </div>
   );
}
