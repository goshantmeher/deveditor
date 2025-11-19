"use client";
import React, { useMemo, useRef } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";
import { EditorConfig } from "@/types/editor";
import { FORMAT_STATES, INDENT_LEVELS } from "@/constants/editor";
import { parseJson, stringifyJson } from "@/lib/parser";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { json } from "@codemirror/lang-json";
import { Button } from "../ui/button";
import { jsonrepair } from "jsonrepair";
import { EditorSelection } from "@codemirror/state";
import { unfoldAll } from "@codemirror/language";
import {
  errorDecorationsTheme,
  parseErrorPosition as parseErrorPosUtil,
  createErrorDecorationsPlugin,
  createErrorGutterExtension,
  errorGutterTheme,
  diffDecorationsTheme,
  createDiffDecorationsPlugin,
} from "@/lib/editor-error";
import { getLineDiffs } from "@/lib/json-compare";

interface TextEditorProps {
  data: unknown;
  onChange: (newData: unknown) => void;
  config: EditorConfig;
  comparisonData?: unknown;
  onErrorPanelChange?: (errorPanel: React.ReactNode) => void;
}
function TextEditor({
  data,
  onChange,
  config,
  comparisonData,
  onErrorPanelChange,
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

      if (typeof errorPosition.charIndex === "number") {
        pos = Math.max(0, Math.min(errorPosition.charIndex, doc.length));
      } else if (
        typeof errorPosition.line === "number" &&
        typeof errorPosition.column === "number"
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
      console.error("Error navigating to position:", err);
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
        onChange(result.data);
      } else {
        console.error("Failed to parse repaired JSON:", result.error);
        setError(result.error || "Unknown parsing error");
        const errorPos = parseErrorPosition(result.error || "", repaired);
        if (errorPos) {
          setErrorPosition(errorPos);
        }
        setAutoFixDisabled(true);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Auto-fix failed";
      setError(`Auto-fix failed: ${errorMessage}`);
      const errorPos = parseErrorPosition(
        errorMessage,
        typeof data === "string" ? (data as string) : undefined
      );
      if (errorPos) {
        setErrorPosition(errorPos);
      }
      setAutoFixDisabled(true);
    }
  }, [data, onChange, parseErrorPosition]);

  // Notify parent about error panel changes
  React.useEffect(() => {
    if (!mounted || !onErrorPanelChange) return;

    if (error) {
      onErrorPanelChange(
        <div className="p-2 bg-red-100 text-red-800 border border-red-400 mb-2 flex justify-between items-center">
          <span>{error}</span>
          <div className="flex gap-2">
            {errorPosition && (
              <Button onClick={navigateToError} variant="ghost" size="sm">
                {errorPosition.line
                  ? `Go to Line ${errorPosition.line}`
                  : "Go to Error"}
              </Button>
            )}
            {!autoFixDisabled && (
              <Button onClick={fixJson} size="sm" variant={"ghost"}>
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

  const paintData = useMemo(() => {
    // When actively editing, show the pending text being typed
    if (pendingText !== null) {
      return pendingText;
    }

    // If autoFix is disabled, show data as raw string without any processing
    if (config.autoFix === false) {
      return typeof data === "string" ? data : JSON.stringify(data, null, 2);
    }

    let tempData = data;

    // If data is a string, try to parse it (supports JSON5 syntax)
    if (typeof data === "string") {
      const result = parseJson(data);
      if (result.success) {
        tempData = result.data;
      } else {
        console.error("Failed to parse string as JSON:", result.error);
        // Keep as string if parsing fails
        setError(result.error || "Unknown parsing error");
        const errorPos = parseErrorPosition(result.error || "", data as string);
        if (errorPos) {
          setErrorPosition(errorPos);
        }
        return data as string;
      }
    }

    switch (config.formatState) {
      case FORMAT_STATES.EXPANDED:
        return stringifyJson(tempData, INDENT_LEVELS.EXPANDED);
      case FORMAT_STATES.COLLAPSED:
        return stringifyJson(tempData, INDENT_LEVELS.EXPANDED);
      case FORMAT_STATES.MINIFIED:
        return stringifyJson(tempData, INDENT_LEVELS.MINIFIED);
      case FORMAT_STATES.STANDARD:
        return stringifyJson(tempData, INDENT_LEVELS.STANDARD);
      case FORMAT_STATES.DEFAULT:
        return stringifyJson(tempData, INDENT_LEVELS.STANDARD);
    }
    return stringifyJson(tempData, INDENT_LEVELS.STANDARD);
  }, [
    data,
    config.formatState,
    config.autoFix,
    parseErrorPosition,
    pendingText,
  ]);

  const handleOnChange = React.useCallback((value: string) => {
    // Any user change re-enables the Fix JSON button
    setAutoFixDisabled(false);
    // Debounce parse by buffering the latest text
    setPendingText(value);
  }, []);

  // Debounced parsing effect
  React.useEffect(() => {
    if (pendingText === null) return;
    const id = window.setTimeout(() => {
      // If autoFix is disabled, keep text as-is without any parsing
      if (config.autoFix === false) {
        setError(null);
        setErrorPosition(null);
        onChange(pendingText);
        setPendingText(null);
        return;
      }

      const result = parseJson(pendingText);
      if (result.success) {
        setError(null);
        setErrorPosition(null);
        onChange(result.data);
      } else {
        console.warn("JSON parse error during edit:", result.error);
        setError(result.error || "Unknown parsing error");
        const errorPos = parseErrorPosition(result.error || "", pendingText);
        if (errorPos) {
          setErrorPosition(errorPos);
        }
        // Keep as string for editing
        onChange(pendingText);
      }
      setPendingText(null);
    }, PARSE_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [pendingText, onChange, parseErrorPosition, config.autoFix]);

  // Configure extensions including line wrapping and theme
  const extensions = useMemo(() => {
    const themeExtension = theme === "dark" ? vscodeDark : vscodeLight;
    const baseExtensions = [EditorView.lineWrapping, themeExtension];

    if (
      config.formatState !== FORMAT_STATES.MINIFIED &&
      config.formatState !== FORMAT_STATES.DEFAULT
    ) {
      baseExtensions.push(jsonLang);
    }

    // Always include error decorations theme
    baseExtensions.push(errorDecorationsTheme);

    return baseExtensions;
  }, [theme, config.formatState]);

  const errorPlugin = useMemo(
    () => (errorPosition ? createErrorDecorationsPlugin(errorPosition) : null),
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
      console.error("Error calculating diffs:", err);
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
    <div className="h-full w-full">
      <CodeMirror
        ref={editorRef}
        value={paintData}
        theme="none"
        extensions={allExtensions}
        onChange={handleOnChange}
        editable={!config.compareMode}
        height="100%"
        style={{ height: "100%" }}
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
