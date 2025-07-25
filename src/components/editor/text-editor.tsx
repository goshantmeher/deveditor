"use client";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useTheme } from "next-themes";

interface TextEditorProps {
  data: unknown;
  onChange: (newData: unknown) => void;
}
function TextEditor({ data }: TextEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnChange = React.useCallback((value: string) => {
    console.log("value:", value);
  }, []);

  const currentTheme = theme === "dark" ? "dark" : "light";

  if (!mounted) {
    return null;
  }

  return (
    <CodeMirror
      value={JSON.stringify(data, null, 2)}
      theme={currentTheme}
      extensions={[json()]}
      onChange={handleOnChange}
    />
  );
}

export default TextEditor;
