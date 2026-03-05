'use client';

import React, { useState } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import { ControlSlider, ControlColor, ControlGroup } from './GeneratorControls';

export function TransformGenerator() {
   const [rotateX, setRotateX] = useState(0);
   const [rotateY, setRotateY] = useState(0);
   const [rotateZ, setRotateZ] = useState(0);
   const [scaleX, setScaleX] = useState(100);
   const [scaleY, setScaleY] = useState(100);
   const [skewX, setSkewX] = useState(0);
   const [skewY, setSkewY] = useState(0);
   const [translateX, setTranslateX] = useState(0);
   const [translateY, setTranslateY] = useState(0);
   const [perspective, setPerspective] = useState(800);
   const [bgColor, setBgColor] = useState('#7c3aed');
   const [boxSize, setBoxSize] = useState(140);
   const [radius, setRadius] = useState(16);
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const transforms = [
      rotateX !== 0 ? `rotateX(${rotateX}deg)` : '',
      rotateY !== 0 ? `rotateY(${rotateY}deg)` : '',
      rotateZ !== 0 ? `rotateZ(${rotateZ}deg)` : '',
      scaleX !== 100 || scaleY !== 100
         ? `scale(${(scaleX / 100).toFixed(2)}, ${(scaleY / 100).toFixed(2)})`
         : '',
      skewX !== 0 || skewY !== 0 ? `skew(${skewX}deg, ${skewY}deg)` : '',
      translateX !== 0 || translateY !== 0
         ? `translate(${translateX}px, ${translateY}px)`
         : '',
   ]
      .filter(Boolean)
      .join(' ');

   const transformValue = transforms || 'none';
   const tailwindTransform =
      transformValue !== 'none'
         ? ` [transform:${transformValue.replace(/ /g, '_')}]`
         : '';

   const tailwind = `<div class="flex items-center justify-center min-h-[350px] [perspective:${perspective}px]">
  <div class="w-[${boxSize}px] h-[${boxSize}px] bg-[${bgColor}] rounded-[${radius}px] flex items-center justify-center font-bold text-[14px] text-white/80 transition-[transform] duration-100 ease-out${tailwindTransform}">
    Transform
  </div>
</div>`;

   const css = `.scene {
  perspective: ${perspective}px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 350px;
}

.box {
  width: ${boxSize}px;
  height: ${boxSize}px;
  background: ${bgColor};
  border-radius: ${radius}px;
  transform: ${transformValue};
  transition: transform 0.1s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}`;

   const html = '<div class="scene"><div class="box">Transform</div></div>';

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0 overflow-y-auto md:overflow-hidden">
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
                  max={250}
                  unit="px"
               />
               <ControlSlider
                  label="Radius"
                  value={radius}
                  onChange={setRadius}
                  min={0}
                  max={125}
                  unit="px"
               />
               <ControlColor
                  label="Color"
                  value={bgColor}
                  onChange={setBgColor}
               />
            </ControlGroup>

            <ControlGroup title="Rotate">
               <ControlSlider
                  label="X"
                  value={rotateX}
                  onChange={setRotateX}
                  min={-180}
                  max={180}
                  unit="°"
               />
               <ControlSlider
                  label="Y"
                  value={rotateY}
                  onChange={setRotateY}
                  min={-180}
                  max={180}
                  unit="°"
               />
               <ControlSlider
                  label="Z"
                  value={rotateZ}
                  onChange={setRotateZ}
                  min={-180}
                  max={180}
                  unit="°"
               />
            </ControlGroup>

            <ControlGroup title="Scale">
               <ControlSlider
                  label="X"
                  value={scaleX}
                  onChange={setScaleX}
                  min={10}
                  max={200}
                  unit="%"
               />
               <ControlSlider
                  label="Y"
                  value={scaleY}
                  onChange={setScaleY}
                  min={10}
                  max={200}
                  unit="%"
               />
            </ControlGroup>

            <ControlGroup title="Skew">
               <ControlSlider
                  label="X"
                  value={skewX}
                  onChange={setSkewX}
                  min={-45}
                  max={45}
                  unit="°"
               />
               <ControlSlider
                  label="Y"
                  value={skewY}
                  onChange={setSkewY}
                  min={-45}
                  max={45}
                  unit="°"
               />
            </ControlGroup>

            <ControlGroup title="Translate">
               <ControlSlider
                  label="X"
                  value={translateX}
                  onChange={setTranslateX}
                  min={-100}
                  max={100}
                  unit="px"
               />
               <ControlSlider
                  label="Y"
                  value={translateY}
                  onChange={setTranslateY}
                  min={-100}
                  max={100}
                  unit="px"
               />
            </ControlGroup>

            <ControlGroup title="Perspective">
               <ControlSlider
                  label="Distance"
                  value={perspective}
                  onChange={setPerspective}
                  min={100}
                  max={2000}
                  unit="px"
               />
            </ControlGroup>
         </div>

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
