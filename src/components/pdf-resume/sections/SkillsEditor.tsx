'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skill, createEmptySkill } from '@/types/resume';
import { Plus, Trash2, X } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface SkillsEditorProps {
   data: Skill[];
   onChange: (data: Skill[]) => void;
}

export function SkillsEditor({ data, onChange }: SkillsEditorProps) {
   const [inputValues, setInputValues] = useState<Record<string, string>>({});

   const updateEntry = (index: number, updates: Partial<Skill>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => onChange([...data, createEmptySkill()]);
   const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

   const addSkillItem = (index: number) => {
      const inputKey = data[index].id;
      const value = (inputValues[inputKey] || '').trim();
      if (!value) return;
      const newData = [...data];
      newData[index] = { ...newData[index], items: [...newData[index].items, value] };
      onChange(newData);
      setInputValues({ ...inputValues, [inputKey]: '' });
   };

   const removeSkillItem = (entryIndex: number, itemIndex: number) => {
      const newData = [...data];
      newData[entryIndex] = {
         ...newData[entryIndex],
         items: newData[entryIndex].items.filter((_, i) => i !== itemIndex),
      };
      onChange(newData);
   };

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         addSkillItem(index);
      }
   };

   return (
      <div className="space-y-6">
         {data.map((entry, i) => (
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3">
               <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 mr-4">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Category
                     </Label>
                     <Input
                        value={entry.category}
                        onChange={(e) => updateEntry(i, { category: e.target.value })}
                        placeholder="e.g. Frontend, Backend, DevOps"
                        className="h-9 text-sm"
                     />
                  </div>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-7 w-7 text-muted-foreground hover:text-destructive mt-5"
                     onClick={() => removeEntry(i)}
                  >
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               </div>

               {/* Tags */}
               <div className="flex flex-wrap gap-1.5">
                  {entry.items.map((item, ii) => (
                     <span
                        key={ii}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-medium border border-indigo-500/20"
                     >
                        {item}
                        <button
                           onClick={() => removeSkillItem(i, ii)}
                           className="hover:text-destructive transition-colors"
                        >
                           <X className="w-3 h-3" />
                        </button>
                     </span>
                  ))}
               </div>

               <div className="flex gap-2">
                  <Input
                     value={inputValues[entry.id] || ''}
                     onChange={(e) => setInputValues({ ...inputValues, [entry.id]: e.target.value })}
                     onKeyDown={(e) => handleKeyDown(e, i)}
                     placeholder="Type a skill and press Enter"
                     className="h-8 text-sm flex-1"
                  />
                  <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => addSkillItem(i)}>
                     <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Skill Category
         </Button>
      </div>
   );
}
