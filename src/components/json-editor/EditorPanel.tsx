"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ExpandButton from "@/components/ExpandButton";
import CollapseButton from "@/components/CollapseButton";
import JusifyButton from "@/components/JustifiyButton";
import BracesButton from "@/components/BracesButton";
import SearchButton from "@/components/SearchButton";
import ImportButton from "@/components/ImportButton";
import Editor from "@/components/editor/Editor";
import { EditorPanelProps } from "@/types/editor";
import { EDITOR_TYPES, EditorType } from "@/constants/editor";

export function EditorPanel({
  data,
  onDataChange,
  config,
  onConfigChange,
  showFullControls = true,
}: EditorPanelProps) {
  const handleEditorTypeChange = (value: string) => {
    if (value) {
      onConfigChange({ ...config, active: value as EditorType });
    }
  };

  const handleImport = (newData: unknown) => {
    onDataChange(newData);
  };

  const handleImportClick = () => {
    onConfigChange({ ...config, active: EDITOR_TYPES.text });
  };

  return (
    <div className="w-full md:flex-1">
      <Editor data={data} onChange={onDataChange} type={config.active}>
        {showFullControls ? (
          <>
            <ToggleGroup
              type="single"
              size="sm"
              defaultValue="text"
              variant="outline"
              onValueChange={handleEditorTypeChange}
            >
              <ToggleGroupItem value="text" aria-label="Toggle text">
                <span>text</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="json" aria-label="Toggle tree">
                <span>tree</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex justify-between items-center w-full pl-2">
              <div className="flex items-center">
                <ExpandButton onClick={() => console.log("Expand clicked")} />
                <CollapseButton
                  onClick={() => console.log("Collapse clicked")}
                />
                <JusifyButton
                  onClick={() => console.log("Justify clicked")}
                  title="Remove whitespace and indentation"
                />
                <BracesButton
                  onClick={() => console.log("Braces clicked")}
                  title="Format"
                />
              </div>
              <div className="flex items-center">
                <SearchButton onClick={() => console.log("Search clicked")} />
                <ImportButton
                  onImport={handleImport}
                  dataType="json"
                  onImportClick={handleImportClick}
                />
              </div>
            </div>
          </>
        ) : (
          <ImportButton
            onImport={handleImport}
            dataType="json"
            onImportClick={handleImportClick}
          />
        )}
      </Editor>
    </div>
  );
}

