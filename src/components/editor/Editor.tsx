import React from "react";
import JSONEditor from "./json-editor";
import TextEditor from "./text-editor";
import { EDITOR_TYPES } from "@/constants/editor";
import { EditorConfig } from "@/types/editor";

interface EditorProps {
  data: string | unknown;
  onChange: (newData: string | unknown) => void;
  config: EditorConfig;
  children?: React.ReactNode;
  comparisonData?: unknown;
  searchPanel?: React.ReactNode;
  errorPanel?: React.ReactNode;
  ariaLabel?: string;
}
function Editor({
  data,
  onChange,
  config,
  children,
  comparisonData,
  searchPanel,
  ariaLabel,
}: EditorProps) {
  const [searchPanelHeight, setSearchPanelHeight] = React.useState(0);
  const [errorPanelHeight, setErrorPanelHeight] = React.useState(0);
  const [internalErrorPanel, setInternalErrorPanel] =
    React.useState<React.ReactNode>(null);
  const searchPanelRef = React.useRef<HTMLDivElement>(null);
  const errorPanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (searchPanelRef.current) {
      setSearchPanelHeight(searchPanelRef.current.offsetHeight);
    } else {
      setSearchPanelHeight(0);
    }
  }, [searchPanel]);

  React.useEffect(() => {
    if (errorPanelRef.current) {
      setErrorPanelHeight(errorPanelRef.current.offsetHeight);
    } else {
      setErrorPanelHeight(0);
    }
  }, [internalErrorPanel]);

  const editorHeight = `calc(100% - ${
    40 + searchPanelHeight + errorPanelHeight
  }px)`;

  return (
    <>
      <div className="w-full h-10 flex pl-2 pr-2 items-center bg-card border-b border-border">
        {children}
      </div>
      {searchPanel && <div ref={searchPanelRef}>{searchPanel}</div>}
      {internalErrorPanel && (
        <div ref={errorPanelRef}>{internalErrorPanel}</div>
      )}
      <div
        style={{
          height: editorHeight,
          overflowY: "auto",
        }}
      >
        {config.editorType === EDITOR_TYPES.json && (
          <JSONEditor data={data} ariaLabel={ariaLabel} />
        )}

        {config.editorType === EDITOR_TYPES.text && (
          <TextEditor
            data={data}
            onChange={onChange}
            config={config}
            comparisonData={comparisonData}
            onErrorPanelChange={setInternalErrorPanel}
            ariaLabel={ariaLabel}
          />
        )}
      </div>
    </>
  );
}

export default Editor;
