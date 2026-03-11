'use client';

import React, { useState, useEffect } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import { ControlSlider, ControlSelect, ControlGroup, ControlColor, ControlInput } from './GeneratorControls';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#7c3aed', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

export function FlexboxGenerator() {
   const [direction, setDirection] = useState('row');
   const [wrap, setWrap] = useState('wrap');
   const [justifyContent, setJustifyContent] = useState('center');
   const [alignItems, setAlignItems] = useState('center');
   const [gap, setGap] = useState(12);
   const [itemCount, setItemCount] = useState(5);
   const [itemSize, setItemSize] = useState(60);
   const [bodyBg, setBodyBg] = useState('#0f172a');
   const [containerWidth, setContainerWidth] = useState('600px');
   const [containerHeight, setContainerHeight] = useState('260px');
   const [containerBorder, setContainerBorder] = useState('2px dashed #475569');

   // Set a sensible default width based on actual screen size
   useEffect(() => {
      setContainerWidth(window.innerWidth < 768 ? '320px' : '600px');
   }, []);

   const addItem = () => setItemCount((c) => Math.min(c + 1, 12));
   const removeItem = () => setItemCount((c) => Math.max(c - 1, 1));

   const justifyClass =
      {
         'flex-start': 'justify-start',
         'flex-end': 'justify-end',
         center: 'justify-center',
         'space-between': 'justify-between',
         'space-around': 'justify-around',
         'space-evenly': 'justify-evenly',
      }[justifyContent] || 'justify-start';

   const alignClass =
      {
         'flex-start': 'items-start',
         'flex-end': 'items-end',
         center: 'items-center',
         stretch: 'items-stretch',
         baseline: 'items-baseline',
      }[alignItems] || 'items-stretch';

   const tailwind = `<div class="flex flex-${direction === 'column' ? 'col' : direction === 'row' ? 'row' : direction.replace('column', 'col')} ${wrap === 'nowrap' ? 'flex-nowrap' : wrap === 'wrap' ? 'flex-wrap' : 'flex-wrap-reverse'} ${justifyClass} ${alignClass} gap-[${gap}px] p-5" style="width: ${containerWidth}; height: ${containerHeight}; border: ${containerBorder};">\n  <!-- items -->\n  <div class="h-[${itemSize}px] w-[${itemSize}px] rounded-xl flex items-center justify-center font-bold text-sm text-white">...</div>\n</div>`;

   const css = `.container {
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
  padding: 20px;
  width: ${containerWidth};
  height: ${containerHeight};
  border: ${containerBorder};
  overflow: auto;
}

.item {
  width: ${itemSize}px;
  height: ${itemSize}px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: white;
  transition: transform 0.2s;
}
.item:hover {
  transform: scale(1.1);
}`;

   const html = Array.from(
      { length: itemCount },
      (_, i) => `<div class="item" style="background:${COLORS[i % COLORS.length]}">${i + 1}</div>`
   ).join('\n  ');

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0 overflow-y-auto md:overflow-hidden">
         <div className="w-full md:w-[320px] shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor label="Background" value={bodyBg} onChange={setBodyBg} />
            </ControlGroup>

            <ControlGroup title="Container Properties">
               <ControlInput label="Width" value={containerWidth} onChange={setContainerWidth} placeholder="100%, 300px..." />
               <ControlInput label="Height" value={containerHeight} onChange={setContainerHeight} placeholder="300px, 100vh..." />
               <ControlInput label="Border" value={containerBorder} onChange={setContainerBorder} placeholder="2px dashed #ccc" />
            </ControlGroup>

            <ControlGroup title="Flex Properties">
               <ControlSelect
                  label="Direction"
                  value={direction}
                  onChange={setDirection}
                  options={[
                     { value: 'row', label: 'Row' },
                     { value: 'row-reverse', label: 'Row Reverse' },
                     { value: 'column', label: 'Column' },
                     { value: 'column-reverse', label: 'Col Reverse' },
                  ]}
               />
               <ControlSelect
                  label="Wrap"
                  value={wrap}
                  onChange={setWrap}
                  options={[
                     { value: 'nowrap', label: 'No Wrap' },
                     { value: 'wrap', label: 'Wrap' },
                     { value: 'wrap-reverse', label: 'Wrap Reverse' },
                  ]}
               />
               <ControlSelect
                  label="Justify Content"
                  value={justifyContent}
                  onChange={setJustifyContent}
                  options={[
                     { value: 'flex-start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'flex-end', label: 'End' },
                     { value: 'space-between', label: 'Space Between' },
                     { value: 'space-around', label: 'Space Around' },
                     { value: 'space-evenly', label: 'Space Evenly' },
                  ]}
               />
               <ControlSelect
                  label="Align Items"
                  value={alignItems}
                  onChange={setAlignItems}
                  options={[
                     { value: 'stretch', label: 'Stretch' },
                     { value: 'flex-start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'flex-end', label: 'End' },
                     { value: 'baseline', label: 'Baseline' },
                  ]}
               />
               <ControlSlider label="Gap" value={gap} onChange={setGap} min={0} max={64} unit="px" />
            </ControlGroup>

            <ControlGroup title="Flex Items">
               <ControlSlider label="Count" value={itemCount} onChange={setItemCount} min={1} max={12} unit="" />
               <ControlSlider label="Size" value={itemSize} onChange={setItemSize} min={20} max={150} unit="px" />
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1" onClick={addItem}>
                     <Plus className="h-3 w-3" /> Add
                  </Button>
                  {itemCount > 1 && (
                     <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-8 text-xs text-destructive hover:text-destructive"
                        onClick={removeItem}
                     >
                        <Trash2 className="h-3 w-3" /> Remove
                     </Button>
                  )}
               </div>
            </ControlGroup>
         </div>

         <div className="flex-1 min-h-[500px] md:min-h-0 w-full">
            <GeneratorPreview
               css={css}
               html={`<div class="container">\n  ${html}\n</div>`}
               tailwind={tailwind}
               bodyBg={bodyBg}
               previewStyle={{ background: bodyBg }}
            />
         </div>
      </div>
   );
}
