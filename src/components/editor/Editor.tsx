import React from 'react';
import JSONEditor from './json-editor';
import TextEditor, { EditorHandle } from './text-editor';
import { EDITOR_TYPES } from '@/constants/editor';
import { EditorConfig } from '@/types/editor';

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

const Editor = React.forwardRef<EditorHandle | null, EditorProps>(function Editor(
   { data, onChange, config, children, comparisonData, searchPanel, ariaLabel },
   ref
) {
   const [internalErrorPanel, setInternalErrorPanel] = React.useState<React.ReactNode>(null);
   const searchPanelRef = React.useRef<HTMLDivElement>(null);
   const errorPanelRef = React.useRef<HTMLDivElement>(null);
   const textEditorRef = React.useRef<EditorHandle>(null);

   // Forward the ref from TextEditor
   React.useImperativeHandle(
      ref,
      () =>
         textEditorRef.current || {
            expandAll: () => {},
            collapseAll: () => {},
         },
      []
   );

   React.useEffect(() => {
      // Keep refs to avoid errors but heights aren't strictly needed for flex layout
   }, [searchPanel]);

   React.useEffect(() => {
      // Keep refs to avoid errors but heights aren't strictly needed for flex layout
   }, [internalErrorPanel]);

   return (
      <div className="flex flex-col flex-1 min-h-0 w-full">
         <div className="editor-toolbar shrink-0 w-full h-10 flex pl-2 pr-2 items-center bg-card border-b border-border">
            {children}
         </div>
         {searchPanel && (
            <div ref={searchPanelRef} className="shrink-0">
               {searchPanel}
            </div>
         )}
         {internalErrorPanel && (
            <div ref={errorPanelRef} className="shrink-0">
               {internalErrorPanel}
            </div>
         )}
         <div className="editor-content-wrapper flex-1 min-h-0 relative">
            <div className="absolute inset-0 overflow-auto">
               {config.editorType === EDITOR_TYPES.json && <JSONEditor data={data} ariaLabel={ariaLabel} />}

               {config.editorType === EDITOR_TYPES.text && (
                  <TextEditor
                     ref={textEditorRef}
                     data={data}
                     onChange={onChange}
                     config={config}
                     comparisonData={comparisonData}
                     onErrorPanelChange={setInternalErrorPanel}
                     ariaLabel={ariaLabel}
                  />
               )}
            </div>
         </div>
      </div>
   );
});

export default Editor;
