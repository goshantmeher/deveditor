'use client';

import React, { useState } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import {
   ControlSlider,
   ControlColor,
   ControlToggle,
   ControlGroup,
} from './GeneratorControls';

export function BorderRadiusGenerator() {
   const [linked, setLinked] = useState(true);
   const [all, setAll] = useState(20);
   const [topLeft, setTopLeft] = useState(20);
   const [topRight, setTopRight] = useState(20);
   const [bottomRight, setBottomRight] = useState(20);
   const [bottomLeft, setBottomLeft] = useState(20);
   const [width, setWidth] = useState(180);
   const [height, setHeight] = useState(180);
   const [bgColor, setBgColor] = useState('#7c3aed');
   const [borderWidth, setBorderWidth] = useState(0);
   const [borderColor, setBorderColor] = useState('#a78bfa');
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const handleAllChange = (v: number) => {
      setAll(v);
      if (linked) {
         setTopLeft(v);
         setTopRight(v);
         setBottomRight(v);
         setBottomLeft(v);
      }
   };

   const radiusValue = linked
      ? `${all}px`
      : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

   const tailwindClasses = linked
      ? `rounded-[${all}px]`
      : `rounded-tl-[${topLeft}px] rounded-tr-[${topRight}px] rounded-br-[${bottomRight}px] rounded-bl-[${bottomLeft}px]`;

   const borderClasses =
      borderWidth > 0
         ? ` border-[${borderWidth}px] border-[${borderColor}]`
         : '';

   const tailwind = `<div class="w-[${width}px] h-[${height}px] bg-[${bgColor}] ${tailwindClasses}${borderClasses}"></div>`;

   const css = `.box {
  width: ${width}px;
  height: ${height}px;
  background: ${bgColor};
  border-radius: ${radiusValue};${borderWidth > 0 ? `\n  border: ${borderWidth}px solid ${borderColor};` : ''}
}`;

   const html = '<div class="box"></div>';

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

            <ControlGroup title="Box">
               <ControlSlider
                  label="Width"
                  value={width}
                  onChange={setWidth}
                  min={40}
                  max={350}
                  unit="px"
               />
               <ControlSlider
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  min={40}
                  max={350}
                  unit="px"
               />
               <ControlColor
                  label="Background"
                  value={bgColor}
                  onChange={setBgColor}
               />
            </ControlGroup>

            <ControlGroup title="Border Radius">
               <ControlToggle
                  label="Link All Corners"
                  value={linked}
                  onChange={setLinked}
               />
               {linked ? (
                  <ControlSlider
                     label="All Corners"
                     value={all}
                     onChange={handleAllChange}
                     min={0}
                     max={200}
                     unit="px"
                  />
               ) : (
                  <>
                     <ControlSlider
                        label="Top Left"
                        value={topLeft}
                        onChange={setTopLeft}
                        min={0}
                        max={200}
                        unit="px"
                     />
                     <ControlSlider
                        label="Top Right"
                        value={topRight}
                        onChange={setTopRight}
                        min={0}
                        max={200}
                        unit="px"
                     />
                     <ControlSlider
                        label="Bottom Right"
                        value={bottomRight}
                        onChange={setBottomRight}
                        min={0}
                        max={200}
                        unit="px"
                     />
                     <ControlSlider
                        label="Bottom Left"
                        value={bottomLeft}
                        onChange={setBottomLeft}
                        min={0}
                        max={200}
                        unit="px"
                     />
                  </>
               )}
            </ControlGroup>

            <ControlGroup title="Border Options">
               <ControlSlider
                  label="Border Width"
                  value={borderWidth}
                  onChange={setBorderWidth}
                  min={0}
                  max={20}
                  unit="px"
               />
               {borderWidth > 0 && (
                  <ControlColor
                     label="Border Color"
                     value={borderColor}
                     onChange={setBorderColor}
                  />
               )}
            </ControlGroup>
         </div>

         <div className="flex-1 min-h-0">
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
