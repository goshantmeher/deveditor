'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CustomSection, createEmptyCustomSection } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface CustomSectionEditorProps {
   data: CustomSection[];
   onChange: (data: CustomSection[]) => void;
}

export function CustomSectionEditor({ data, onChange }: CustomSectionEditorProps) {
   const updateEntry = (index: number, updates: Partial<CustomSection>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => onChange([...data, createEmptyCustomSection()]);
   const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

   const updateBullet = (entryIndex: number, bulletIndex: number, value: string) => {
      const newData = [...data];
      const bullets = [...newData[entryIndex].bullets];
      bullets[bulletIndex] = value;
      newData[entryIndex] = { ...newData[entryIndex], bullets };
      onChange(newData);
   };

   const addBullet = (entryIndex: number) => {
      const newData = [...data];
      newData[entryIndex] = { ...newData[entryIndex], bullets: [...newData[entryIndex].bullets, ''] };
      onChange(newData);
   };

   const removeBullet = (entryIndex: number, bulletIndex: number) => {
      const newData = [...data];
      const bullets = newData[entryIndex].bullets.filter((_, i) => i !== bulletIndex);
      newData[entryIndex] = { ...newData[entryIndex], bullets: bullets.length ? bullets : [''] };
      onChange(newData);
   };

   return (
      <div className="space-y-6">
         {data.map((entry, i) => (
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3">
               <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 mr-4">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Section Title
                     </Label>
                     <Input
                        value={entry.title}
                        onChange={(e) => updateEntry(i, { title: e.target.value })}
                        placeholder="e.g. Volunteering, Languages, Awards"
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

               <div className="space-y-2">
                  <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                     Items
                  </Label>
                  {entry.bullets.map((bullet, bi) => (
                     <div key={bi} className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <Input
                           value={bullet}
                           onChange={(e) => updateBullet(i, bi, e.target.value)}
                           placeholder="Enter an item..."
                           className="h-8 text-sm flex-1"
                        />
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                           onClick={() => removeBullet(i, bi)}
                        >
                           <Trash2 className="w-3 h-3" />
                        </Button>
                     </div>
                  ))}
                  <Button
                     variant="ghost"
                     size="sm"
                     className="text-xs h-7 text-muted-foreground"
                     onClick={() => addBullet(i)}
                  >
                     <Plus className="w-3 h-3 mr-1" /> Add item
                  </Button>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Custom Section
         </Button>
      </div>
   );
}
