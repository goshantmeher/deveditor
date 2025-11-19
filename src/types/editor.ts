import { EditorType, FormatState } from "@/constants/editor";

export interface EditorConfig {
  editorType: EditorType;
  formatState: FormatState;
  editorFormatOptions: FormatState[];
  compareMode?: boolean;
  searchOpen?: boolean;
  filterPath?: string;
  autoFix?: boolean;
}

export interface EditorPanelProps {
  data: unknown;
  onDataChange: (data: unknown) => void;
  config: EditorConfig;
  onConfigChange: (config: EditorConfig) => void;
  showFullControls?: boolean;
  comparisonData?: unknown; // Data from the other panel for diff comparison
  originalData?: unknown; // Original unfiltered data for search functionality
  onOriginalDataChange?: (data: unknown) => void; // Update original data reference
}
