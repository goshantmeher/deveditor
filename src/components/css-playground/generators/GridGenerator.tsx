'use client';

import React, { useState } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import {
   ControlSlider,
   ControlSelect,
   ControlGroup,
   ControlColor,
} from './GeneratorControls';

const COLORS = [
   '#7c3aed',
   '#3b82f6',
   '#06b6d4',
   '#10b981',
   '#f59e0b',
   '#ef4444',
   '#ec4899',
   '#6366f1',
   '#14b8a6',
];

export function GridGenerator() {
   const [columns, setColumns] = useState(3);
   const [rows, setRows] = useState(3);
   const [gap, setGap] = useState(12);
   const [colUnit, setColUnit] = useState('1fr');
   const [rowUnit, setRowUnit] = useState('auto');
   const [itemSize, setItemSize] = useState(80);
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const totalItems = columns * rows;
   const clampedItems = Math.min(totalItems, 12);

   const css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, ${colUnit});
  grid-template-rows: repeat(${rows}, ${rowUnit === 'auto' ? 'auto' : rowUnit});
  gap: ${gap}px;
  padding: 20px;
  width: 100%;
}

.grid-item {
  ${rowUnit === 'auto' ? `min-height: ${itemSize}px;` : ''}
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  color: white;
  transition: transform 0.2s;
}
.grid-item:hover {
  transform: scale(1.05);
}`;

   const html = Array.from(
      { length: clampedItems },
      (_, i) =>
         `<div class="grid-item" style="background:${COLORS[i % COLORS.length]}">${i + 1}</div>`
   ).join('\n  ');

   const tailwind = `<div class="grid grid-cols-[repeat(${columns},_${colUnit.replace(' ', '_')})] grid-rows-[repeat(${rows},_${rowUnit === 'auto' ? 'auto' : rowUnit.replace(' ', '_')})] gap-[${gap}px] p-5 w-full">\n  <!-- items -->\n  <div class="rounded-xl flex items-center justify-center font-bold text-[13px] text-white ${rowUnit === 'auto' ? `min-h-[${itemSize}px]` : ''}">...</div>\n</div>`;

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0">
         <div className="md:w-[320px] shrink-0 overflow-y-auto border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor
                  label="Background"
                  value={bodyBg}
                  onChange={setBodyBg}
               />
            </ControlGroup>

            <ControlGroup title="Grid Container">
               <ControlSlider
                  label="Columns"
                  value={columns}
                  onChange={setColumns}
                  min={1}
                  max={6}
                  unit=""
               />
               <ControlSlider
                  label="Rows"
                  value={rows}
                  onChange={setRows}
                  min={1}
                  max={6}
                  unit=""
               />
               <ControlSlider
                  label="Gap"
                  value={gap}
                  onChange={setGap}
                  min={0}
                  max={40}
                  unit="px"
               />
            </ControlGroup>

            <ControlGroup title="Column Size">
               <ControlSelect
                  label="Unit"
                  value={colUnit}
                  onChange={setColUnit}
                  options={[
                     { value: '1fr', label: '1fr' },
                     { value: 'auto', label: 'Auto' },
                     { value: 'minmax(100px, 1fr)', label: 'Minmax' },
                     { value: '150px', label: '150px' },
                  ]}
               />
            </ControlGroup>

            <ControlGroup title="Row Size">
               <ControlSelect
                  label="Unit"
                  value={rowUnit}
                  onChange={setRowUnit}
                  options={[
                     { value: 'auto', label: 'Auto' },
                     { value: '1fr', label: '1fr' },
                     { value: '100px', label: '100px' },
                     { value: 'minmax(80px, auto)', label: 'Minmax' },
                  ]}
               />
               {rowUnit === 'auto' && (
                  <ControlSlider
                     label="Min Height"
                     value={itemSize}
                     onChange={setItemSize}
                     min={40}
                     max={200}
                     unit="px"
                  />
               )}
            </ControlGroup>
         </div>

         <div className="flex-1 min-h-0">
            <GeneratorPreview
               css={css}
               html={`<div class="grid-container">\n  ${html}\n</div>`}
               tailwind={tailwind}
               bodyBg={bodyBg}
               previewStyle={{ background: bodyBg }}
            />
         </div>
      </div>
   );
}
