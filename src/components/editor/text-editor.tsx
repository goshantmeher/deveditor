"use client";
import React, { useMemo, useRef } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import {
  EditorView,
  Decoration,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { useTheme } from "next-themes";
import { EditorConfig } from "@/types/editor";
import { FORMAT_STATES, INDENT_LEVELS } from "@/constants/editor";
import { parseJson, stringifyJson } from "@/lib/parser";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { json } from "@codemirror/lang-json";
import { Button } from "../ui/button";
import { jsonrepair } from "jsonrepair";
import { EditorSelection } from "@codemirror/state";

interface TextEditorProps {
  data: unknown;
  onChange: (newData: unknown) => void;
  config: EditorConfig;
}
function TextEditor({ data, onChange, config }: TextEditorProps) {
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to compute line/col from a character index
  const getLineColFromIndex = (text: string, index: number) => {
    let line = 1;
    let column = 1;
    const max = Math.min(index, text.length);
    for (let i = 0; i < max; i++) {
      if (text[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    return { line, column };
  };

  // Extract line/column or absolute position from error message
  const parseErrorPosition = React.useCallback(
    (errorMessage: string, source?: string) => {
      const lineMatch = errorMessage.match(/line (\d+)/i);
      const columnMatch = errorMessage.match(/column (\d+)/i);
      if (lineMatch && columnMatch) {
        return {
          line: parseInt(lineMatch[1], 10),
          column: parseInt(columnMatch[1], 10),
        } as { line: number; column: number };
      }

      const posMatch = errorMessage.match(/position\s*(\d+)/i);
      if (posMatch) {
        const charIndex = parseInt(posMatch[1], 10);
        if (Number.isFinite(charIndex)) {
          if (source) {
            const { line, column } = getLineColFromIndex(source, charIndex);
            return { line, column, charIndex };
          }
          return { charIndex } as { charIndex: number };
        }
      }
      return null;
    },
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

  // Auto-jump to error when errorPosition changes (helps when value updates first)
  React.useEffect(() => {
    if (!mounted || !errorPosition) return;
    const id = window.setTimeout(() => {
      navigateToError();
    }, 0);
    return () => window.clearTimeout(id);
  }, [mounted, errorPosition, navigateToError]);

  const paintData = useMemo(() => {
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
  }, [data, config.formatState, parseErrorPosition]);

  const handleOnChange = React.useCallback(
    (value: string) => {
      // Any user change re-enables the Fix JSON button
      setAutoFixDisabled(false);
      // Try to parse as JSON/JSON5 to maintain data structure
      const result = parseJson(value);
      if (result.success) {
        setError(null);
        setErrorPosition(null);
        onChange(result.data);
      } else {
        // If parsing fails, keep as string for editing
        // This allows users to edit incomplete JSON
        console.warn("JSON parse error during edit:", result.error);
        onChange(value);
      }
    },
    [onChange]
  );

  // Configure extensions including line wrapping and theme
  const extensions = useMemo(() => {
    const themeExtension = theme === "dark" ? vscodeDark : vscodeLight;
    const baseExtensions = [EditorView.lineWrapping, themeExtension];

    // Add JSON syntax highlighting for formatted states
    if (
      config.formatState !== FORMAT_STATES.MINIFIED &&
      config.formatState !== FORMAT_STATES.DEFAULT
    ) {
      baseExtensions.push(json());
    }

    // Error line highlight extension
    if (errorPosition) {
      const errorLineTheme = EditorView.baseTheme({
        ".cm-errorLine": {
          backgroundColor: "rgba(239, 68, 68, 0.18)", // red-500 with opacity
        },
      });

      const errorLinePlugin = ViewPlugin.fromClass(
        class {
          decorations;
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

            if (typeof errorPosition.charIndex === "number") {
              const clamped = Math.max(
                0,
                Math.min(errorPosition.charIndex, doc.length)
              );
              lineNumber = doc.lineAt(clamped).number;
            } else if (typeof errorPosition.line === "number") {
              lineNumber = Math.max(1, Math.min(errorPosition.line, doc.lines));
            }

            if (!lineNumber) return Decoration.none;
            const line = doc.line(lineNumber);
            const deco = Decoration.line({
              attributes: { class: "cm-errorLine" },
            }).range(line.from);
            return Decoration.set([deco]);
          }
        },
        {
          decorations: (v) => v.decorations,
        }
      );

      baseExtensions.push(errorLineTheme, errorLinePlugin);
    }

    return baseExtensions;
  }, [theme, config.formatState, errorPosition]);

  if (!mounted) {
    return null;
  }
  const fixJson = () => {
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
        error || "",
        typeof data === "string" ? (data as string) : undefined
      );
      if (errorPos) {
        setErrorPosition(errorPos);
      }
      setAutoFixDisabled(true);
    }
  };

  const isMinified = config.formatState === FORMAT_STATES.MINIFIED;

  const showLineNumbers = !isMinified;
  const showActiveLineHighlight = !isMinified;

  return (
    <div className="h-full w-full">
      {error && (
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
      )}
      <CodeMirror
        ref={editorRef}
        value={paintData}
        theme="none"
        extensions={extensions}
        onChange={handleOnChange}
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

export default TextEditor;
