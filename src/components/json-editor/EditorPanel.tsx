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
import { EDITOR_TYPES, EditorType, FORMAT_STATES, FormatState } from "@/constants/editor";


export function EditorPanel({
  data,
  onDataChange,
  config,
  onConfigChange,
  showFullControls = true,
}: EditorPanelProps) {


  // Determine which button should be highlighted
  const isExpanded = config.formatState === FORMAT_STATES.EXPANDED;
  const isCollapsed = config.formatState === FORMAT_STATES.COLLAPSED;
  const isMinified = config.formatState === FORMAT_STATES.MINIFIED;
  const isStandard = config.formatState === FORMAT_STATES.STANDARD;

  const handleEditorTypeChange = (value: string) => {
    if (value) {
      onConfigChange({ ...config, editorType: value as EditorType });
    }
  };

  const handleImport = (newData: unknown) => {
    onDataChange(newData);
  };

  const handleImportClick = () => {
    onConfigChange({ ...config, editorType: EDITOR_TYPES.text });
  };

  const handleEditorFormatChange = (value: FormatState) => {
    onConfigChange({ ...config, formatState: value });
  }
  console.log(config);

  return (
    <div className="w-full md:flex-1 md:basis-0 md:min-w-0">
      <Editor data={data} onChange={onDataChange} config={config}>
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
                {config.editorFormatOptions.includes(FORMAT_STATES.EXPANDED) ? <ExpandButton
                  onClick={() => handleEditorFormatChange(FORMAT_STATES.EXPANDED)}
                  title="Expand"
                  variant={isExpanded ? "default" : "ghost"}
                /> : null}
                {config.editorFormatOptions.includes(FORMAT_STATES.COLLAPSED) ? <CollapseButton
                  onClick={() => handleEditorFormatChange(FORMAT_STATES.COLLAPSED)}
                  title="Collapse"
                  variant={isCollapsed ? "default" : "ghost"}
                /> : null}
                {config.editorFormatOptions.includes(FORMAT_STATES.MINIFIED) ? <JusifyButton
                  onClick={() => handleEditorFormatChange(FORMAT_STATES.MINIFIED)}
                  title="Minify"
                  variant={isMinified ? "default" : "ghost"}
                /> : null}
                {config.editorFormatOptions.includes(FORMAT_STATES.STANDARD) ? <BracesButton
                  onClick={() => handleEditorFormatChange(FORMAT_STATES.STANDARD)}
                  title="Format"
                  variant={isStandard ? "default" : "ghost"}
                /> : null}
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

