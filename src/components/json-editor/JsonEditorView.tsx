"use client";

import React from "react";
import { EditorPanel } from "./EditorPanel";
import { EditorActions } from "./EditorActions";
import { useEditorState } from "@/hooks/useEditorState";
import { useEditorActions } from "@/hooks/useEditorActions";
import { DEFAULT_JSON_DATA, DEFAULT_JSON_EDITOR_CONFIG, DEFAULT_TEXT_EDITOR_CONFIG, EDITOR_TYPES } from "@/constants/editor";
import { EditorConfig } from "@/types/editor";

export function JsonEditorView() {
  const leftEditor = useEditorState({ 
    initialData: DEFAULT_JSON_DATA, 
    initialConfig: DEFAULT_TEXT_EDITOR_CONFIG
  });
  const rightEditor = useEditorState({ initialData: DEFAULT_JSON_DATA, initialConfig: DEFAULT_TEXT_EDITOR_CONFIG });

  const { copyToRight, copyToLeft } = useEditorActions(
    leftEditor.data,
    rightEditor.data,
    leftEditor.setData,
    rightEditor.setData
  );

  const updateConfig = (oldConfig: EditorConfig, newConfig: EditorConfig, callback: (config: EditorConfig) => void) => {
   
    if (oldConfig.editorType !== newConfig.editorType) {
      const initialConfig  = newConfig.editorType === EDITOR_TYPES.text ? DEFAULT_TEXT_EDITOR_CONFIG : DEFAULT_JSON_EDITOR_CONFIG;
      callback(initialConfig);
    } else {
      callback(newConfig);
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row w-full h-full">
        <EditorPanel
          data={leftEditor.data}
          onDataChange={leftEditor.setData}
          config={leftEditor.config}
          onConfigChange={(newConfig) => updateConfig(leftEditor.config, newConfig, leftEditor.updateConfig)}
          showFullControls={true}
        />

        <EditorActions onCopyToRight={copyToRight} onCopyToLeft={copyToLeft} />

        <EditorPanel
          data={rightEditor.data}
          onDataChange={rightEditor.setData}
          config={rightEditor.config}
          onConfigChange={(newConfig) => updateConfig(rightEditor.config, newConfig, rightEditor.updateConfig)}
          showFullControls={false}
        />
      </div>
    </div>
  );
}

