'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, User } from 'lucide-react';

interface PersonalInfoEditorProps {
   data: PersonalInfo;
   onChange: (data: PersonalInfo) => void;
}

const Field = ({
   label,
   icon: Icon,
   value,
   onChange,
   placeholder,
}: {
   label: string;
   icon: React.ElementType;
   value: string;
   onChange: (v: string) => void;
   placeholder: string;
}) => (
   <div className="space-y-1.5">
      <Label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
         <Icon className="w-3 h-3" />
         {label}
      </Label>
      <Input
         value={value}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         className="h-9 text-sm"
      />
   </div>
);

export function PersonalInfoEditor({ data, onChange }: PersonalInfoEditorProps) {
   const update = (field: keyof PersonalInfo, value: string) => {
      onChange({ ...data, [field]: value });
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <Field
            label="Full Name"
            icon={User}
            value={data.fullName}
            onChange={(v) => update('fullName', v)}
            placeholder="John Doe"
         />
         <Field
            label="Job Title"
            icon={User}
            value={data.title}
            onChange={(v) => update('title', v)}
            placeholder="Senior Software Engineer"
         />
         <Field
            label="Email"
            icon={Mail}
            value={data.email}
            onChange={(v) => update('email', v)}
            placeholder="john@email.com"
         />
         <Field
            label="Phone"
            icon={Phone}
            value={data.phone}
            onChange={(v) => update('phone', v)}
            placeholder="+1 (555) 123-4567"
         />
         <Field
            label="Location"
            icon={MapPin}
            value={data.location}
            onChange={(v) => update('location', v)}
            placeholder="San Francisco, CA"
         />
         <Field
            label="LinkedIn"
            icon={Linkedin}
            value={data.linkedin}
            onChange={(v) => update('linkedin', v)}
            placeholder="linkedin.com/in/johndoe"
         />
         <Field
            label="GitHub"
            icon={Github}
            value={data.github}
            onChange={(v) => update('github', v)}
            placeholder="github.com/johndoe"
         />
         <Field
            label="Website"
            icon={Globe}
            value={data.website}
            onChange={(v) => update('website', v)}
            placeholder="johndoe.dev"
         />
      </div>
   );
}
