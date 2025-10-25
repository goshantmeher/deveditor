"use client";
import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";
import { EditorConfig } from "@/types/editor";
import { FORMAT_STATES, INDENT_LEVELS } from "@/constants/editor";
import { parseJson, stringifyJson } from "@/lib/parser";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { json } from "@codemirror/lang-json";
import { Button } from "../ui/button";
import { jsonrepair } from "jsonrepair";

interface TextEditorProps {
  data: unknown;
  onChange: (newData: unknown) => void;
  config: EditorConfig;
}
function TextEditor({ data, onChange, config }: TextEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
  }, [data, config.formatState]);

  const handleOnChange = React.useCallback(
    (value: string) => {
      // Try to parse as JSON/JSON5 to maintain data structure
      const result = parseJson(value);
      if (result.success) {
        setError(null);
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

    return baseExtensions;
  }, [theme, config.formatState]);

  if (!mounted) {
    return null;
  }
  // ...existing code...
  const fixJson = () => {
    try {
      const repaired = jsonrepair(data as string);
      const result = parseJson(repaired);
      if (result.success) {
        setError(null);
        onChange(result.data);
      } else {
        console.error("Failed to parse string as JSON:", result.error);
        // Keep as string if parsing fails
        setError(result.error || "Unknown parsing error");
        return data as string;
      }
    } catch (err) {
      setError(`Auto-fix failed: ${error}`);
    }
  };
  // ...existing code...

  const isMinified = config.formatState === FORMAT_STATES.MINIFIED;

  const showLineNumbers = !isMinified;
  const showActiveLineHighlight = !isMinified;

  return (
    <div className="h-full w-full">
      {error && (
        <div className="p-2 bg-red-100 text-red-800 border border-red-400 mb-2 flex justify-between items-center">
          <span> {error}</span>
          <Button onClick={fixJson} className="border border-red-500">
            Fix JSON
          </Button>
        </div>
      )}
      <CodeMirror
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
