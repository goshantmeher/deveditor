'use client';

import React from 'react';

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
      <div className="flex flex-col gap-1">
         <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">{label}</label>
            <span className="text-xs font-mono text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded">
               {value}
               {unit}
            </span>
         </div>
         <div className="relative flex items-center h-4">
            {/* The visible baseline track */}
            <div className="absolute left-0 right-0 h-1 bg-border/50 rounded-full pointer-events-none" />

            {/* The active progress track (optional, could just be the thumb, but makes it look better) */}
            <div
               className="absolute left-0 h-1 bg-primary/40 rounded-full pointer-events-none"
               style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            />

            <input
               type="range"
               min={min}
               max={max}
               step={step}
               value={value}
               onChange={(e) => onChange(Number(e.target.value))}
               className="w-full h-full bg-transparent appearance-none cursor-pointer absolute z-10 m-0 p-0 outline-none
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(124,58,237,0.4)]
                  [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_0_10px_rgba(124,58,237,0.6)]
                  [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:border-0"
            />
         </div>
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
         <label className="text-xs font-medium text-muted-foreground">{label}</label>
         <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{value}</span>
            <input
               type="color"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className="w-7 h-7 rounded-lg border border-border/50 cursor-pointer bg-transparent p-0.5
                  [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0
                  [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
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
         <label className="text-xs font-medium text-muted-foreground">{label}</label>
         <button
            onClick={() => onChange(!value)}
            className={`relative w-9 h-5 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-muted'}`}
         >
            <span
               className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                  value ? 'translate-x-4' : 'translate-x-0'
               }`}
            />
         </button>
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
      <div className="flex flex-col gap-1">
         <label className="text-xs font-medium text-muted-foreground">{label}</label>
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
