import {
   FileInput,
   Search,
   GitCompare,
   ArrowBigLeftDash,
   AlignJustify,
   Sparkles,
   Download,
   Keyboard,
   Wrench,
} from 'lucide-react';

export default function JsonEditorInfo() {
   return (
      <div className="space-y-12">
         {/* Introduction */}
         <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">Getting Started</h3>
            <p className="text-muted-foreground leading-relaxed">
               The JSON Editor provides a dual-panel interface for viewing, editing, converting, and comparing data with
               real-time validation and formatting. You can seamlessly transition between raw code text and an
               interactive tree visualization to master complex payloads.
            </p>
         </div>

         {/* Grid 1: Capabilities */}
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm h-full flex flex-col">
               <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Smart Import & Export
               </h3>
               <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-6">
                     You aren&apos;t restricted to just JSON files! Drop your raw data formats and watch them
                     auto-convert securely in your browser:
                  </p>
                  <ul className="space-y-5 text-sm text-foreground">
                     <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                           <FileInput className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                           <span className="font-bold text-base block mb-1">Multi-Format Import</span>
                           <span className="text-muted-foreground leading-relaxed">
                              Upload YAML, CSV, XML, or TOML files. They are automatically parsed and translated
                              directly into standard JSON format instantly.
                           </span>
                        </div>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                           <Download className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                           <span className="font-bold text-base block mb-1">Flexible Export</span>
                           <span className="text-muted-foreground leading-relaxed">
                              Save your work as a clean JSON file, or instantly export to YAML, CSV, XML, or TOML
                              formats—perfect for configuration files and data interop.
                           </span>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>

            <div className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm h-full flex flex-col">
               <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <GitCompare className="w-5 h-5 text-indigo-500" />
                  Compare Mode
               </h3>
               <div className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-6">
                     Find the difference between two payloads instantly using unified diff highlighting:
                  </p>
                  <ul className="space-y-4 text-sm flex-1">
                     <li className="flex items-center gap-3 text-green-600 dark:text-green-400 font-medium">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />{' '}
                        Green items show <strong>Added properties</strong>
                     </li>
                     <li className="flex items-center gap-3 text-red-600 dark:text-red-400 font-medium">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /> Red
                        items show <strong>Removed properties</strong>
                     </li>
                     <li className="flex items-center gap-3 text-yellow-600 dark:text-yellow-400 font-medium">
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />{' '}
                        Yellow items show <strong>Modified values</strong>
                     </li>
                  </ul>
                  <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50 bg-muted/20 -mx-6 -mb-6 p-4 rounded-b-2xl">
                     <strong>Note:</strong> Both editors become read-only during comparison to protect your data
                     integrity against accidental deletions.
                  </div>
               </div>
            </div>
         </div>

         {/* Toolbar Controls Grid */}
         <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <Wrench className="w-5 h-5 text-indigo-500" />
               Toolbar Controls
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-background rounded-xl flex flex-col p-5 border border-border shadow-sm">
                  <div className="flex items-center gap-2 font-bold mb-3 pb-3 border-b border-border/50">
                     <AlignJustify className="w-4 h-4 text-emerald-500" /> Layout Options
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                     <li>
                        <strong className="text-foreground">Standard:</strong> Readable formatting with 2-space
                        indentation.
                     </li>
                     <li>
                        <strong className="text-foreground">Minified:</strong> Compresses JSON into a single line
                        without whitespace.
                     </li>
                     <li>
                        <strong className="text-foreground">Expand/Collapse:</strong> Instantly fold entire parent
                        structures recursively.
                     </li>
                  </ul>
               </div>
               <div className="bg-background rounded-xl flex flex-col p-5 border border-border shadow-sm">
                  <div className="flex items-center gap-2 font-bold mb-3 pb-3 border-b border-border/50">
                     <ArrowBigLeftDash className="w-4 h-4 text-amber-500" /> Quick Actions
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                     <li>
                        <strong className="text-foreground">Transfer:</strong> Copy contents quickly from the left side
                        to right side (or vice versa).
                     </li>
                     <li>
                        <strong className="text-foreground">Auto-Fix:</strong> If syntax is broken, click fix to repair
                        missing commas, trailing commas, or missing quotes.
                     </li>
                  </ul>
               </div>
               <div className="bg-background rounded-xl flex flex-col p-5 border border-border shadow-sm">
                  <div className="flex items-center gap-2 font-bold mb-3 pb-3 border-b border-border/50">
                     <Search className="w-4 h-4 text-indigo-500" /> Deep Search
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                     <li>
                        <strong className="text-foreground">JSONPath Engine:</strong> Easily query deep structures using
                        standardized JSONPath selectors.
                     </li>
                     <li>
                        Example:{' '}
                        <code className="text-[11px] bg-muted px-1.5 py-[3px] rounded text-indigo-400 border border-indigo-500/20 font-mono">
                           $.store.book[*]
                        </code>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Keyboard Shortcuts */}
         <div className="bg-indigo-500/5 rounded-3xl p-6 md:p-8 border border-indigo-500/10 mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
               <Keyboard className="w-5 h-5 text-indigo-500" />
               Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Find Item</span>
                  <div className="font-mono text-sm font-semibold bg-background border border-border/50 text-indigo-500 shadow-sm px-3 py-2 rounded-md inline-flex justify-center w-fit">
                     Cmd/Ctrl + F
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Select Next</span>
                  <div className="font-mono text-sm font-semibold bg-background border border-border/50 text-indigo-500 shadow-sm px-3 py-2 rounded-md inline-flex justify-center w-fit">
                     Cmd/Ctrl + D
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                     Toggle Comment
                  </span>
                  <div className="font-mono text-sm font-semibold bg-background border border-border/50 text-indigo-500 shadow-sm px-3 py-2 rounded-md inline-flex justify-center w-fit">
                     Cmd/Ctrl + /
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                     Indent Block
                  </span>
                  <div className="font-mono text-sm font-semibold bg-background border border-border/50 text-indigo-500 shadow-sm px-3 py-2 rounded-md inline-flex justify-center w-fit">
                     Tab / ⇧+Tab
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
