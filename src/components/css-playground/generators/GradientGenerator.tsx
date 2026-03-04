'use client';

import React, { useState, useMemo } from 'react';
import { GeneratorPreview } from './GeneratorPreview';
import { ControlSlider, ControlColor, ControlSelect, ControlGroup } from './GeneratorControls';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColorStop {
   color: string;
   position: number;
}

export function GradientGenerator() {
   const [type, setType] = useState('linear');
   const [angle, setAngle] = useState(135);
   const [stops, setStops] = useState<ColorStop[]>([
      { color: '#7c3aed', position: 0 },
      { color: '#3b82f6', position: 50 },
      { color: '#06b6d4', position: 100 },
   ]);
   const [boxSize, setBoxSize] = useState(200);
   const [radius, setRadius] = useState(16);
   const [bodyBg, setBodyBg] = useState('#0f172a');

   const updateStop = (index: number, key: keyof ColorStop, value: string | number) => {
      setStops((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
   };

   const addStop = () => {
      setStops((prev) => [...prev, { color: '#10b981', position: 75 }]);
   };

   const removeStop = (index: number) => {
      if (stops.length > 2) setStops((prev) => prev.filter((_, i) => i !== index));
   };

   const gradientValue = useMemo(() => {
      const sortedStops = [...stops].sort((a, b) => a.position - b.position);
      const colorStops = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

      if (type === 'linear') return `linear-gradient(${angle}deg, ${colorStops})`;
      if (type === 'radial') return `radial-gradient(circle, ${colorStops})`;
      return `conic-gradient(from ${angle}deg, ${colorStops})`;
   }, [type, angle, stops]);

   const tailwind = `<div class="w-[${boxSize}px] h-[${boxSize}px] rounded-[${radius}px] bg-[${gradientValue.replace(/ /g, '_')}]"></div>`;

   const css = `.box {\n  width: ${boxSize}px;\n  height: ${boxSize}px;\n  border-radius: ${radius}px;\n  background: ${gradientValue};\n}`;
   const html = '<div class="box"></div>';

   return (
      <div className="flex flex-col md:flex-row h-full min-h-0">
         <div className="md:w-[320px] shrink-0 overflow-y-auto border-r border-border/30 p-4 space-y-4">
            <ControlGroup title="Preview">
               <ControlColor label="Background" value={bodyBg} onChange={setBodyBg} />
            </ControlGroup>

            <ControlGroup title="Gradient Type">
               <ControlSelect
                  label="Type"
                  value={type}
                  onChange={setType}
                  options={[
                     { value: 'linear', label: 'Linear' },
                     { value: 'radial', label: 'Radial' },
                     { value: 'conic', label: 'Conic' },
                  ]}
               />
               {(type === 'linear' || type === 'conic') && (
                  <ControlSlider label="Angle" value={angle} onChange={setAngle} min={0} max={360} unit="°" />
               )}
            </ControlGroup>

            <ControlGroup title="Box">
               <ControlSlider label="Size" value={boxSize} onChange={setBoxSize} min={60} max={350} unit="px" />
               <ControlSlider label="Radius" value={radius} onChange={setRadius} min={0} max={175} unit="px" />
            </ControlGroup>

            {stops.map((stop, i) => (
               <ControlGroup key={i} title={`Color Stop ${i + 1}`}>
                  <ControlColor label="Color" value={stop.color} onChange={(v) => updateStop(i, 'color', v)} />
                  <ControlSlider label="Position" value={stop.position} onChange={(v) => updateStop(i, 'position', v)} min={0} max={100} unit="%" />
                  {stops.length > 2 && (
                     <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive/70 hover:text-destructive w-full" onClick={() => removeStop(i)}>
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                     </Button>
                  )}
               </ControlGroup>
            ))}

            <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1" onClick={addStop}>
               <Plus className="h-3 w-3" /> Add Color Stop
            </Button>
         </div>

         <div className="flex-1 min-h-0">
            <GeneratorPreview css={css} html={html} tailwind={tailwind} bodyBg={bodyBg} previewStyle={{ background: bodyBg }} />
         </div>
      </div>
   );
}
