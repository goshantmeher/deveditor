import { useState } from "react";
import { EditorConfig } from "@/types/editor";
import { DEFAULT_EDITOR_CONFIG, DEFAULT_JSON_DATA } from "@/constants/editor";

export function useEditorState(initialData: unknown = DEFAULT_JSON_DATA) {
  const [data, setData] = useState<unknown>(initialData);
  const [config, setConfig] = useState<EditorConfig>({
    active: DEFAULT_EDITOR_CONFIG.active,
  });

  return {
    data,
    setData,
    config,
    setConfig,
  };
}

