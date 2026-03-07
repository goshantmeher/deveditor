'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Education, createEmptyEducation } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface EducationEditorProps {
   data: Education[];
   onChange: (data: Education[]) => void;
}

export function EducationEditor({ data, onChange }: EducationEditorProps) {
   const updateEntry = (index: number, updates: Partial<Education>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => onChange([...data, createEmptyEducation()]);
   const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

   return (
      <div className="space-y-6">
         {data.map((entry, i) => (
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3 group">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                     <GripVertical className="w-4 h-4 opacity-30" />
                     <span className="text-xs font-medium uppercase tracking-wider">
                        {entry.school || `Education ${i + 1}`}
                     </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEntry(i)}>
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1 md:col-span-2">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">School / University</Label>
                     <Input value={entry.school} onChange={(e) => updateEntry(i, { school: e.target.value })} placeholder="University of California, Berkeley" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Degree</Label>
                     <Input value={entry.degree} onChange={(e) => updateEntry(i, { degree: e.target.value })} placeholder="B.S." className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Field of Study</Label>
                     <Input value={entry.field} onChange={(e) => updateEntry(i, { field: e.target.value })} placeholder="Computer Science" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Start Year</Label>
                     <Input value={entry.startDate} onChange={(e) => updateEntry(i, { startDate: e.target.value })} placeholder="2014" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">End Year</Label>
                     <Input value={entry.endDate} onChange={(e) => updateEntry(i, { endDate: e.target.value })} placeholder="2018" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">GPA (Optional)</Label>
                     <Input value={entry.gpa} onChange={(e) => updateEntry(i, { gpa: e.target.value })} placeholder="3.8" className="h-9 text-sm" />
                  </div>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Education
         </Button>
      </div>
   );
}
