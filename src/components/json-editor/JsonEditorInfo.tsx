import React from 'react';
import {
   FileInput,
   Search,
   GitCompare,
   ArrowBigLeftDash,
   ArrowBigRightDash,
   AlignJustify,
   Braces,
   UnfoldVertical,
   FoldVertical,
   Sparkles,
} from 'lucide-react';

export default function JsonEditorInfo() {
   return (
      <div className="space-y-6">
         <section>
            <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
               The JSON Editor provides a dual-panel interface for viewing,
               editing, and comparing JSON data with real-time validation and
               formatting.
            </p>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
               <li>
                  <strong>Dual Editor Modes:</strong> Switch between Text Editor
                  (code view) and Tree View (visual hierarchy)
               </li>
               <li>
                  <strong>Format Options:</strong> Standard (readable), Minified
                  (compact), Expanded/Collapsed (tree view)
               </li>
               <li>
                  <strong>JSON5 Support:</strong> Automatically handles relaxed
                  JSON syntax (trailing commas, unquoted keys, comments)
               </li>
               <li>
                  <strong>Auto-Fix:</strong> Automatically repair common JSON
                  syntax errors with one click
               </li>
               <li>
                  <strong>Compare Mode:</strong> Side-by-side diff highlighting
                  to compare two JSON documents
               </li>
               <li>
                  <strong>Search/Filter:</strong> Filter JSON by property path
                  (e.g., &quot;favorites.books&quot; or
                  &quot;address.details&quot;)
               </li>
            </ul>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2">Toolbar Controls</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                  <Braces className="h-4 w-4" />
                  <div>
                     <strong>Text/Tree Toggle:</strong> Switch between code
                     editor and visual tree view
                  </div>
               </div>
               <div>
                  <strong>Format Buttons:</strong>
                  <ul className="list-inside ml-4 mt-1 space-y-1">
                     <li className="flex items-center gap-2">
                        <AlignJustify className="h-4 w-4" />
                        <span>
                           Standard: Readable formatting with 2-space
                           indentation
                        </span>
                     </li>
                     <li className="flex items-center gap-2">
                        <AlignJustify className="h-4 w-4" />
                        <span>Minified: Single line, no whitespace</span>
                     </li>
                     <li className="flex items-center gap-2">
                        <UnfoldVertical className="h-4 w-4" />
                        <FoldVertical className="h-4 w-4" />
                        <span>
                           Expanded/Collapsed: Tree view expansion states
                        </span>
                     </li>
                  </ul>
               </div>
               <div>
                  <strong>Actions:</strong>
                  <ul className="list-inside ml-4 mt-1 space-y-1">
                     <li className="flex items-center gap-2">
                        <ArrowBigLeftDash className="h-4 w-4" />
                        <ArrowBigRightDash className="h-4 w-4" />
                        <span>
                           Copy to Left/Right: Transfer data between panels
                        </span>
                     </li>
                     <li className="flex items-center gap-2">
                        <GitCompare className="h-4 w-4" />
                        <span>
                           Compare: Enable side-by-side diff highlighting
                        </span>
                     </li>
                     <li className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Search: Filter JSON by property path</span>
                     </li>
                     <li className="flex items-center gap-2">
                        <FileInput className="h-4 w-4" />
                        <span>Import: Load JSON from file</span>
                     </li>
                  </ul>
               </div>
            </div>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2">Error Handling</h3>
            <p className="text-sm text-muted-foreground mb-2">
               When JSON syntax errors are detected:
            </p>
            <ul className="list-inside space-y-1 text-sm text-muted-foreground">
               <li>Error messages appear with line/column information</li>
               <li>
                  Click &quot;Go to Line&quot; to jump to the error location
               </li>
               <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>
                     Click &quot;Fix JSON&quot; to automatically repair common
                     issues
                  </span>
               </li>
               <li>Inline decorations highlight problematic lines</li>
            </ul>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
               <GitCompare className="h-5 w-5" />
               Compare Mode
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
               Compare two JSON documents with color-coded differences:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
               <li className="text-green-600 dark:text-green-400">
                  Green: Added properties
               </li>
               <li className="text-red-600 dark:text-red-400">
                  Red: Removed properties
               </li>
               <li className="text-yellow-600 dark:text-yellow-400">
                  Yellow: Modified values
               </li>
               <li>Both editors become read-only during comparison</li>
               <li>Automatically switches to standard format for comparison</li>
            </ul>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
               <Search className="h-5 w-5" />
               Search/Filter
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
               Extract specific parts of JSON using property paths:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
               <li>
                  Dot notation:{' '}
                  <code className="bg-muted px-1">user.address.city</code>
               </li>
               <li>
                  Array indexing:{' '}
                  <code className="bg-muted px-1">favorites.books[0]</code>
               </li>
               <li>Click &quot;Clear&quot; to restore the original data</li>
               <li>Automatically switches to standard format when searching</li>
            </ul>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2">Keyboard Shortcuts</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
               <li>
                  <strong>Cmd/Ctrl + F:</strong> Find in editor
               </li>
               <li>
                  <strong>Cmd/Ctrl + D:</strong> Select next occurrence
               </li>
               <li>
                  <strong>Cmd/Ctrl + /:</strong> Toggle comment
               </li>
               <li>
                  <strong>Tab:</strong> Indent selection
               </li>
               <li>
                  <strong>Shift + Tab:</strong> Outdent selection
               </li>
            </ul>
         </section>

         <section>
            <h3 className="font-semibold text-lg mb-2">Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
               <li>
                  Paste JSON directly into the editor for instant validation
               </li>
               <li>Use Tree View for exploring complex nested structures</li>
               <li>Compare mode works only in Text Editor mode</li>
               <li>Code folding available - click the arrows in the gutter</li>
               <li>
                  Stats panel shows real-time character, word, and line counts
               </li>
            </ul>
         </section>
      </div>
   );
}
