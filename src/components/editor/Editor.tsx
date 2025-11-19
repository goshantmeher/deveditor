import React from "react";
import JSONEditor from "./json-editor";
import TextEditor from "./text-editor";
import { EDITOR_TYPES, EditorType } from "@/constants/editor";
import { EditorConfig } from "@/types/editor";

interface EditorProps {
  data: string | unknown;
  onChange: (newData: string | unknown) => void;
  config: EditorConfig;
  children?: React.ReactNode;
  comparisonData?: unknown;
}
function Editor({
  data,
  onChange,
  config,
  children,
  comparisonData,
}: EditorProps) {
  return (
    <>
      <div className="w-full h-10 flex pl-2 pr-2 items-center bg-card border-b border-border">
        {children}
      </div>
      <div
        style={{
          height: "calc(100% - 40px)",
          overflowY: "auto",
        }}
      >
        {config.editorType === EDITOR_TYPES.json && <JSONEditor data={data} />}

        {config.editorType === EDITOR_TYPES.text && (
          <TextEditor
            data={data}
            onChange={onChange}
            config={config}
            comparisonData={comparisonData}
          />
        )}
      </div>
    </>
  );
}

export default Editor;
