"use client";

import React, { useState, useCallback } from "react";
import { EditorPanel } from "./EditorPanel";
import { EditorActions } from "./EditorActions";
import { useEditorState } from "@/hooks/useEditorState";
import { useEditorActions } from "@/hooks/useEditorActions";
import {
  DEFAULT_JSON_DATA,
  DEFAULT_JSON_EDITOR_CONFIG,
  DEFAULT_TEXT_EDITOR_CONFIG,
  EDITOR_TYPES,
  FORMAT_STATES,
} from "@/constants/editor";
import { EditorConfig } from "@/types/editor";

export function JsonEditorView() {
  const leftEditor = useEditorState({
    initialData: DEFAULT_JSON_DATA,
    initialConfig: DEFAULT_TEXT_EDITOR_CONFIG,
  });
  const rightEditor = useEditorState({
    initialData: DEFAULT_JSON_DATA,
    initialConfig: DEFAULT_TEXT_EDITOR_CONFIG,
  });

  const [isComparing, setIsComparing] = useState(false);

  const { copyToRight, copyToLeft } = useEditorActions(
    leftEditor.data,
    rightEditor.data,
    leftEditor.setData,
    rightEditor.setData
  );

  const updateConfig = (
    oldConfig: EditorConfig,
    newConfig: EditorConfig,
    callback: (config: EditorConfig) => void,
    isLeftEditor: boolean
  ) => {
    // If compare mode is being turned off, sync the isComparing state and turn off compare mode for both editors
    if (oldConfig.compareMode && !newConfig.compareMode) {
      setIsComparing(false);
      // Also turn off compare mode for the other editor
      if (isLeftEditor) {
        rightEditor.updateConfig({ ...rightEditor.config, compareMode: false });
      } else {
        leftEditor.updateConfig({ ...leftEditor.config, compareMode: false });
      }
    }

    if (oldConfig.editorType !== newConfig.editorType) {
      const initialConfig =
        newConfig.editorType === EDITOR_TYPES.text
          ? DEFAULT_TEXT_EDITOR_CONFIG
          : DEFAULT_JSON_EDITOR_CONFIG;
      callback(initialConfig);
    } else {
      callback(newConfig);
    }
  };

  // Check if both editors are in text mode and not minified
  const canCompare =
    leftEditor.config.editorType === EDITOR_TYPES.text &&
    rightEditor.config.editorType === EDITOR_TYPES.text;

  const handleCompare = useCallback(() => {
    if (!canCompare) return;

    // If currently comparing, exit compare mode
    if (isComparing) {
      setIsComparing(false);
      leftEditor.updateConfig({ ...leftEditor.config, compareMode: false });
      rightEditor.updateConfig({ ...rightEditor.config, compareMode: false });
      return;
    }

    // Auto-switch from minified to standard if needed
    const leftNeedsFormatChange =
      leftEditor.config.formatState === FORMAT_STATES.MINIFIED;
    const rightNeedsFormatChange =
      rightEditor.config.formatState === FORMAT_STATES.MINIFIED;

    // Update left editor config
    leftEditor.updateConfig({
      ...leftEditor.config,
      formatState: leftNeedsFormatChange
        ? FORMAT_STATES.STANDARD
        : leftEditor.config.formatState,
      compareMode: true,
    });

    // Update right editor config
    rightEditor.updateConfig({
      ...rightEditor.config,
      formatState: rightNeedsFormatChange
        ? FORMAT_STATES.STANDARD
        : rightEditor.config.formatState,
      compareMode: true,
    });

    setIsComparing(true);
  }, [canCompare, isComparing, leftEditor, rightEditor]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row w-full h-full">
        <EditorPanel
          data={leftEditor.data}
          onDataChange={leftEditor.setData}
          config={leftEditor.config}
          onConfigChange={(newConfig) =>
            updateConfig(
              leftEditor.config,
              newConfig,
              leftEditor.updateConfig,
              true
            )
          }
          comparisonData={isComparing ? rightEditor.data : undefined}
        />

        <EditorActions
          onCopyToRight={copyToRight}
          onCopyToLeft={copyToLeft}
          onCompare={handleCompare}
          isComparing={isComparing}
          canCompare={canCompare}
        />

        <EditorPanel
          data={rightEditor.data}
          onDataChange={rightEditor.setData}
          config={rightEditor.config}
          onConfigChange={(newConfig) =>
            updateConfig(
              rightEditor.config,
              newConfig,
              rightEditor.updateConfig,
              false
            )
          }
          comparisonData={isComparing ? leftEditor.data : undefined}
        />
      </div>
    </div>
  );
}
