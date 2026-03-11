'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface ControlSliderProps {
   label: string;
   value: number;
   onChange: (value: number) => void;
   min: number;
   max: number;
   step?: number;
   unit?: string;
}

export function ControlSlider({ label, value, onChange, min, max, step = 1, unit = 'px' }: ControlSliderProps) {
   return (
      <div className="flex flex-col gap-2.5">
         <div className="flex items-center justify-between">
            <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
            <span className="text-[10px] font-mono font-bold text-primary/70 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
               {value}
               {unit}
            </span>
         </div>
         <Slider
            value={[value]}
            onValueChange={([val]) => onChange(val)}
            min={min}
            max={max}
            step={step}
            className="py-1"
         />
      </div>
   );
}

interface ControlColorProps {
   label: string;
   value: string;
   onChange: (value: string) => void;
}

export function ControlColor({ label, value, onChange }: ControlColorProps) {
   return (
      <div className="flex items-center justify-between">
         <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded uppercase tracking-tighter">
               {value}
            </span>
            <input
               type="color"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className="w-6 h-6 rounded-md border border-border/50 cursor-pointer bg-transparent p-0
                  [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-[5px] [&::-webkit-color-swatch]:border-0
                  [&::-moz-color-swatch]:rounded-[5px] [&::-moz-color-swatch]:border-0"
            />
         </div>
      </div>
   );
}

interface ControlToggleProps {
   label: string;
   value: boolean;
   onChange: (value: boolean) => void;
}

export function ControlToggle({ label, value, onChange }: ControlToggleProps) {
   return (
      <div className="flex items-center justify-between">
         <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
         <Switch checked={value} onCheckedChange={onChange} />
      </div>
   );
}

interface ControlSelectProps {
   label: string;
   value: string;
   onChange: (value: string) => void;
   options: { value: string; label: string }[];
}

export function ControlSelect({ label, value, onChange, options }: ControlSelectProps) {
   return (
      <div className="flex flex-col gap-1.5">
         <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
         <div className="flex flex-wrap gap-1">
            {options.map((opt) => (
               <button
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  className={`px-2 py-1 rounded-md text-xs transition-colors ${
                     value === opt.value
                        ? 'bg-primary/15 text-primary font-medium border border-primary/30'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-transparent'
                  }`}
               >
                  {opt.label}
               </button>
            ))}
         </div>
      </div>
   );
}

interface ControlGroupProps {
   title: string;
   children: React.ReactNode;
}

export function ControlGroup({ title, children }: ControlGroupProps) {
   return (
      <div className="space-y-3">
         <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider border-b border-border/20 pb-1">
            {title}
         </h4>
         <div className="space-y-3">{children}</div>
      </div>
   );
}

interface ControlInputProps {
   label: string;
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
}

export function ControlInput({ label, value, onChange, placeholder }: ControlInputProps) {
   return (
      <div className="flex flex-col gap-1.5">
         <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
         <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-8 text-xs px-2"
         />
      </div>
   );
}
