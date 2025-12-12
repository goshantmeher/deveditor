'use client';
import React from 'react';
import { JsonEditor } from 'json-edit-react';

interface JSONEditorProps {
   data: unknown;
   ariaLabel?: string;
}

function JSONEditor({ data, ariaLabel }: JSONEditorProps) {
   return (
      <div
         role="tree"
         aria-label={ariaLabel || 'JSON tree editor'}
         className="json-tree-editor-container w-full h-full"
      >
         <JsonEditor data={data} className="w-full h-full" maxWidth={'100%'} />
      </div>
   );
}

export default JSONEditor;
