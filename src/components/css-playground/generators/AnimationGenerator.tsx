'use client';

import React, { useState } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import { ControlSlider, ControlSelect, ControlGroup, ControlColor } from './GeneratorControls';

const KEYFRAME_PRESETS = {
   pulse: `@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}`,
   bounce: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25px); }
}`,
   spin: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
   wiggle: `@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}`,
   fade: `@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`,
   flip: `@keyframes flip {
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(360deg); }
}`,
};

export function AnimationGenerator() {
   const [animationName, setAnimationName] = useState<keyof typeof KEYFRAME_PRESETS>('pulse');
   const [duration, setDuration] = useState(2);
   const [delay, setDelay] = useState(0);
   const [iterationCount, setIterationCount] = useState('infinite');
   const [timingFunction, setTimingFunction] = useState('ease-in-out');
   const [direction, setDirection] = useState('normal');
   
   const [boxSize, setBoxSize] = useState(120);
   const [radius, setRadius] = useState(16);
   const [bgColor, setBgColor] = useState('#7c3aed');
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const css = `${KEYFRAME_PRESETS[animationName]}

.box {
  width: ${boxSize}px;
  height: ${boxSize}px;
  background: ${bgColor};
  border-radius: ${radius}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  
  animation-name: ${animationName};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
  animation-direction: ${direction};
}`;

   const html = `<div class="box">Animate</div>`;

   const tailwind = `<!-- Note: You need to add the @keyframes ${animationName} to your global CSS first -->
<div class="flex items-center justify-center w-[${boxSize}px] h-[${boxSize}px] bg-[${bgColor}] rounded-[${radius}px] font-bold text-[14px] text-white/90 [animation:${animationName}_${duration}s_${timingFunction}_${delay}s_${iterationCount}_${direction}]">
  Animate
</div>`;

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0">
         <div className="md:w-[320px] shrink-0 overflow-y-auto border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor label="Background" value={bodyBg} onChange={setBodyBg} />
            </ControlGroup>
            
            <ControlGroup title="Animation Options">
               <ControlSelect 
                  label="Name (Keyframes)" 
                  value={animationName} 
                  onChange={(v) => setAnimationName(v as keyof typeof KEYFRAME_PRESETS)} 
                  options={[
                     { value: 'pulse', label: 'Pulse' },
                     { value: 'bounce', label: 'Bounce' },
                     { value: 'spin', label: 'Spin' },
                     { value: 'wiggle', label: 'Wiggle' },
                     { value: 'fade', label: 'Fade' },
                     { value: 'flip', label: 'Flip' },
                  ]} 
               />
               
               <ControlSlider label="Duration" value={duration} onChange={setDuration} min={0.1} max={10} step={0.1} unit="s" />
               <ControlSlider label="Delay" value={delay} onChange={setDelay} min={0} max={5} step={0.1} unit="s" />
               
               <ControlSelect 
                  label="Timing Function (Easing)" 
                  value={timingFunction} 
                  onChange={setTimingFunction} 
                  options={[
                     { value: 'linear', label: 'Linear' },
                     { value: 'ease', label: 'Ease' },
                     { value: 'ease-in', label: 'Ease In' },
                     { value: 'ease-out', label: 'Ease Out' },
                     { value: 'ease-in-out', label: 'Ease In Out' },
                  ]} 
               />
               
               <ControlSelect 
                  label="Iteration Count" 
                  value={iterationCount} 
                  onChange={setIterationCount} 
                  options={[
                     { value: '1', label: '1' },
                     { value: '2', label: '2' },
                     { value: '3', label: '3' },
                     { value: 'infinite', label: 'Infinite' },
                  ]} 
               />
               
               <ControlSelect 
                  label="Direction" 
                  value={direction} 
                  onChange={setDirection} 
                  options={[
                     { value: 'normal', label: 'Normal' },
                     { value: 'reverse', label: 'Reverse' },
                     { value: 'alternate', label: 'Alternate' },
                     { value: 'alternate-reverse', label: 'Alt Reverse' },
                  ]} 
               />
            </ControlGroup>

            <ControlGroup title="Element">
               <ControlSlider label="Size" value={boxSize} onChange={setBoxSize} min={40} max={250} unit="px" />
               <ControlSlider label="Radius" value={radius} onChange={setRadius} min={0} max={125} unit="px" />
               <ControlColor label="Color" value={bgColor} onChange={setBgColor} />
            </ControlGroup>
         </div>

         <div className="flex-1 min-h-0">
            <GeneratorPreview css={css} html={html} tailwind={tailwind} bodyBg={bodyBg} previewStyle={{ background: bodyBg }} />
         </div>
      </div>
   );
}
