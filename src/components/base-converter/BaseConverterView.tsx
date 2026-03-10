'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Copy, CheckCircle2, FlaskConical, RotateCcw, Hash, Binary, SquareTerminal, Octagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

type Base = 2 | 8 | 10 | 16;

interface BaseConverterState {
   inputValue: string;
   inputBase: Base;
}

interface BaseCardProps {
   label: string;
   value: string;
   base: Base;
   icon: React.ElementType;
   accentClass: string;
   placeholder: string;
   currentInputBase: Base;
   currentInputValue: string;
   currentError: string | null;
   copiedBase: Base | null;
   onInputChange: (value: string, base: Base) => void;
   onCopy: (val: string, base: Base) => void;
}

const DEFAULT_STATE: BaseConverterState = {
   inputValue: '42',
   inputBase: 10,
};

const BaseCard = ({
   label,
   value,
   base,
   icon: Icon,
   accentClass,
   placeholder,
   currentInputBase,
   currentInputValue,
   currentError,
   copiedBase,
   onInputChange,
   onCopy,
}: BaseCardProps) => {
   const isInput = currentInputBase === base;
   const displayValue = isInput ? currentInputValue : value;

   return (
      <div
         className={`p-6 rounded-3xl bg-muted/20 border-2 transition-all duration-300 ${
            isInput
               ? `border-${accentClass}/50 shadow-lg shadow-${accentClass}/5`
               : 'border-border hover:border-border/80'
         }`}
      >
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-2xl bg-${accentClass}/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${accentClass}`} />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-foreground">{label}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Base {base}</p>
               </div>
            </div>
            <Button
               variant="ghost"
               size="icon"
               className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground"
               onClick={() => onCopy(displayValue, base)}
               disabled={!displayValue || (isInput && !!currentError)}
            >
               {copiedBase === base ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </Button>
         </div>
         <Input
            value={displayValue}
            onChange={(e) => onInputChange(e.target.value, base)}
            className={`font-mono text-lg bg-background border-none shadow-inner focus-visible:ring-1 focus-visible:ring-${accentClass}/30 transition-shadow ${
               isInput && currentError ? 'text-rose-400' : 'text-foreground'
            }`}
            placeholder={placeholder}
         />
         {isInput && currentError && (
            <p className="mt-2 text-[11px] text-rose-500 font-medium animate-in fade-in slide-in-from-top-1">
               {currentError}
            </p>
         )}
      </div>
   );
};

export function BaseConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<BaseConverterState>(DEFAULT_STATE);
   const [copiedBase, setCopiedBase] = useState<Base | null>(null);

   // Derived values
   const [values, setValues] = useState({
      bin: '',
      oct: '',
      dec: '',
      hex: '',
   });
   const [error, setError] = useState<string | null>(null);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.BASE_CONVERTER_INPUT);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.BASE_CONVERTER_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Update derived values on change
   useEffect(() => {
      if (!state.inputValue.trim()) {
         setValues({ bin: '', oct: '', dec: '', hex: '' });
         setError(null);
         return;
      }

      try {
         let decimalValue: bigint;
         const cleanValue = state.inputValue.trim();

         switch (state.inputBase) {
            case 2:
               if (!/^[01]+$/.test(cleanValue)) throw new Error('Invalid binary format');
               decimalValue = BigInt('0b' + cleanValue);
               break;
            case 8:
               if (!/^[0-7]+$/.test(cleanValue)) throw new Error('Invalid octal format');
               decimalValue = BigInt('0o' + cleanValue);
               break;
            case 10:
               if (!/^-?\d+$/.test(cleanValue)) throw new Error('Invalid decimal format');
               decimalValue = BigInt(cleanValue);
               break;
            case 16:
               if (!/^[0-9a-fA-F]+$/.test(cleanValue)) throw new Error('Invalid hex format');
               decimalValue = BigInt('0x' + cleanValue);
               break;
            default:
               throw new Error('Unsupported base');
         }

         setValues({
            bin: decimalValue.toString(2),
            oct: decimalValue.toString(8),
            dec: decimalValue.toString(10),
            hex: decimalValue.toString(16).toUpperCase(),
         });
         setError(null);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Invalid input');
      }
   }, [state]);

   const handleInputChange = (value: string, base: Base) => {
      setState({ inputValue: value, inputBase: base });
   };

   const handleClear = () => {
      setState({ inputValue: '', inputBase: 10 });
   };

   const handleSample = () => {
      setState({ inputValue: '255', inputBase: 10 });
   };

   const copyValue = async (val: string, base: Base) => {
      if (!val) return;
      try {
         await navigator.clipboard.writeText(val);
         setCopiedBase(base);
         setTimeout(() => setCopiedBase(null), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border overflow-hidden">
         {/* Toolbar */}
         <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <RefreshCcw className="w-4 h-4 text-indigo-500" />
               </div>
               <h1 className="font-bold text-sm tracking-tight">Number Base Converter</h1>
            </div>
            <div className="flex gap-2">
               {!state.inputValue && (
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                     onClick={handleSample}
                  >
                     <FlaskConical className="w-3.5 h-3.5" /> Sample
                  </Button>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={handleClear}
               >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
               </Button>
            </div>
         </div>

         {/* Grid Content */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BaseCard
                     label="Decimal"
                     value={values.dec}
                     base={10}
                     icon={Hash}
                     accentClass="indigo-500"
                     placeholder="e.g. 123456789"
                     currentInputBase={state.inputBase}
                     currentInputValue={state.inputValue}
                     currentError={error}
                     copiedBase={copiedBase}
                     onInputChange={handleInputChange}
                     onCopy={copyValue}
                  />
                  <BaseCard
                     label="Hexadecimal"
                     value={values.hex}
                     base={16}
                     icon={SquareTerminal}
                     accentClass="amber-500"
                     placeholder="e.g. 75BCD15"
                     currentInputBase={state.inputBase}
                     currentInputValue={state.inputValue}
                     currentError={error}
                     copiedBase={copiedBase}
                     onInputChange={handleInputChange}
                     onCopy={copyValue}
                  />
                  <BaseCard
                     label="Binary"
                     value={values.bin}
                     base={2}
                     icon={Binary}
                     accentClass="emerald-500"
                     placeholder="e.g. 111010110111100110100010101"
                     currentInputBase={state.inputBase}
                     currentInputValue={state.inputValue}
                     currentError={error}
                     copiedBase={copiedBase}
                     onInputChange={handleInputChange}
                     onCopy={copyValue}
                  />
                  <BaseCard
                     label="Octal"
                     value={values.oct}
                     base={8}
                     icon={Octagon}
                     accentClass="violet-500"
                     placeholder="e.g. 726750445"
                     currentInputBase={state.inputBase}
                     currentInputValue={state.inputValue}
                     currentError={error}
                     copiedBase={copiedBase}
                     onInputChange={handleInputChange}
                     onCopy={copyValue}
                  />
               </div>

               <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 hidden md:block">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <SquareTerminal className="w-3 h-3" /> Technical Breakdown
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] text-muted-foreground">
                     <li className="flex justify-between">
                        <span>BigInt Capacity:</span>
                        <span className="text-indigo-300 font-mono">Arbitrary Precision</span>
                     </li>
                     <li className="flex justify-between">
                        <span>Max Precision:</span>
                        <span className="text-indigo-300 font-mono">Memory Dependent</span>
                     </li>
                     <li className="flex justify-between">
                        <span>Processing:</span>
                        <span className="text-indigo-300 font-mono">Real-time / Local</span>
                     </li>
                     <li className="flex justify-between">
                        <span>Encoding:</span>
                        <span className="text-indigo-300 font-mono">Standard Positional</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
