import React, { useMemo } from 'react';
import DiffMatchPatch, { diff_match_patch as DMP } from 'diff-match-patch';

export interface DiffStats {
   charsAdded: number;
   charsRemoved: number;
   wordsAdded: number;
   wordsRemoved: number;
}

interface DiffViewerProps {
   oldText: string;
   newText: string;
   mode: 'line' | 'word' | 'char';
   viewType: 'split' | 'unified';
   onStatsChange?: (stats: DiffStats) => void;
}

export function DiffViewer({ oldText, newText, mode, viewType, onStatsChange }: DiffViewerProps) {
   const dmp = useMemo(() => new DiffMatchPatch(), []);

   const diffs = useMemo(() => {
      if (mode === 'char') {
         const d = dmp.diff_main(oldText, newText);
         dmp.diff_cleanupSemantic(d);
         return d;
      }

      if (mode === 'word') {
         // Tokenize for word-level diffing by extending dmp methods
         // As diff-match-patch primarily works character-based or line-based string mappings natively,
         // We can fallback to basic character but cleanup highly semantic blocks, or use the line diff strategy mapped to words.
         // For pure JS word logic, let's keep it simple: insert split characters at bounds, do diff, then cleanup
         // A common trick is to use `diff_linesToChars_` but for words:
         
         const a = oldText.split(/(\s+)/);
         const b = newText.split(/(\s+)/);
         const lineArray: string[] = [];
         const lineHash: { [key: string]: number } = {};

         lineArray[0] = '';
         
         const getChars = (textArray: string[]) => {
            let chars = '';
            for (let i = 0; i < textArray.length; i++) {
               const line = textArray[i];
               if (Object.prototype.hasOwnProperty.call(lineHash, line)) {
                  chars += String.fromCharCode(lineHash[line]);
               } else {
                  chars += String.fromCharCode(lineArray.length);
                  lineHash[line] = lineArray.length;
                  lineArray[lineArray.length] = line;
               }
            }
            return chars;
         };
         
         const text1 = getChars(a);
         const text2 = getChars(b);
         
         const diff = dmp.diff_main(text1, text2, false);
         dmp.diff_charsToLines_(diff, lineArray);
         // Clean it up loosely
         dmp.diff_cleanupSemantic(diff);
         return diff;
      }

      // Line mode
      const a = dmp.diff_linesToChars_(oldText, newText);
      const diff = dmp.diff_main(a.chars1, a.chars2, false);
      dmp.diff_charsToLines_(diff, a.lineArray);
      dmp.diff_cleanupSemantic(diff);
      return diff;

   }, [oldText, newText, mode, dmp]);

   React.useEffect(() => {
      if (!onStatsChange) return;

      let charsAdded = 0;
      let charsRemoved = 0;
      let wordsAdded = 0;
      let wordsRemoved = 0;

      diffs.forEach(diffItem => {
         const op = diffItem[0];
         const text = diffItem[1];

         if (op === DMP.DIFF_INSERT) {
            charsAdded += text.length;
            const words = text.trim().match(/\S+/g);
            if (words) wordsAdded += words.length;
         } else if (op === DMP.DIFF_DELETE) {
            charsRemoved += text.length;
            const words = text.trim().match(/\S+/g);
            if (words) wordsRemoved += words.length;
         }
      });

      onStatsChange({ charsAdded, charsRemoved, wordsAdded, wordsRemoved });
   }, [diffs, onStatsChange]);

   const renderUnified = () => {
      return (
         <div className="font-mono text-sm leading-6 whitespace-pre-wrap">
            {diffs.map((diffItem, index) => {
               const operation = diffItem[0]; // diff_match_patch.DIFF_INSERT, .DIFF_DELETE, .DIFF_EQUAL
               const text = diffItem[1];
               
               let className = '';
               // Make empty lines visible when added/removed
               const displayHtml = text === '\n' ? '↵\n' : text;

               if (operation === DMP.DIFF_INSERT) {
                  className = 'bg-green-500/20 text-green-700 dark:text-green-300 rounded px-0.5';
               } else if (operation === DMP.DIFF_DELETE) {
                  className = 'bg-red-500/20 text-red-700 dark:text-red-300 line-through rounded px-0.5 decoration-red-500/50';
               }
               
               return (
                  <span key={index} className={className}>
                     {displayHtml}
                  </span>
               );
            })}
         </div>
      );
   };

   // A basic visual implementation for Split view. Real split view using DiffMatchPatch requires
   // syncing line numbers between the old and new text blocks which is complex for character diffs.
   // This is a simplified block-level split renderer that outputs the text with localized highlights.
   const renderSplit = () => {
      // Build left (old) and right (new) columns
      const leftNodes: React.ReactNode[] = [];
      const rightNodes: React.ReactNode[] = [];

      diffs.forEach((diffItem, i) => {
         const op = diffItem[0];
         const text = diffItem[1];

         if (op === DMP.DIFF_EQUAL) {
            leftNodes.push(<span key={i} className="opacity-90">{text}</span>);
            rightNodes.push(<span key={i} className="opacity-90">{text}</span>);
         } else if (op === DMP.DIFF_DELETE) {
            leftNodes.push(<span key={i} className="bg-red-500/25 text-red-800 dark:text-red-200 rounded px-0.5">{text}</span>);
         } else if (op === DMP.DIFF_INSERT) {
            rightNodes.push(<span key={i} className="bg-green-500/25 text-green-800 dark:text-green-200 rounded px-0.5">{text}</span>);
         }
      });

      return (
         <div className="flex w-full divide-x divide-border">
            <div className="w-1/2 p-4 font-mono text-sm leading-6 whitespace-pre-wrap overflow-x-auto break-all bg-card/30 text-card-foreground">
               {leftNodes.length > 0 ? leftNodes : <span className="text-muted-foreground italic">Empty or completely removed</span>}
            </div>
            <div className="w-1/2 p-4 font-mono text-sm leading-6 whitespace-pre-wrap overflow-x-auto break-all bg-card/30 text-card-foreground">
               {rightNodes.length > 0 ? rightNodes : <span className="text-muted-foreground italic">Empty or entirely missing</span>}
            </div>
         </div>
      );
   };

   return (
      <div className="w-full h-full text-foreground">
         {viewType === 'unified' ? (
            <div className="p-4 bg-muted/10">
               {renderUnified()}
            </div>
         ) : (
            renderSplit()
         )}
      </div>
   );
}
