'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, RotateCcw, Database } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useTheme } from 'next-themes';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { format as formatSql, SqlLanguage } from 'sql-formatter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DIALECTS: { value: SqlLanguage; label: string }[] = [
   { value: 'postgresql', label: 'PostgreSQL' },
   { value: 'mysql', label: 'MySQL' },
   { value: 'mariadb', label: 'MariaDB' },
   { value: 'sqlite', label: 'SQLite' },
   { value: 'sql', label: 'Standard SQL' },
   { value: 'tsql', label: 'SQL Server (T-SQL)' },
   { value: 'plsql', label: 'Oracle PL/SQL' },
];

export function SqlFormatterView() {
   const { theme } = useTheme();
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('select id, first_name, last_name from users where status = "active" join orders on users.id = orders.user_id group by id order by last_name desc limit 10;');
   const [output, setOutput] = useState('');
   const [dialect, setDialect] = useState<SqlLanguage>('postgresql');
   
   const [isCopied, setIsCopied] = useState(false);
   const [error, setError] = useState('');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         try {
            const stored = localStorage.getItem(STORAGE_KEYS.SQL_FORMATTER_INPUT);
            if (stored) {
               const parsed = JSON.parse(stored);
               setInput(parsed.input || '');
               setDialect(parsed.dialect || 'postgresql');
            }
         } catch {
            // Ignore
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.SQL_FORMATTER_INPUT, JSON.stringify({ input, dialect }));
   }, [input, dialect, isPersistenceEnabled]);

   // Format logic
   useEffect(() => {
      try {
         if (!input.trim()) {
            setOutput('');
            setError('');
            return;
         }
         const formatted = formatSql(input, {
            language: dialect,
            tabWidth: 2,
            keywordCase: 'upper',
            linesBetweenQueries: 2,
         });
         setOutput(formatted);
         setError('');
      } catch (e: unknown) {
         if (e instanceof Error) {
            setError(e.message);
         } else {
            setError('Formatting failed due to invalid SQL syntax.');
         }
      }
   }, [input, dialect]);

   const handleClear = () => {
      setInput('');
      setOutput('');
      setError('');
   };

   const copyOutput = async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   const cmTheme = theme === 'dark' ? vscodeDark : vscodeLight;

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background border border-border overflow-hidden">
         {/* Left half: Input */}
         <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-border min-h-[50vh] md:min-h-0 bg-muted/10">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-background">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                     <Database className="w-4 h-4 text-blue-500" />
                  </div>
                  <h1 className="font-bold text-sm tracking-tight text-foreground">SQL Formatter</h1>
               </div>
               <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={handleClear}>
                  <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
               </Button>
            </div>
            <div className="px-3 py-2 bg-muted/40 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center z-10">
               <span>Raw Query</span>
               {error && <span className="text-red-500 normal-case tracking-normal max-w-[200px] truncate" title={error}>{error}</span>}
            </div>
            <div className="flex-1 overflow-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-white text-sm custom-scrollbar">
               <CodeMirror
                  value={input}
                  height="100%"
                  extensions={[sql(), EditorView.lineWrapping]}
                  onChange={(val) => setInput(val)}
                  theme={cmTheme}
                  basicSetup={{ lineNumbers: true, foldGutter: true }}
                  className="h-full font-mono text-sm"
               />
            </div>
         </div>

         {/* Right half: Formatted Output */}
         <div className="w-full md:w-1/2 flex flex-col bg-background min-h-[50vh] md:min-h-0">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-muted/10">
               <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold tracking-tight text-foreground">Config</span>
                  <Select value={dialect} onValueChange={(d) => setDialect(d as SqlLanguage)}>
                     <SelectTrigger className="w-[160px] h-8 text-xs bg-background">
                        <SelectValue placeholder="Select Dialect" />
                     </SelectTrigger>
                     <SelectContent>
                        {DIALECTS.map((d) => (
                           <SelectItem key={d.value} value={d.value} className="text-xs">{d.label}</SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               
               <div className="flex gap-2">
                  <Button 
                     size="sm"
                     variant="default"
                     onClick={copyOutput}
                     disabled={!output}
                     className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
                  >
                     {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />} 
                     Copy Format
                  </Button>
               </div>
            </div>

            <div className="px-3 py-2 bg-muted/40 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center z-10">
               <span>Formatted Result</span>
            </div>
            <div className="flex-1 overflow-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-white text-sm custom-scrollbar relative">
               <CodeMirror
                  value={output}
                  height="100%"
                  extensions={[sql(), EditorView.lineWrapping]}
                  theme={cmTheme}
                  editable={false}
                  basicSetup={{ lineNumbers: true, foldGutter: true }}
                  className="h-full font-mono text-sm"
               />
            </div>
         </div>
      </div>
   );
}
