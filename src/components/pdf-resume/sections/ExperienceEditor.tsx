'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { WorkExperience, createEmptyExperience } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ExperienceEditorProps {
   data: WorkExperience[];
   onChange: (data: WorkExperience[]) => void;
}

export function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
   const updateEntry = (index: number, updates: Partial<WorkExperience>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => {
      onChange([...data, createEmptyExperience()]);
   };

   const removeEntry = (index: number) => {
      onChange(data.filter((_, i) => i !== index));
   };

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
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3 group">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                     <GripVertical className="w-4 h-4 opacity-30" />
                     <span className="text-xs font-medium uppercase tracking-wider">
                        {entry.company || `Experience ${i + 1}`}
                     </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEntry(i)}>
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Job Title</Label>
                     <Input value={entry.role} onChange={(e) => updateEntry(i, { role: e.target.value })} placeholder="Senior Software Engineer" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Company</Label>
                     <Input value={entry.company} onChange={(e) => updateEntry(i, { company: e.target.value })} placeholder="Tech Corp" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Start Date</Label>
                     <Input value={entry.startDate} onChange={(e) => updateEntry(i, { startDate: e.target.value })} placeholder="Jan 2021" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center justify-between">
                        <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">End Date</Label>
                        <div className="flex items-center gap-1.5">
                           <Label className="text-[10px] text-muted-foreground">Current</Label>
                           <Switch checked={entry.current} onCheckedChange={(checked) => updateEntry(i, { current: checked, endDate: checked ? '' : entry.endDate })} className="scale-75" />
                        </div>
                     </div>
                     <Input value={entry.current ? '' : entry.endDate} onChange={(e) => updateEntry(i, { endDate: e.target.value })} placeholder={entry.current ? 'Present' : 'Dec 2023'} disabled={entry.current} className="h-9 text-sm" />
                  </div>
               </div>

               {/* Bullet Points */}
               <div className="space-y-2">
                  <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Key Achievements</Label>
                  {entry.bullets.map((bullet, bi) => (
                     <div key={bi} className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <Input value={bullet} onChange={(e) => updateBullet(i, bi, e.target.value)} placeholder="Describe an achievement or responsibility..." className="h-8 text-sm flex-1" />
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => removeBullet(i, bi)}>
                           <Trash2 className="w-3 h-3" />
                        </Button>
                     </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground" onClick={() => addBullet(i)}>
                     <Plus className="w-3 h-3 mr-1" /> Add bullet
                  </Button>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Experience
         </Button>
      </div>
   );
}
