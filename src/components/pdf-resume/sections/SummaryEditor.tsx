'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SummaryEditorProps {
   value: string;
   onChange: (value: string) => void;
}

export function SummaryEditor({ value, onChange }: SummaryEditorProps) {
   return (
      <div className="space-y-1.5">
         <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Professional Summary
         </Label>
         <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="A brief summary of your professional background, key skills, and career goals..."
            className="min-h-[100px] text-sm resize-none"
         />
         <p className="text-[10px] text-muted-foreground">
            {value.length}/500 characters • Keep it concise and impactful
         </p>
      </div>
   );
}
