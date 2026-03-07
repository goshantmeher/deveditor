'use client';

import { ResumeData } from '@/types/resume';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { CertificationsEditor } from './sections/CertificationsEditor';
import { CustomSectionEditor } from './sections/CustomSectionEditor';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { User, FileText, Briefcase, GraduationCap, Wrench, FolderKanban, Award, LayoutList } from 'lucide-react';

interface ResumeFormProps {
   data: ResumeData;
   onChange: (data: ResumeData) => void;
}

const sections = [
   { id: 'personal', label: 'Personal Info', icon: User },
   { id: 'summary', label: 'Summary', icon: FileText },
   { id: 'experience', label: 'Experience', icon: Briefcase },
   { id: 'education', label: 'Education', icon: GraduationCap },
   { id: 'skills', label: 'Skills', icon: Wrench },
   { id: 'projects', label: 'Projects', icon: FolderKanban },
   { id: 'certifications', label: 'Certifications', icon: Award },
   { id: 'custom', label: 'Custom Sections', icon: LayoutList },
];

export function ResumeForm({ data, onChange }: ResumeFormProps) {
   return (
      <div className="h-full overflow-y-auto">
         <Accordion type="multiple" defaultValue={['personal', 'summary', 'experience']} className="space-y-1 p-3">
            {sections.map((section) => {
               const Icon = section.icon;
               return (
                  <AccordionItem key={section.id} value={section.id} className="border border-border rounded-lg overflow-hidden bg-background">
                     <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors data-[state=open]:bg-muted/20">
                        <div className="flex items-center gap-2.5">
                           <Icon className="w-4 h-4 text-indigo-500" />
                           <span className="text-sm font-semibold">{section.label}</span>
                           {section.id === 'experience' && data.experience.length > 0 && (
                              <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full font-medium">
                                 {data.experience.length}
                              </span>
                           )}
                           {section.id === 'education' && data.education.length > 0 && (
                              <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full font-medium">
                                 {data.education.length}
                              </span>
                           )}
                           {section.id === 'skills' && data.skills.length > 0 && (
                              <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full font-medium">
                                 {data.skills.reduce((sum, s) => sum + s.items.length, 0)}
                              </span>
                           )}
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="px-4 pb-4 pt-2">
                        {section.id === 'personal' && (
                           <PersonalInfoEditor
                              data={data.personalInfo}
                              onChange={(personalInfo) => onChange({ ...data, personalInfo })}
                           />
                        )}
                        {section.id === 'summary' && (
                           <SummaryEditor
                              value={data.summary}
                              onChange={(summary) => onChange({ ...data, summary })}
                           />
                        )}
                        {section.id === 'experience' && (
                           <ExperienceEditor
                              data={data.experience}
                              onChange={(experience) => onChange({ ...data, experience })}
                           />
                        )}
                        {section.id === 'education' && (
                           <EducationEditor
                              data={data.education}
                              onChange={(education) => onChange({ ...data, education })}
                           />
                        )}
                        {section.id === 'skills' && (
                           <SkillsEditor
                              data={data.skills}
                              onChange={(skills) => onChange({ ...data, skills })}
                           />
                        )}
                        {section.id === 'projects' && (
                           <ProjectsEditor
                              data={data.projects}
                              onChange={(projects) => onChange({ ...data, projects })}
                           />
                        )}
                        {section.id === 'certifications' && (
                           <CertificationsEditor
                              data={data.certifications}
                              onChange={(certifications) => onChange({ ...data, certifications })}
                           />
                        )}
                        {section.id === 'custom' && (
                           <CustomSectionEditor
                              data={data.customSections}
                              onChange={(customSections) => onChange({ ...data, customSections })}
                           />
                        )}
                     </AccordionContent>
                  </AccordionItem>
               );
            })}
         </Accordion>
      </div>
   );
}
