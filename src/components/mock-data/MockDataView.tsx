'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
   RefreshCcw,
   Copy,
   CheckCircle2,
   Download,
   Plus,
   Trash2,
   RotateCcw,
   FileJson,
   Table,
   Play,
   Database,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { faker } from '@faker-js/faker';
import Papa from 'papaparse';

type FakerType =
   | 'uuid'
   | 'firstName'
   | 'lastName'
   | 'fullName'
   | 'email'
   | 'phone'
   | 'company'
   | 'jobTitle'
   | 'datePast'
   | 'dateFuture'
   | 'numberInt'
   | 'numberFloat'
   | 'boolean'
   | 'paragraph'
   | 'word'
   | 'imageUrl'
   | 'avatarUrl'
   | 'country'
   | 'city'
   | 'streetAddress'
   | 'zipCode'
   | 'creditCard'
   | 'username'
   | 'password'
   | 'color';

interface FieldDef {
   id: string;
   name: string;
   type: FakerType;
}

interface MockDataState {
   fields: FieldDef[];
   rowCount: number;
   format: 'json' | 'csv';
}

const DEFAULT_STATE: MockDataState = {
   fields: [
      { id: '1', name: 'id', type: 'uuid' },
      { id: '2', name: 'name', type: 'fullName' },
      { id: '3', name: 'email', type: 'email' },
      { id: '4', name: 'role', type: 'jobTitle' },
      { id: '5', name: 'joinedAt', type: 'datePast' },
   ],
   rowCount: 10,
   format: 'json',
};

const TYPE_OPTIONS: { value: FakerType; label: string; category: string }[] = [
   { value: 'uuid', label: 'UUID', category: 'ID' },

   { value: 'firstName', label: 'First Name', category: 'Person' },
   { value: 'lastName', label: 'Last Name', category: 'Person' },
   { value: 'fullName', label: 'Full Name', category: 'Person' },
   { value: 'email', label: 'Email', category: 'Person' },
   { value: 'phone', label: 'Phone Number', category: 'Person' },
   { value: 'username', label: 'Username', category: 'Person' },
   { value: 'password', label: 'Password', category: 'Person' },
   { value: 'avatarUrl', label: 'Avatar URL', category: 'Person' },

   { value: 'company', label: 'Company Name', category: 'Business' },
   { value: 'jobTitle', label: 'Job Title', category: 'Business' },

   { value: 'datePast', label: 'Past Date', category: 'Date' },
   { value: 'dateFuture', label: 'Future Date', category: 'Date' },

   { value: 'country', label: 'Country', category: 'Location' },
   { value: 'city', label: 'City', category: 'Location' },
   { value: 'streetAddress', label: 'Street Address', category: 'Location' },
   { value: 'zipCode', label: 'Zip/Postal Code', category: 'Location' },

   { value: 'numberInt', label: 'Integer', category: 'Data' },
   { value: 'numberFloat', label: 'Decimal/Float', category: 'Data' },
   { value: 'boolean', label: 'Boolean', category: 'Data' },
   { value: 'color', label: 'Hex Color', category: 'Data' },

   { value: 'word', label: 'Random Word', category: 'Text' },
   { value: 'paragraph', label: 'Paragraph', category: 'Text' },
   { value: 'imageUrl', label: 'Random Image URL', category: 'Text' },

   { value: 'creditCard', label: 'Credit Card', category: 'Finance' },
];

