import {
   EditorView,
   Decoration,
   ViewPlugin,
   ViewUpdate,
   gutter,
   GutterMarker,
} from '@codemirror/view';
import type { DecorationSet } from '@codemirror/view';
import { RangeSetBuilder } from '@codemirror/state';

export type ErrorPosition = {
   line?: number;
   column?: number;
   charIndex?: number;
};

export const errorDecorationsTheme = EditorView.baseTheme({
   '.cm-errorLine': {
      backgroundColor: 'rgba(239, 68, 68, 0.18)',
   },
   '.cm-errorChar': {
      textDecoration: 'underline wavy #ef4444',
      textUnderlineOffset: '2px',
   },
});

export const errorGutterTheme = EditorView.baseTheme({
   '.cm-errorGutterMarker': {
      color: '#ef4444',
      fontSize: '12px',
      lineHeight: '1',
   },
});

// Diff highlighting themes for compare mode
export const diffDecorationsTheme = EditorView.baseTheme({
   '.cm-diffLine-added': {
      backgroundColor: 'rgba(34, 197, 94, 0.15)',
      borderLeft: '3px solid #22c55e',
   },
   '.cm-diffLine-removed': {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      borderLeft: '3px solid #ef4444',
   },
   '.cm-diffLine-modified': {
      backgroundColor: 'rgba(234, 179, 8, 0.15)',
      borderLeft: '3px solid #eab308',
   },
   '.cm-diffChar-added': {
      backgroundColor: 'rgba(34, 197, 94, 0.25)',
      fontWeight: '500',
   },
   '.cm-diffChar-removed': {
      backgroundColor: 'rgba(239, 68, 68, 0.25)',
      fontWeight: '500',
      textDecoration: 'line-through',
   },
   '.cm-diffChar-modified': {
      backgroundColor: 'rgba(234, 179, 8, 0.25)',
      fontWeight: '500',
   },
});

export function getLineColFromIndex(text: string, index: number) {
   let line = 1;
   let column = 1;
   const max = Math.min(index, text.length);
   for (let i = 0; i < max; i++) {
      if (text[i] === '\n') {
         line++;
         column = 1;
      } else {
         column++;
      }
   }
   return { line, column };
}

export function parseErrorPosition(
   errorMessage: string,
   source?: string
): ErrorPosition | null {
   const lineMatch = errorMessage.match(/line (\d+)/i);
   const columnMatch = errorMessage.match(/column (\d+)/i);
   if (lineMatch && columnMatch) {
      return {
         line: parseInt(lineMatch[1], 10),
         column: parseInt(columnMatch[1], 10),
      };
   }

   const posMatch = errorMessage.match(/position\s*(\d+)/i);
   if (posMatch) {
      const charIndex = parseInt(posMatch[1], 10);
      if (Number.isFinite(charIndex)) {
         if (source) {
            const { line, column } = getLineColFromIndex(source, charIndex);
            return { line, column, charIndex };
         }
         return { charIndex };
      }
   }
   return null;
}

export function createErrorDecorationsPlugin(errorPosition: ErrorPosition) {
   return ViewPlugin.fromClass(
      class {
         decorations: DecorationSet;
         constructor(view: EditorView) {
            this.decorations = this.buildDecorations(view);
         }
         update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
               this.decorations = this.buildDecorations(update.view);
            }
         }
         buildDecorations(view: EditorView) {
            const doc = view.state.doc;
            let lineNumber: number | null = null;
            let charPos: number | null = null;

            if (typeof errorPosition.charIndex === 'number') {
               const clamped = Math.max(
                  0,
                  Math.min(errorPosition.charIndex, doc.length)
               );
               lineNumber = doc.lineAt(clamped).number;
               charPos = clamped;
            } else if (typeof errorPosition.line === 'number') {
               lineNumber = Math.max(
                  1,
                  Math.min(errorPosition.line, doc.lines)
               );
               const line = doc.line(lineNumber);
               if (typeof errorPosition.column === 'number') {
                  const colZero = Math.max(0, errorPosition.column - 1);
                  charPos = Math.min(line.from + colZero, line.to);
               } else {
                  charPos = line.from; // fallback to line start
               }
            }

            if (!lineNumber) return Decoration.none;
            const line = doc.line(lineNumber);

            const decos = [
               Decoration.line({ attributes: { class: 'cm-errorLine' } }).range(
                  line.from
               ),
            ];

            if (charPos != null) {
               const end = Math.min(charPos + 1, line.to);
               decos.push(
                  Decoration.mark({ class: 'cm-errorChar' }).range(charPos, end)
               );
            }

            return Decoration.set(decos);
         }
      },
      { decorations: (v) => v.decorations }
   );
}

class ErrorGutterMarker extends GutterMarker {
   constructor(private title: string) {
      super();
   }
   toDOM() {
      const el = document.createElement('div');
      el.className = 'cm-errorGutterMarker';
      el.title = this.title;
      el.textContent = '●';
      return el;
   }
}

export function createErrorGutterExtension(
   errorPosition: ErrorPosition,
   errorMessage: string
) {
   return gutter({
      class: 'cm-error-gutter',
      markers: (view: EditorView) => {
         const builder = new RangeSetBuilder<GutterMarker>();
         const doc = view.state.doc;
         let lineNumber: number | null = null;
         if (typeof errorPosition.charIndex === 'number') {
            const clamped = Math.max(
               0,
               Math.min(errorPosition.charIndex, doc.length)
            );
            lineNumber = doc.lineAt(clamped).number;
         } else if (typeof errorPosition.line === 'number') {
            lineNumber = Math.max(1, Math.min(errorPosition.line, doc.lines));
         }
         if (!lineNumber) return builder.finish();
         const line = doc.line(lineNumber);
         const marker = new ErrorGutterMarker(errorMessage);
         builder.add(line.from, line.from, marker);
         return builder.finish();
      },
   });
}

// Diff decoration types
export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface DiffLine {
   lineNumber: number;
   type: DiffType;
}

/**
 * Create a plugin to decorate lines with diff highlighting
 */
export function createDiffDecorationsPlugin(diffs: DiffLine[]) {
   return ViewPlugin.fromClass(
      class {
         decorations: DecorationSet;
         constructor(view: EditorView) {
            this.decorations = this.buildDecorations(view);
         }
         update(update: ViewUpdate) {
            if (update.docChanged || update.viewportChanged) {
               this.decorations = this.buildDecorations(update.view);
            }
         }
         buildDecorations(view: EditorView) {
            const doc = view.state.doc;
            const decos = [];

            for (const diff of diffs) {
               if (diff.type === 'unchanged') continue;

               const lineNumber = Math.max(
                  1,
                  Math.min(diff.lineNumber, doc.lines)
               );
               const line = doc.line(lineNumber);

               let className = '';
               switch (diff.type) {
                  case 'added':
                     className = 'cm-diffLine-added';
                     break;
                  case 'removed':
                     className = 'cm-diffLine-removed';
                     break;
                  case 'modified':
                     className = 'cm-diffLine-modified';
                     break;
               }

               if (className) {
                  decos.push(
                     Decoration.line({
                        attributes: { class: className },
                     }).range(line.from)
                  );
               }
            }

            return Decoration.set(decos);
         }
      },
      { decorations: (v) => v.decorations }
   );
}
