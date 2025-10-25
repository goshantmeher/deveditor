"use client";
import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";
import { EditorConfig } from "@/types/editor";
import { FORMAT_STATES, INDENT_LEVELS } from "@/constants/editor";
import { parseJson } from "@/lib/parser";
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { json } from "@codemirror/lang-json";

interface TextEditorProps {
  data: unknown;
  onChange: (newData: unknown) => void;
  config: EditorConfig;
}
function TextEditor({ data, onChange, config }: TextEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const paintData = useMemo(() => {
    let tempData = data;
    
    // If data is a string, try to parse it (supports JSON5 syntax)
    if (typeof data === 'string') {
      const result = parseJson(data);
      if (result.success) {
        tempData = result.data;
      } else {
        console.error("Failed to parse string as JSON:", result.error);
        // Keep as string if parsing fails
        return data as string;
      }
    }
    
    switch (config.formatState) {
      case FORMAT_STATES.EXPANDED:
        return JSON.stringify(tempData, null, INDENT_LEVELS.EXPANDED);
      case FORMAT_STATES.COLLAPSED:
        return JSON.stringify(tempData, null, INDENT_LEVELS.EXPANDED);
      case FORMAT_STATES.MINIFIED:
        return JSON.stringify(tempData, null, INDENT_LEVELS.MINIFIED);
      case FORMAT_STATES.STANDARD:
        return JSON.stringify(tempData, null, INDENT_LEVELS.STANDARD);
      case FORMAT_STATES.DEFAULT:
        return JSON.stringify(tempData, null, INDENT_LEVELS.STANDARD);
    }
    return JSON.stringify(tempData, null, INDENT_LEVELS.STANDARD);
  }, [data, config.formatState]);


  const handleOnChange = React.useCallback(
    (value: string) => {
      // Try to parse as JSON/JSON5 to maintain data structure
      const result = parseJson(value);
      if (result.success) {
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
    if (config.formatState !== FORMAT_STATES.MINIFIED && config.formatState !== FORMAT_STATES.DEFAULT) {
      baseExtensions.push(json());
    }
    
    return baseExtensions;
  }, [theme, config.formatState]);

  if (!mounted) {
    return null;
  }


  const isMinified = config.formatState === FORMAT_STATES.MINIFIED;
   
  const showLineNumbers = !isMinified;
  const showActiveLineHighlight = !isMinified;

  return (
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
  );
}

export default TextEditor;