export function MockDataView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<MockDataState>(DEFAULT_STATE);
   const [output, setOutput] = useState<string>('');
   const [isCopied, setIsCopied] = useState(false);
   const [isGenerating, setIsGenerating] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.MOCK_DATA_INPUT);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }

      generateData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.MOCK_DATA_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   const addField = () => {
      setState((prev) => ({
         ...prev,
         fields: [...prev.fields, { id: Date.now().toString(), name: `field_${prev.fields.length + 1}`, type: 'word' }],
      }));
   };

   const removeField = (id: string) => {
      setState((prev) => ({
         ...prev,
         fields: prev.fields.filter((f) => f.id !== id),
      }));
   };

   const updateField = (id: string, updates: Partial<FieldDef>) => {
      setState((prev) => ({
         ...prev,
         fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      }));
   };

   const generateFakeValue = (type: FakerType) => {
      switch (type) {
         case 'uuid':
            return faker.string.uuid();
         case 'firstName':
            return faker.person.firstName();
         case 'lastName':
            return faker.person.lastName();
         case 'fullName':
            return faker.person.fullName();
         case 'email':
            return faker.internet.email();
         case 'phone':
            return faker.phone.number();
         case 'company':
            return faker.company.name();
         case 'jobTitle':
            return faker.person.jobTitle();
         case 'datePast':
            return faker.date.past().toISOString();
         case 'dateFuture':
            return faker.date.future().toISOString();
         case 'numberInt':
            return faker.number.int({ min: 1, max: 10000 });
         case 'numberFloat':
            return faker.number.float({ min: 1, max: 1000, fractionDigits: 2 });
         case 'boolean':
            return faker.datatype.boolean();
         case 'paragraph':
            return faker.lorem.paragraph();
         case 'word':
            return faker.lorem.word();
         case 'imageUrl':
            return faker.image.url();
         case 'avatarUrl':
            return faker.image.avatar();
         case 'country':
            return faker.location.country();
         case 'city':
            return faker.location.city();
         case 'streetAddress':
            return faker.location.streetAddress();
         case 'zipCode':
            return faker.location.zipCode();
         case 'creditCard':
            return faker.finance.creditCardNumber();
         case 'username':
            return faker.internet.username();
         case 'password':
            return faker.internet.password();
         case 'color':
            return faker.color.rgb();
         default:
            return '';
      }
   };

   const generateData = async () => {
      setIsGenerating(true);

      // Use setTimeout to not block UI thread during large generation
      setTimeout(() => {
         try {
            const data = [];

            // To ensure deterministic structure
            const currentFields = state.fields;
            const count = Math.min(Math.max(1, state.rowCount), 10000); // hard cap at 10k rows

            for (let i = 0; i < count; i++) {
               const row: Record<string, string | number | boolean | null | undefined> = {};
               currentFields.forEach((field) => {
                  row[field.name || 'unnamed'] = generateFakeValue(field.type);
               });
               data.push(row);
            }

            if (state.format === 'json') {
               setOutput(JSON.stringify(data, null, 2));
            } else {
               setOutput(Papa.unparse(data));
            }
         } catch (err) {
            console.error(err);
         } finally {
            setIsGenerating(false);
         }
      }, 50);
   };

   // Regenerate if format changes
   useEffect(() => {
      if (isInitialized.current) {
         generateData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.format]);

   const copyOutput = async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   const downloadOutput = () => {
      if (!output) return;

      const blob = new Blob([output], { type: state.format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mock_data.${state.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
   };

   const handleClear = () => {
      setState(DEFAULT_STATE);
   };

   // Group options by category
   const groupedOptions = TYPE_OPTIONS.reduce(
      (acc, option) => {
         if (!acc[option.category]) acc[option.category] = [];
         acc[option.category].push(option);
         return acc;
      },
      {} as Record<string, typeof TYPE_OPTIONS>
   );

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background border border-border overflow-hidden">
         {/* Left half: Schema Definition */}
         <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col border-b md:border-b-0 md:border-r border-border min-h-[50vh] md:min-h-0 bg-muted/10">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-background">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                     <Database className="w-4 h-4 text-pink-500" />
                  </div>
                  <h1 className="font-bold text-sm tracking-tight text-foreground">Data Schema</h1>
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleClear}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
               </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               <div className="space-y-3">
                  {state.fields.map((field, index) => (
                     <div
                        key={field.id}
                        className="flex items-center gap-2 group animate-in fade-in slide-in-from-left-2"
                     >
                        <div className="w-6 text-center text-[10px] text-muted-foreground font-mono opacity-50">
                           {index + 1}
                        </div>
                        <Input
                           value={field.name}
                           onChange={(e) => updateField(field.id, { name: e.target.value })}
                           placeholder="Field name"
                           className="flex-1 h-9 bg-background focus-visible:ring-1 focus-visible:ring-pink-500/30 font-mono text-xs"
                        />
                        <select
                           value={field.type}
                           onChange={(e) => updateField(field.id, { type: e.target.value as FakerType })}
                           className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500/30"
                        >
                           {Object.entries(groupedOptions).map(([category, options]) => (
                              <optgroup key={category} label={category}>
                                 {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                       {opt.label}
                                    </option>
                                 ))}
                              </optgroup>
                           ))}
                        </select>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => removeField(field.id)}
                           className="h-9 w-9 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                           disabled={state.fields.length <= 1}
                        >
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  ))}
               </div>

               <Button
                  variant="outline"
                  className="w-full border-dashed border-2 hover:border-pink-500/50 hover:bg-pink-500/5 text-muted-foreground hover:text-foreground"
                  onClick={addField}
               >
                  <Plus className="w-4 h-4 mr-2" /> Add Field
               </Button>
            </div>

            {/* Generation Controls */}
            <div className="p-4 border-t border-border bg-background space-y-4 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                     <label className="text-xs font-semibold text-muted-foreground">Rows:</label>
                     <Input
                        type="number"
                        min={1}
                        max={10000}
                        value={state.rowCount}
                        onChange={(e) => setState((prev) => ({ ...prev, rowCount: parseInt(e.target.value) || 1 }))}
                        className="h-9 font-mono text-xs w-24"
                     />
                  </div>
                  <Button
                     onClick={() => generateData()}
                     className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20 px-6 gap-2"
                     disabled={isGenerating}
                  >
                     {isGenerating ? (
                        <RefreshCcw className="w-4 h-4 animate-spin" />
                     ) : (
                        <Play className="w-4 h-4 fill-current" />
                     )}
                     Generate
                  </Button>
               </div>
            </div>
         </div>

         {/* Right half: Output Preview */}
         <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col bg-background min-h-[50vh] md:min-h-0">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-muted/10">
               <Tabs
                  value={state.format}
                  onValueChange={(v) => setState((prev) => ({ ...prev, format: v as 'json' | 'csv' }))}
               >
                  <TabsList className="h-9 bg-background border border-border/50">
                     <TabsTrigger
                        value="json"
                        className="text-xs data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-600 rounded-sm px-4"
                     >
                        <FileJson className="w-3.5 h-3.5 mr-2" /> JSON
                     </TabsTrigger>
                     <TabsTrigger
                        value="csv"
                        className="text-xs data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600 rounded-sm px-4"
                     >
                        <Table className="w-3.5 h-3.5 mr-2" /> CSV
                     </TabsTrigger>
                  </TabsList>
               </Tabs>

               <div className="flex gap-2">
                  <Button
                     size="sm"
                     variant="outline"
                     onClick={copyOutput}
                     disabled={!output}
                     className="bg-background border-border hover:bg-muted"
                  >
                     {isCopied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                     ) : (
                        <Copy className="w-3.5 h-3.5 mr-2" />
                     )}
                     Copy
                  </Button>
                  <Button
                     size="sm"
                     variant="default"
                     onClick={downloadOutput}
                     disabled={!output}
                     className="bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-white"
                  >
                     <Download className="w-3.5 h-3.5 mr-2" /> Download
                  </Button>
               </div>
            </div>

            <div className="flex-1 overflow-auto bg-[url('/checkers.svg')] bg-[#F6F6F6] dark:bg-[#1A1A1A] relative">
               <textarea
                  className="absolute inset-0 w-full h-full resize-none bg-transparent font-mono text-[13px] leading-relaxed p-6 focus-visible:outline-none"
                  value={output}
                  readOnly
                  spellCheck={false}
               />
               {isGenerating && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                     <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-6 py-4 shadow-xl">
                        <RefreshCcw className="w-5 h-5 text-pink-500 animate-spin" />
                        <span className="text-sm font-bold flex">Generating {state.rowCount} Rows...</span>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
