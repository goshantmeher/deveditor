'use client';
import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { useTheme } from 'next-themes';
import { css } from '@codemirror/lang-css';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';

interface CssEditorProps {
   value: string;
   onChange: (value: string) => void;
   ariaLabel?: string;
}

export function CssEditor({ value, onChange, ariaLabel }: CssEditorProps) {
   const { theme } = useTheme();
   const [mounted, setMounted] = React.useState(false);

   React.useEffect(() => {
      setMounted(true);
   }, []);

   const extensions = useMemo(() => {
      const themeExtension = theme === 'dark' ? vscodeDark : vscodeLight;
      return [
         css(),
         EditorView.lineWrapping,
         themeExtension,
         EditorView.theme({
            '&': {
               height: '100%',
               fontSize: '13px',
            },
            '.cm-scroller': {
               overflow: 'auto',
               fontFamily: 'var(--font-geist-mono), monospace',
            },
            '.cm-gutters': {
               border: 'none',
               backgroundColor: 'transparent',
            },
         }),
      ];
   }, [theme]);

   if (!mounted) {
      return null;
   }

   return (
      <div className="h-full w-full" role="region" aria-label={ariaLabel || 'CSS Editor'}>
         <CodeMirror
            value={value}
            onChange={onChange}
            extensions={extensions}
            theme="none"
            basicSetup={{
               lineNumbers: true,
               foldGutter: true,
               bracketMatching: true,
               closeBrackets: true,
               autocompletion: true,
               highlightActiveLine: true,
               highlightActiveLineGutter: true,
               indentOnInput: true,
            }}
            height="100%"
            style={{ height: '100%' }}
         />
      </div>
   );
}
