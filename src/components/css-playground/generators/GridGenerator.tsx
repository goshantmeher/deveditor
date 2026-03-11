'use client';

import React, { useState, useEffect } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import { ControlSlider, ControlSelect, ControlGroup, ControlColor, ControlInput } from './GeneratorControls';

const COLORS = ['#7c3aed', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6'];

export function GridGenerator() {
   // Container
   const [columns, setColumns] = useState(3);
   const [rows, setRows] = useState(3);
   const [gap, setGap] = useState(12);
   const [colUnit, setColUnit] = useState('1fr');
   const [rowUnit, setRowUnit] = useState('auto');
   const [bodyBg, setBodyBg] = useState('#0f172a');
   const [containerWidth, setContainerWidth] = useState('600px');
   const [containerHeight, setContainerHeight] = useState('308px');
   const [containerBorder, setContainerBorder] = useState('2px dashed #475569');

   // Alignment
   const [justifyItems, setJustifyItems] = useState('stretch');
   const [alignItems, setAlignItems] = useState('stretch');
   const [justifyContent, setJustifyContent] = useState('start');
   const [alignContent, setAlignContent] = useState('start');
   const [autoFlow, setAutoFlow] = useState('row');

   // Items
   const [itemMinHeight, setItemMinHeight] = useState(80);
   const [itemRadius, setItemRadius] = useState(12);

   // Set a sensible default width based on actual screen size
   useEffect(() => {
      setContainerWidth(window.innerWidth < 768 ? '320px' : '600px');
   }, []);

   const totalItems = columns * rows;

   const css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, ${colUnit});
  grid-template-rows: repeat(${rows}, ${rowUnit === 'auto' ? 'auto' : rowUnit});
  gap: ${gap}px;
  padding: 20px;
  width: ${containerWidth};
  height: ${containerHeight};
  border: ${containerBorder};
  overflow: auto;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  align-content: ${alignContent};
  grid-auto-flow: ${autoFlow};
}

.grid-item {
  ${rowUnit === 'auto' ? `min-height: ${itemMinHeight}px;` : ''}
  border-radius: ${itemRadius}px;
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
      { length: totalItems },
      (_, i) => `<div class="grid-item" style="background:${COLORS[i % COLORS.length]}">${i + 1}</div>`
   ).join('\n  ');

   const tailwind = `<div class="grid grid-cols-[repeat(${columns},_${colUnit.replace(' ', '_')})] grid-rows-[repeat(${rows},_${rowUnit === 'auto' ? 'auto' : rowUnit.replace(' ', '_')})] gap-[${gap}px] p-5 [justify-items:${justifyItems}] [align-items:${alignItems}] [justify-content:${justifyContent}] [align-content:${alignContent}] [grid-auto-flow:${autoFlow}]" style="width: ${containerWidth}; height: ${containerHeight}; border: ${containerBorder};">\n  <!-- items -->\n  <div class="flex items-center justify-center font-bold text-[13px] text-white ${rowUnit === 'auto' ? `min-h-[${itemMinHeight}px]` : ''}" style="border-radius:${itemRadius}px">...</div>\n</div>`;

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0 overflow-y-auto md:overflow-hidden">
         <div className="w-full md:w-[320px] shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor label="Background" value={bodyBg} onChange={setBodyBg} />
            </ControlGroup>

            <ControlGroup title="Container">
               <ControlInput label="Width" value={containerWidth} onChange={setContainerWidth} placeholder="100%, 300px..." />
               <ControlInput label="Height" value={containerHeight} onChange={setContainerHeight} placeholder="300px, 100vh..." />
               <ControlInput label="Border" value={containerBorder} onChange={setContainerBorder} placeholder="2px dashed #ccc" />
            </ControlGroup>

            <ControlGroup title="Grid Structure">
               <ControlSlider label="Columns" value={columns} onChange={setColumns} min={1} max={6} unit="" />
               <ControlSlider label="Rows" value={rows} onChange={setRows} min={1} max={6} unit="" />
               <ControlSlider label="Gap" value={gap} onChange={setGap} min={0} max={40} unit="px" />
               <ControlSelect
                  label="Auto Flow"
                  value={autoFlow}
                  onChange={setAutoFlow}
                  options={[
                     { value: 'row', label: 'Row' },
                     { value: 'column', label: 'Column' },
                     { value: 'row dense', label: 'Row Dense' },
                     { value: 'column dense', label: 'Col Dense' },
                  ]}
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
                     value={itemMinHeight}
                     onChange={setItemMinHeight}
                     min={40}
                     max={200}
                     unit="px"
                  />
               )}
            </ControlGroup>

            <ControlGroup title="Alignment — Items">
               <ControlSelect
                  label="Justify Items"
                  value={justifyItems}
                  onChange={setJustifyItems}
                  options={[
                     { value: 'stretch', label: 'Stretch' },
                     { value: 'start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'end', label: 'End' },
                  ]}
               />
               <ControlSelect
                  label="Align Items"
                  value={alignItems}
                  onChange={setAlignItems}
                  options={[
                     { value: 'stretch', label: 'Stretch' },
                     { value: 'start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'end', label: 'End' },
                  ]}
               />
            </ControlGroup>

            <ControlGroup title="Alignment — Content">
               <ControlSelect
                  label="Justify Content"
                  value={justifyContent}
                  onChange={setJustifyContent}
                  options={[
                     { value: 'start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'end', label: 'End' },
                     { value: 'space-between', label: 'Space Between' },
                     { value: 'space-around', label: 'Space Around' },
                     { value: 'space-evenly', label: 'Space Evenly' },
                  ]}
               />
               <ControlSelect
                  label="Align Content"
                  value={alignContent}
                  onChange={setAlignContent}
                  options={[
                     { value: 'start', label: 'Start' },
                     { value: 'center', label: 'Center' },
                     { value: 'end', label: 'End' },
                     { value: 'space-between', label: 'Space Between' },
                     { value: 'space-around', label: 'Space Around' },
                     { value: 'space-evenly', label: 'Space Evenly' },
                  ]}
               />
            </ControlGroup>

            <ControlGroup title="Item Style">
               <ControlSlider label="Border Radius" value={itemRadius} onChange={setItemRadius} min={0} max={50} unit="px" />
            </ControlGroup>
         </div>

         <div className="flex-1 min-h-[500px] md:min-h-0 w-full">
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
