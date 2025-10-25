import { EditorType } from "@/constants/editor";

export interface EditorConfig {
  active: EditorType;
}

export interface EditorPanelProps {
  data: unknown;
  onDataChange: (data: unknown) => void;
  config: EditorConfig;
  onConfigChange: (config: EditorConfig) => void;
  showFullControls?: boolean;
}

