'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Project, createEmptyProject } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ProjectsEditorProps {
   data: Project[];
   onChange: (data: Project[]) => void;
}

export function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
   const updateEntry = (index: number, updates: Partial<Project>) => {
      const newData = [...data];
      newData[index] = { ...newData[index], ...updates };
      onChange(newData);
   };

   const addEntry = () => onChange([...data, createEmptyProject()]);
   const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

   return (
      <div className="space-y-6">
         {data.map((entry, i) => (
            <div key={entry.id} className="relative p-4 rounded-lg border border-border bg-background space-y-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                     <GripVertical className="w-4 h-4 opacity-30" />
                     <span className="text-xs font-medium uppercase tracking-wider">
                        {entry.name || `Project ${i + 1}`}
                     </span>
                  </div>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-7 w-7 text-muted-foreground hover:text-destructive"
                     onClick={() => removeEntry(i)}
                  >
                     <Trash2 className="w-3.5 h-3.5" />
                  </Button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Project Name
                     </Label>
                     <Input
                        value={entry.name}
                        onChange={(e) => updateEntry(i, { name: e.target.value })}
                        placeholder="My Open Source Project"
                        className="h-9 text-sm"
                     />
                  </div>
                  <div className="space-y-1">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Tech Stack
                     </Label>
                     <Input
                        value={entry.techStack}
                        onChange={(e) => updateEntry(i, { techStack: e.target.value })}
                        placeholder="React, Node.js, PostgreSQL"
                        className="h-9 text-sm"
                     />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                     </Label>
                     <Textarea
                        value={entry.description}
                        onChange={(e) => updateEntry(i, { description: e.target.value })}
                        placeholder="Brief description of the project and your role..."
                        className="min-h-[60px] text-sm resize-none"
                     />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                     <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Link (Optional)
                     </Label>
                     <Input
                        value={entry.link}
                        onChange={(e) => updateEntry(i, { link: e.target.value })}
                        placeholder="github.com/user/project"
                        className="h-9 text-sm"
                     />
                  </div>
               </div>
            </div>
         ))}

         <Button variant="outline" size="sm" className="w-full text-xs" onClick={addEntry}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Project
         </Button>
      </div>
   );
}
