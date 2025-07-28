import React from "react";
import JSONEditor from "./json-editior";
import TextEditor from "./text-editor";
import { tabEditorTypes } from "@/pageContent/json-editor/PageContent";

interface EditorProps {
  data: string | unknown;
  onChange: (newData: string | unknown) => void;
  type?: keyof typeof tabEditorTypes;
  children?: React.ReactNode;
}
function Editor({ data, onChange, type, children }: EditorProps) {
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
        {type === "json" && <JSONEditor data={data} />}

        {type === "text" && <TextEditor data={data} onChange={onChange} />}
      </div>
    </>
  );
}

export default Editor;
