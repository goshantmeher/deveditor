'use client';

import React from 'react';
import ExpandButton from '@/components/ExpandButton';
import CollapseButton from '@/components/CollapseButton';
import JusifyButton from '@/components/JustifiyButton';
import BracesButton from '@/components/BracesButton';
import SearchButton from '@/components/SearchButton';
import ImportButton from '@/components/ImportButton';
import ExportButton from '@/components/ExportButton';
import Editor from '@/components/editor/Editor';
import { EditorHandle } from '@/components/editor/text-editor';
import { SearchPanel } from '@/components/json-editor/SearchPanel';
import { EditorPanelProps } from '@/types/editor';
import { EDITOR_TYPES, FORMAT_STATES, FormatState } from '@/constants/editor';
import { filterJsonByPath } from '@/lib/json-filter';
import { parseJson, stringifyJson } from '@/lib/parser';
import { INDENT_LEVELS } from '@/constants/editor';

export function EditorPanel({
   data,
   onDataChange,
   config,
   onConfigChange,
   comparisonData,
   originalData,
   onOriginalDataChange,
   panelLabel,
}: EditorPanelProps) {
   const editorRef = React.useRef<EditorHandle>(null);

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
            formatVersion: (config.formatVersion || 0) + 1,
         });
      } else if (value === config.formatState) {
         // Same format state clicked again — bump formatVersion to force re-format
         onConfigChange({
            ...config,
            formatVersion: (config.formatVersion || 0) + 1,
         });
      } else {
         onConfigChange({
            ...config,
            formatState: value,
            formatVersion: (config.formatVersion || 0) + 1,
         });
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

      if (typeof data === 'string') {
         const result = parseJson(data);
         if (!result.success) {
            console.error('Cannot filter invalid JSON');
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
         if (typeof originalData === 'string') {
            const result = parseJson(originalData as string);
            if (!result.success) {
               console.error('Cannot filter invalid JSON');
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

   const handleExpand = () => {
      // If currently minified, switch to standard format first
      if (config.formatState === FORMAT_STATES.MINIFIED) {
         onConfigChange({
            ...config,
            formatState: FORMAT_STATES.STANDARD,
            formatVersion: (config.formatVersion || 0) + 1,
         });
      }
      // Force re-format in case content is stale, then expand
      if (config.formatState !== FORMAT_STATES.MINIFIED) {
         onConfigChange({
            ...config,
            formatState: FORMAT_STATES.EXPANDED,
            formatVersion: (config.formatVersion || 0) + 1,
         });
      }
      // Let the reformat effect run, then unfold via a short delay
      setTimeout(() => {
         editorRef.current?.expandAll();
      }, 50);
   };

   const handleCollapse = () => {
      // If currently minified, switch to standard format first
      if (config.formatState === FORMAT_STATES.MINIFIED) {
         onConfigChange({
            ...config,
            formatState: FORMAT_STATES.STANDARD,
            formatVersion: (config.formatVersion || 0) + 1,
         });
      }
      // Force re-format in case content is stale
      if (config.formatState !== FORMAT_STATES.MINIFIED) {
         onConfigChange({
            ...config,
            formatState: FORMAT_STATES.STANDARD,
            formatVersion: (config.formatVersion || 0) + 1,
         });
      }
      // Let the reformat effect run, then fold via a short delay
      setTimeout(() => {
         editorRef.current?.collapseAll();
      }, 50);
   };

   return (
      <div className="editor-panel-container w-full md:flex-1 md:basis-0 md:min-w-0">
         <Editor
            ref={editorRef}
            data={data}
            onChange={onDataChange}
            config={config}
            comparisonData={comparisonData}
            ariaLabel={panelLabel}
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
               <div className="editor-toolbar-content flex justify-between items-center w-full pl-2">
                  <div className="flex items-center">
                     {config.editorFormatOptions.includes(
                        FORMAT_STATES.MINIFIED
                     ) ? (
                        <JusifyButton
                           onClick={() =>
                              handleEditorFormatChange(FORMAT_STATES.MINIFIED)
                           }
                           title="Minify"
                           variant={isMinified ? 'default' : 'ghost'}
                        />
                     ) : null}
                     {config.editorFormatOptions.includes(
                        FORMAT_STATES.STANDARD
                     ) ? (
                        <BracesButton
                           onClick={() =>
                              handleEditorFormatChange(FORMAT_STATES.STANDARD)
                           }
                           title="Format"
                           variant={isStandard ? 'default' : 'ghost'}
                        />
                     ) : null}

                     {!isMinified && config.editorType === EDITOR_TYPES.text && (
                        <>
                           <ExpandButton
                              onClick={handleExpand}
                              title="Expand"
                              variant={isExpanded ? 'default' : 'ghost'}
                           />
                           <CollapseButton
                              onClick={handleCollapse}
                              title="Collapse"
                              variant={isCollapsed ? 'default' : 'ghost'}
                           />
                        </>
                     )}
                  </div>
                  <div className="flex items-center">
                     <SearchButton
                        onClick={handleSearchClick}
                        variant={config.searchOpen ? 'default' : 'ghost'}
                     />
                     <ImportButton
                        onImport={handleImport}
                        dataType="json"
                        onImportClick={handleImportClick}
                     />
                     <ExportButton data={data} />
                  </div>
               </div>
            </>
         </Editor>
      </div>
   );
}
