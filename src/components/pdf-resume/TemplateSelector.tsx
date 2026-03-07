'use client';

import { RESUME_TEMPLATES, TemplateId, ResumeTemplate } from '@/types/resume';
import { FileText, Columns2, Type } from 'lucide-react';

interface TemplateSelectorProps {
   selected: TemplateId;
   onChange: (id: TemplateId) => void;
}

const templateIcons: Record<TemplateId, React.ElementType> = {
   classic: FileText,
   modern: Columns2,
   minimal: Type,
};

export function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
   return (
      <div className="flex gap-1.5">
         {RESUME_TEMPLATES.map((template: ResumeTemplate) => {
            const Icon = templateIcons[template.id];
            const isActive = selected === template.id;
            return (
               <button
                  key={template.id}
                  onClick={() => onChange(template.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                     isActive
                        ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30 shadow-sm'
                        : 'bg-background text-muted-foreground border-border hover:bg-muted/30 hover:text-foreground'
                  }`}
                  title={template.description}
               >
                  <Icon className="w-3.5 h-3.5" />
                  {template.name}
               </button>
            );
         })}
      </div>
   );
}
