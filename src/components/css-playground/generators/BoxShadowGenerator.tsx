'use client';

import React, { useState, useMemo } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import {
   ControlSlider,
   ControlColor,
   ControlToggle,
   ControlGroup,
} from './GeneratorControls';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Shadow {
   x: number;
   y: number;
   blur: number;
   spread: number;
   color: string;
   inset: boolean;
}

const DEFAULT_SHADOW: Shadow = {
   x: 5,
   y: 5,
   blur: 15,
   spread: 0,
   color: '#7c3aed',
   inset: false,
};

export function BoxShadowGenerator() {
   const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT_SHADOW }]);
   const [boxColor, setBoxColor] = useState('#1e1b4b');
   const [boxRadius, setBoxRadius] = useState(16);
   const [boxSize, setBoxSize] = useState(160);
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const updateShadow = (
      index: number,
      key: keyof Shadow,
      value: number | string | boolean
   ) => {
      setShadows((prev) =>
         prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
      );
   };

   const addShadow = () => {
      setShadows((prev) => [
         ...prev,
         { x: 0, y: 8, blur: 25, spread: -5, color: '#3b82f6', inset: false },
      ]);
   };

   const removeShadow = (index: number) => {
      if (shadows.length > 1)
         setShadows((prev) => prev.filter((_, i) => i !== index));
   };

   const cssValue = useMemo(() => {
      return shadows
         .map(
            (s) =>
               `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
         )
         .join(',\n    ');
   }, [shadows]);

   const tailwindShadowValue = useMemo(() => {
      return shadows
         .map(
            (s) =>
               `${s.inset ? 'inset_' : ''}${s.x}px_${s.y}px_${s.blur}px_${s.spread}px_${s.color.replace(/\s+/g, '')}`
         )
         .join(',');
   }, [shadows]);

   const tailwind = `<div class="w-[${boxSize}px] h-[${boxSize}px] bg-[${boxColor}] rounded-[${boxRadius}px] shadow-[${tailwindShadowValue}]"></div>`;

   const css = `.box {\n  width: ${boxSize}px;\n  height: ${boxSize}px;\n  background: ${boxColor};\n  border-radius: ${boxRadius}px;\n  box-shadow:\n    ${cssValue};\n}`;

   const html = '<div class="box"></div>';

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0 overflow-y-auto md:overflow-hidden">
         {/* Controls */}
         <div className="w-full md:w-[320px] shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor
                  label="Background"
                  value={bodyBg}
                  onChange={setBodyBg}
               />
            </ControlGroup>

            <ControlGroup title="Box">
               <ControlSlider
                  label="Size"
                  value={boxSize}
                  onChange={setBoxSize}
                  min={60}
                  max={300}
                  unit="px"
               />
               <ControlSlider
                  label="Radius"
                  value={boxRadius}
                  onChange={setBoxRadius}
                  min={0}
                  max={150}
                  unit="px"
               />
               <ControlColor
                  label="Color"
                  value={boxColor}
                  onChange={setBoxColor}
               />
            </ControlGroup>

            {shadows.map((shadow, i) => (
               <ControlGroup key={i} title={`Shadow ${i + 1}`}>
                  <ControlSlider
                     label="Offset X"
                     value={shadow.x}
                     onChange={(v) => updateShadow(i, 'x', v)}
                     min={-50}
                     max={50}
                     unit="px"
                  />
                  <ControlSlider
                     label="Offset Y"
                     value={shadow.y}
                     onChange={(v) => updateShadow(i, 'y', v)}
                     min={-50}
                     max={50}
                     unit="px"
                  />
                  <ControlSlider
                     label="Blur"
                     value={shadow.blur}
                     onChange={(v) => updateShadow(i, 'blur', v)}
                     min={0}
                     max={100}
                     unit="px"
                  />
                  <ControlSlider
                     label="Spread"
                     value={shadow.spread}
                     onChange={(v) => updateShadow(i, 'spread', v)}
                     min={-50}
                     max={50}
                     unit="px"
                  />
                  <ControlColor
                     label="Color"
                     value={shadow.color}
                     onChange={(v) => updateShadow(i, 'color', v)}
                  />
                  <ControlToggle
                     label="Inset"
                     value={shadow.inset}
                     onChange={(v) => updateShadow(i, 'inset', v)}
                  />
                  {shadows.length > 1 && (
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive/70 hover:text-destructive w-full"
                        onClick={() => removeShadow(i)}
                     >
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                     </Button>
                  )}
               </ControlGroup>
            ))}

            <Button
               variant="outline"
               size="sm"
               className="w-full h-8 text-xs gap-1"
               onClick={addShadow}
            >
               <Plus className="h-3 w-3" /> Add Shadow
            </Button>
         </div>

         {/* Preview */}
         <div className="flex-1 min-h-[500px] md:min-h-0 w-full">
            <GeneratorPreview
               css={css}
               html={html}
               tailwind={tailwind}
               bodyBg={bodyBg}
               previewStyle={{ background: bodyBg }}
            />
         </div>
      </div>
   );
}
