import { useState } from "react";
import { EditorConfig } from "@/types/editor";

interface EditorStateConfig {
  initialData: unknown;
  initialConfig: EditorConfig;
}

export function useEditorState({ initialData, initialConfig }: EditorStateConfig) {
  const [data, setData] = useState<unknown>(initialData);
  const [config, setConfig] = useState<EditorConfig>(initialConfig);

  const updateConfig = (newConfig: EditorConfig) => {
    setConfig({ ...config, ...newConfig });
  }; 

  return { data, setData, config, updateConfig };
}
