import { useState, useRef } from "react";
import { EditorConfig } from "@/types/editor";

interface EditorStateConfig {
  initialData: unknown;
  initialConfig: EditorConfig;
}

export function useEditorState({
  initialData,
  initialConfig,
}: EditorStateConfig) {
  const [data, setData] = useState<unknown>(initialData);
  const [config, setConfig] = useState<EditorConfig>(initialConfig);
  const originalDataRef = useRef<unknown>(initialData);

  const updateConfig = (newConfig: EditorConfig) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  const updateOriginalData = (newData: unknown) => {
    originalDataRef.current = newData;
  };

  return {
    data,
    setData,
    config,
    updateConfig,
    originalDataRef,
    updateOriginalData,
  };
}
