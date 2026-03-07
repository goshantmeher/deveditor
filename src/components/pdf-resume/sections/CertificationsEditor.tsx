'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Certification, createEmptyCertification } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsEditorProps {
   data: Certification[];
   onChange: (data: Certification[]) => void;
}

export function CertificationsEditor({ data, onChange }: CertificationsEditorProps) {
   const updateEntry = (index: number, updates: Partial<Certification>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => onChange([...data, createEmptyCertification()]);
   const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

   return (
      <div className="space-y-6">
         {data.map((entry, i) => (
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                     {entry.name || `Certification ${i + 1}`}
                  </span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEntry(i)}>
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1 md:col-span-2">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Certification Name</Label>
                     <Input value={entry.name} onChange={(e) => updateEntry(i, { name: e.target.value })} placeholder="AWS Solutions Architect" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Issuing Organization</Label>
                     <Input value={entry.issuer} onChange={(e) => updateEntry(i, { issuer: e.target.value })} placeholder="Amazon Web Services" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date</Label>
                     <Input value={entry.date} onChange={(e) => updateEntry(i, { date: e.target.value })} placeholder="2023" className="h-9 text-sm" />
                  </div>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Certification
         </Button>
      </div>
   );
}
