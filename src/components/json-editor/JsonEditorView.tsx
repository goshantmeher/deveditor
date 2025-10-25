"use client";

import React from "react";
import { EditorPanel } from "./EditorPanel";
import { EditorActions } from "./EditorActions";
import { useEditorState } from "@/hooks/useEditorState";
import { useEditorActions } from "@/hooks/useEditorActions";
import { DEFAULT_JSON_DATA } from "@/constants/editor";

export function JsonEditorView() {
  const leftEditor = useEditorState(DEFAULT_JSON_DATA);
  const rightEditor = useEditorState(DEFAULT_JSON_DATA);

  const { copyToRight, copyToLeft } = useEditorActions(
    leftEditor.data,
    rightEditor.data,
    leftEditor.setData,
    rightEditor.setData
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row w-full h-full">
        <EditorPanel
          data={leftEditor.data}
          onDataChange={leftEditor.setData}
          config={leftEditor.config}
          onConfigChange={leftEditor.setConfig}
          showFullControls={true}
        />

        <EditorActions onCopyToRight={copyToRight} onCopyToLeft={copyToLeft} />

        <EditorPanel
          data={rightEditor.data}
          onDataChange={rightEditor.setData}
          config={rightEditor.config}
          onConfigChange={rightEditor.setConfig}
          showFullControls={false}
        />
      </div>
    </div>
  );
}

