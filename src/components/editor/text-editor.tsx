'use client';
import React, { useMemo, useRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { useTheme } from 'next-themes';
import { EditorConfig } from '@/types/editor';
import { FORMAT_STATES, INDENT_LEVELS } from '@/constants/editor';
import { parseJson, stringifyJson } from '@/lib/parser';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { Button } from '../ui/button';
import { jsonrepair } from 'jsonrepair';
import { EditorSelection } from '@codemirror/state';
import { unfoldAll } from '@codemirror/language';
import {
   errorDecorationsTheme,
   parseErrorPosition as parseErrorPosUtil,
   createErrorDecorationsPlugin,
   createErrorGutterExtension,
   errorGutterTheme,
   diffDecorationsTheme,
   createDiffDecorationsPlugin,
} from '@/lib/editor-error';
import { getLineDiffs } from '@/lib/json-compare';

interface TextEditorProps {
   data: unknown;
   onChange: (newData: unknown) => void;
   config: EditorConfig;
   comparisonData?: unknown;
   onErrorPanelChange?: (errorPanel: React.ReactNode) => void;
   ariaLabel?: string;
}
function TextEditor({
   data,
   onChange,
   config,
   comparisonData,
   onErrorPanelChange,
   ariaLabel,
}: TextEditorProps) {
   const { theme } = useTheme();
   const [mounted, setMounted] = React.useState(false);
   const [error, setError] = React.useState<string | null>(null);
   const [errorPosition, setErrorPosition] = React.useState<{
      line?: number;
      column?: number;
      charIndex?: number;
   } | null>(null);
   const [autoFixDisabled, setAutoFixDisabled] = React.useState(false);
   const editorRef = useRef<ReactCodeMirrorRef>(null);
   const [pendingText, setPendingText] = React.useState<string | null>(null);
   const PARSE_DEBOUNCE_MS = 200;

   React.useEffect(() => {
      setMounted(true);
   }, []);

   // Extract line/column or absolute position from error message
   const parseErrorPosition = React.useCallback(
      (errorMessage: string, source?: string) =>
         parseErrorPosUtil(errorMessage, source),
      []
   );

   // Navigate to specific line/column or absolute position
   const navigateToError = React.useCallback(() => {
      const view = editorRef.current?.view;
      if (!errorPosition || !view) return;

      try {
         const doc = view.state.doc;
         let pos: number | null = null;

         if (typeof errorPosition.charIndex === 'number') {
            pos = Math.max(0, Math.min(errorPosition.charIndex, doc.length));
         } else if (
            typeof errorPosition.line === 'number' &&
            typeof errorPosition.column === 'number'
         ) {
            const lineZero = Math.max(0, errorPosition.line - 1);
            const colZero = Math.max(0, errorPosition.column - 1);
            const lineObj = doc.line(Math.min(lineZero + 1, doc.lines));
            pos = Math.min(lineObj.from + colZero, lineObj.to);
         }

         if (pos !== null) {
            view.dispatch({
               selection: EditorSelection.cursor(pos),
               scrollIntoView: true,
            });
            view.focus();
         }
      } catch (err) {
         console.error('Error navigating to position:', err);
      }
   }, [errorPosition]);

   // Fix JSON callback
   const fixJson = React.useCallback(() => {
      try {
         const repaired = jsonrepair(data as string);
         const result = parseJson(repaired);
         if (result.success) {
            setError(null);
            setErrorPosition(null);
            setAutoFixDisabled(false);

            // Apply current format state indentation
            let formatted: string;
            if (config.formatState === FORMAT_STATES.MINIFIED) {
               // For minified, use no spacing at all
               formatted = JSON.stringify(result.data);
            } else {
               const indent =
                  config.formatState === FORMAT_STATES.EXPANDED
                     ? INDENT_LEVELS.EXPANDED
                     : INDENT_LEVELS.STANDARD;
               formatted = stringifyJson(result.data, indent);
            }
            onChange(formatted);
         } else {
            console.error('Failed to parse repaired JSON:', result.error);
            setError(result.error || 'Unknown parsing error');
            const errorPos = parseErrorPosition(result.error || '', repaired);
            if (errorPos) {
               setErrorPosition(errorPos);
            }
            setAutoFixDisabled(true);
         }
      } catch (err) {
         const errorMessage =
            err instanceof Error ? err.message : 'Auto-fix failed';
         setError(`Auto-fix failed: ${errorMessage}`);
         const errorPos = parseErrorPosition(
            errorMessage,
            typeof data === 'string' ? (data as string) : undefined
         );
         if (errorPos) {
            setErrorPosition(errorPos);
         }
         setAutoFixDisabled(true);
      }
   }, [data, onChange, parseErrorPosition, config.formatState]);

   // Notify parent about error panel changes
   React.useEffect(() => {
      if (!mounted || !onErrorPanelChange) return;

      if (error) {
         onErrorPanelChange(
            <div className="p-2 bg-red-100 text-red-800 border border-red-400 mb-2 flex justify-between items-center">
               <span>{error}</span>
               <div className="flex gap-2">
                  {errorPosition && (
                     <Button
                        onClick={navigateToError}
                        variant="ghost"
                        size="sm"
                     >
                        {errorPosition.line
                           ? `Go to Line ${errorPosition.line}`
                           : 'Go to Error'}
                     </Button>
                  )}
                  {!autoFixDisabled && (
                     <Button onClick={fixJson} size="sm" variant={'ghost'}>
                        Fix JSON
                     </Button>
                  )}
               </div>
            </div>
         );
      } else {
         onErrorPanelChange(null);
      }
   }, [
      mounted,
      error,
      errorPosition,
      autoFixDisabled,
      navigateToError,
      fixJson,
      onErrorPanelChange,
   ]);

   // Unfold all code when entering compare mode
   React.useEffect(() => {
      if (!mounted || !config.compareMode) return;

      const view = editorRef.current?.view;
      if (!view) return;

      // Unfold all folded code sections
      unfoldAll(view);
   }, [mounted, config.compareMode]);

   // Reformat data when format state changes
   React.useEffect(() => {
      if (!mounted) return;

      // Parse current data
      const currentData =
         typeof data === 'string' ? data : JSON.stringify(data);
      const result = parseJson(currentData);

      if (!result.success) {
         // Don't reformat invalid JSON
         return;
      }

      // Determine what the formatted output should be
      let expectedFormat: string;
      if (config.formatState === FORMAT_STATES.MINIFIED) {
         expectedFormat = JSON.stringify(result.data);
      } else {
         const indent =
            config.formatState === FORMAT_STATES.EXPANDED
               ? INDENT_LEVELS.EXPANDED
               : INDENT_LEVELS.STANDARD;
         expectedFormat = stringifyJson(result.data, indent);
      }

      // Only update if the format actually changed
      if (currentData !== expectedFormat) {
         onChange(expectedFormat);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [mounted, config.formatState]);

   const paintData = useMemo(() => {
      // When actively editing, show the pending text being typed
      if (pendingText !== null) {
         return pendingText;
      }

      // If data is a string, show it as-is (could be invalid JSON being edited)
      if (typeof data === 'string') {
         return data;
      }

      // If data is an object, stringify with current format state indentation
      if (config.formatState === FORMAT_STATES.MINIFIED) {
         // For minified, use no spacing at all
         return JSON.stringify(data);
      }

      const indent =
         config.formatState === FORMAT_STATES.EXPANDED
            ? INDENT_LEVELS.EXPANDED
            : INDENT_LEVELS.STANDARD;
      return stringifyJson(data, indent);
   }, [data, config.formatState, pendingText]);

   const handleOnChange = React.useCallback((value: string) => {
      // Any user change re-enables the Fix JSON button
      setAutoFixDisabled(false);
      // Debounce parse by buffering the latest text
      setPendingText(value);
   }, []);

   // Debounced validation effect (no auto-parsing, only validation)
   React.useEffect(() => {
      if (pendingText === null) return;
      const id = window.setTimeout(() => {
         const result = parseJson(pendingText);

         if (result.success) {
            // Valid JSON - clear errors but keep as string
            setError(null);
            setErrorPosition(null);
         } else {
            // Invalid JSON - show error
            console.warn('JSON parse error during edit:', result.error);
            setError(result.error || 'Unknown parsing error');
            const errorPos = parseErrorPosition(
               result.error || '',
               pendingText
            );
            if (errorPos) {
               setErrorPosition(errorPos);
            }
         }

         // Always keep as string - never auto-convert to object
         onChange(pendingText);
         setPendingText(null);
      }, PARSE_DEBOUNCE_MS);
      return () => window.clearTimeout(id);
   }, [pendingText, onChange, parseErrorPosition]);

   // Configure extensions including line wrapping, theme and accessibility label
   const extensions = useMemo(() => {
      const themeExtension = theme === 'dark' ? vscodeDark : vscodeLight;
      const labelExtension = EditorView.contentAttributes.of({
         'aria-label': `${ariaLabel || 'JSON code editor'}${
            config.compareMode ? ' (compare mode)' : ''
         }`,
         role: 'textbox',
      });
      const baseExtensions = [
         EditorView.lineWrapping,
         themeExtension,
         labelExtension,
      ];

      if (
         config.formatState !== FORMAT_STATES.MINIFIED &&
         config.formatState !== FORMAT_STATES.DEFAULT
      ) {
         baseExtensions.push(jsonLang);
      }

      // Always include error decorations theme
      baseExtensions.push(errorDecorationsTheme);

      return baseExtensions;
   }, [theme, config.formatState, ariaLabel, config.compareMode]);

   const errorPlugin = useMemo(
      () =>
         errorPosition ? createErrorDecorationsPlugin(errorPosition) : null,
      [errorPosition]
   );

   const gutterExt = useMemo(
      () =>
         error && errorPosition
            ? createErrorGutterExtension(errorPosition, error)
            : null,
      [error, errorPosition]
   );

   // Calculate diffs if in compare mode
   const diffLines = useMemo(() => {
      if (!config.compareMode || !comparisonData) return null;

      try {
         const { left } = getLineDiffs(data, comparisonData);
         // Return the diff for this editor (we're showing "data" in this editor)
         // Map LineDiff[] to DiffLine[] (remove the content property)
         return left.map(({ lineNumber, type }) => ({ lineNumber, type }));
      } catch (err) {
         console.error('Error calculating diffs:', err);
         return null;
      }
   }, [config.compareMode, data, comparisonData]);

   const diffPlugin = useMemo(
      () =>
         diffLines && config.compareMode
            ? createDiffDecorationsPlugin(diffLines)
            : null,
      [diffLines, config.compareMode]
   );

   const allExtensions = useMemo(() => {
      let exts = extensions;
      if (errorPlugin) exts = [...exts, errorPlugin];
      if (gutterExt) exts = [...exts, gutterExt, errorGutterTheme];
      if (diffPlugin) exts = [...exts, diffPlugin, diffDecorationsTheme];
      return exts;
   }, [extensions, errorPlugin, gutterExt, diffPlugin]);

   if (!mounted) {
      return null;
   }

   const isMinified = config.formatState === FORMAT_STATES.MINIFIED;

   const showLineNumbers = !isMinified;
   const showActiveLineHighlight = !isMinified;

   return (
      <div className="text-editor-container h-full w-full">
         <CodeMirror
            ref={editorRef}
            value={paintData}
            theme="none"
            extensions={allExtensions}
            onChange={handleOnChange}
            editable={!config.compareMode}
            height="100%"
            style={{ height: '100%' }}
            aria-label={ariaLabel || 'JSON code editor'}
            basicSetup={{
               lineNumbers: showLineNumbers,
               highlightActiveLineGutter: showActiveLineHighlight,
               highlightSpecialChars: true,
               foldGutter: true,
               drawSelection: true,
               dropCursor: true,
               allowMultipleSelections: true,
               indentOnInput: true,
               syntaxHighlighting: true,
               bracketMatching: true,
               closeBrackets: true,
               autocompletion: true,
               rectangularSelection: true,
               crosshairCursor: true,
               highlightActiveLine: showActiveLineHighlight,
               highlightSelectionMatches: true,
               closeBracketsKeymap: true,
               searchKeymap: true,
               foldKeymap: true,
               completionKeymap: true,
               lintKeymap: true,
            }}
         />
      </div>
   );
}

// Reuse a single JSON language extension instance
const jsonLang = json();

export default TextEditor;
