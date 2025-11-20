"use client";

import React from "react";
import ExpandButton from "@/components/ExpandButton";
import CollapseButton from "@/components/CollapseButton";
import JusifyButton from "@/components/JustifiyButton";
import BracesButton from "@/components/BracesButton";
import SearchButton from "@/components/SearchButton";
import ImportButton from "@/components/ImportButton";
import Editor from "@/components/editor/Editor";
import { SearchPanel } from "@/components/json-editor/SearchPanel";
import { EditorPanelProps } from "@/types/editor";
import { EDITOR_TYPES, FORMAT_STATES, FormatState } from "@/constants/editor";
import { filterJsonByPath } from "@/lib/json-filter";
import { parseJson, stringifyJson } from "@/lib/parser";
import { INDENT_LEVELS } from "@/constants/editor";

export function EditorPanel({
  data,
  onDataChange,
  config,
  onConfigChange,
  comparisonData,
  originalData,
  onOriginalDataChange,
}: EditorPanelProps) {
  // Determine which button should be highlighted
  const isExpanded = config.formatState === FORMAT_STATES.EXPANDED;
  const isCollapsed = config.formatState === FORMAT_STATES.COLLAPSED;
  const isMinified = config.formatState === FORMAT_STATES.MINIFIED;
  const isStandard = config.formatState === FORMAT_STATES.STANDARD;

  // Search is only available when not in minified mode
  const canSearch = !isMinified;

  // const handleEditorTypeChange = (value: string) => {
  //   if (value) {
  //     onConfigChange({ ...config, editorType: value as EditorType });
  //   }
  // };

  const handleImport = (newData: unknown) => {
    onDataChange(newData);
  };

  const handleImportClick = () => {
    onConfigChange({ ...config, editorType: EDITOR_TYPES.text });
  };

  const handleEditorFormatChange = (value: FormatState) => {
    // If switching to minified and in compare mode, turn off compare mode
    if (value === FORMAT_STATES.MINIFIED && config.compareMode) {
      onConfigChange({
        ...config,
        formatState: value,
        compareMode: false,
        searchOpen: false,
      });
    } else {
      onConfigChange({ ...config, formatState: value });
    }
  };

  const handleSearchClick = () => {
    if (!canSearch) {
      // Auto-switch from minified to standard format
      onConfigChange({
        ...config,
        formatState: FORMAT_STATES.STANDARD,
        searchOpen: true,
      });
    } else {
      onConfigChange({ ...config, searchOpen: !config.searchOpen });
    }
  };

  const handleSearch = (query: string) => {
    // Parse the data (could be string or object)
    let parsedData: unknown;
    let parsedOriginal: unknown;

    if (typeof data === "string") {
      const result = parseJson(data);
      if (!result.success) {
        console.error("Cannot filter invalid JSON");
        return;
      }
      parsedData = result.data;
    } else {
      parsedData = data;
    }

    // Store original data if not already stored
    if (!config.filterPath && onOriginalDataChange) {
      onOriginalDataChange(data);
    }

    // Parse original data for filtering
    if (originalData !== undefined) {
      if (typeof originalData === "string") {
        const result = parseJson(originalData as string);
        if (!result.success) {
          console.error("Cannot filter invalid JSON");
          return;
        }
        parsedOriginal = result.data;
      } else {
        parsedOriginal = originalData;
      }
    } else {
      parsedOriginal = parsedData;
    }

    // Filter the data
    const filteredData = filterJsonByPath(parsedOriginal, query);

    if (filteredData !== null && filteredData !== undefined) {
      // Convert back to string with appropriate formatting
      const indent = isStandard
        ? INDENT_LEVELS.STANDARD
        : INDENT_LEVELS.EXPANDED;
      const formattedString = stringifyJson(filteredData, indent);
      onDataChange(formattedString);
      onConfigChange({ ...config, filterPath: query });
    }
  };

  const handleClearFilter = () => {
    // Restore original data
    if (originalData !== undefined) {
      onDataChange(originalData);
    }
    onConfigChange({ ...config, filterPath: undefined });
  };

  const handleCloseSearch = () => {
    onConfigChange({ ...config, searchOpen: false });
  };

  return (
    <div className="w-full md:flex-1 md:basis-0 md:min-w-0">
      <Editor
        data={data}
        onChange={onDataChange}
        config={config}
        comparisonData={comparisonData}
        searchPanel={
          config.searchOpen ? (
            <SearchPanel
              onSearch={handleSearch}
              onClear={handleClearFilter}
              onClose={handleCloseSearch}
              currentFilter={config.filterPath}
            />
          ) : undefined
        }
      >
        <>
          {/* <ToggleGroup
            type="single"
            size="sm"
            value={config.editorType}
            variant="outline"
            onValueChange={handleEditorTypeChange}
          >
            <ToggleGroupItem value="text" aria-label="Toggle text">
              <span>text</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="json" aria-label="Toggle tree">
              <span>tree</span>
            </ToggleGroupItem>
          </ToggleGroup> */}
          <div className="flex justify-between items-center w-full pl-2">
            <div className="flex items-center">
              {config.editorFormatOptions.includes(FORMAT_STATES.EXPANDED) ? (
                <ExpandButton
                  onClick={() =>
                    handleEditorFormatChange(FORMAT_STATES.EXPANDED)
                  }
                  title="Expand"
                  variant={isExpanded ? "default" : "ghost"}
                />
              ) : null}
              {config.editorFormatOptions.includes(FORMAT_STATES.COLLAPSED) ? (
                <CollapseButton
                  onClick={() =>
                    handleEditorFormatChange(FORMAT_STATES.COLLAPSED)
                  }
                  title="Collapse"
                  variant={isCollapsed ? "default" : "ghost"}
                />
              ) : null}
              {config.editorFormatOptions.includes(FORMAT_STATES.MINIFIED) ? (
                <JusifyButton
                  onClick={() =>
                    handleEditorFormatChange(FORMAT_STATES.MINIFIED)
                  }
                  title="Minify"
                  variant={isMinified ? "default" : "ghost"}
                />
              ) : null}
              {config.editorFormatOptions.includes(FORMAT_STATES.STANDARD) ? (
                <BracesButton
                  onClick={() =>
                    handleEditorFormatChange(FORMAT_STATES.STANDARD)
                  }
                  title="Format"
                  variant={isStandard ? "default" : "ghost"}
                />
              ) : null}
            </div>
            <div className="flex items-center">
              <SearchButton
                onClick={handleSearchClick}
                variant={config.searchOpen ? "default" : "ghost"}
              />
              <ImportButton
                onImport={handleImport}
                dataType="json"
                onImportClick={handleImportClick}
              />
            </div>
          </div>
        </>
      </Editor>
    </div>
  );
}
