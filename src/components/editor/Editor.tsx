import React from "react";
import JSONEditor from "./json-editior";
import TextEditor from "./text-editor";
import { tabEditorTypes } from "@/pageContent/json-editor/PageContent";

interface EditorProps {
  data: any;
  onChange: (newData: any) => void;
  type?: keyof typeof tabEditorTypes;
  children?: React.ReactNode;
}
function Editor({ data, onChange, type, children }: EditorProps) {
  console.log("Editor component rendered with type:", type);

  return (
    <>
      <div className="w-full h-10 flex gap-2 pl-2 pr-2 items-center bg-card">
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
