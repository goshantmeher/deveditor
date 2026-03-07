'use client';

import { useState, useCallback } from 'react';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Copy, Check, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { ResumeData, generateId } from '@/types/resume';

interface AiImportModalProps {
   open: boolean;
   onClose: () => void;
   onImport: (data: ResumeData) => void;
}

const SEED_PROMPT = `You are a professional resume content generator. I need you to generate my resume content in a specific JSON format. Use the information I provide below to create polished, ATS-friendly resume content.

IMPORTANT: Output ONLY the JSON below — no markdown, no code fences, no extra text.

{
  "personalInfo": {
    "fullName": "Your Full Name",
    "title": "Your Professional Title (e.g. Senior Software Engineer)",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State/Country",
    "linkedin": "linkedin.com/in/yourprofile",
    "github": "github.com/yourusername",
    "website": "yourportfolio.com"
  },
  "summary": "A compelling 2-3 sentence professional summary highlighting your key strengths, years of experience, and what you bring to the table.",
  "experience": [
    {
      "company": "Company Name",
      "role": "Your Job Title",
      "startDate": "Mon YYYY",
      "endDate": "Mon YYYY or leave empty if current",
      "current": false,
      "bullets": [
        "Start each bullet with a strong action verb",
        "Quantify achievements with numbers where possible",
        "Focus on impact and results, not just responsibilities"
      ]
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "Degree Type (e.g. B.S., M.S., MBA)",
      "field": "Field of Study",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "gpa": "3.8 (optional, include if above 3.5)"
    }
  ],
  "skills": [
    {
      "category": "Category Name (e.g. Frontend, Backend, Tools)",
      "items": ["Skill1", "Skill2", "Skill3", "Skill4"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief 1-sentence description of what it does and its impact",
      "techStack": "Tech1, Tech2, Tech3",
      "link": "github.com/user/project"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "YYYY",
      "link": "optional verification URL"
    }
  ]
}

Here is my information (modify/enhance as needed to sound professional):
---
[PASTE YOUR INFORMATION HERE - include your name, job history, education, skills, projects, etc. in any format. The AI will organize it into the structure above.]
---`;

function parseAiResponse(raw: string): ResumeData {
   // Try to extract JSON from the response (handle code fences, extra text, etc.)
   let jsonStr = raw.trim();

   // Remove markdown code fences if present
   const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
   if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
   }

   // Try to find JSON object boundaries
   const firstBrace = jsonStr.indexOf('{');
   const lastBrace = jsonStr.lastIndexOf('}');
   if (firstBrace !== -1 && lastBrace !== -1) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
   }

   const parsed = JSON.parse(jsonStr);

   // Validate and map to ResumeData with IDs
   const data: ResumeData = {
      personalInfo: {
         fullName: parsed.personalInfo?.fullName || '',
         title: parsed.personalInfo?.title || '',
         email: parsed.personalInfo?.email || '',
         phone: parsed.personalInfo?.phone || '',
         location: parsed.personalInfo?.location || '',
         linkedin: parsed.personalInfo?.linkedin || '',
         github: parsed.personalInfo?.github || '',
         website: parsed.personalInfo?.website || '',
      },
      summary: parsed.summary || '',
      experience: (parsed.experience || []).map(
         (exp: { company?: string; role?: string; startDate?: string; endDate?: string; current?: boolean; bullets?: string[] }) => ({
            id: generateId(),
            company: exp.company || '',
            role: exp.role || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: exp.current || false,
            bullets: exp.bullets || [''],
         })
      ),
      education: (parsed.education || []).map(
         (edu: { school?: string; degree?: string; field?: string; startDate?: string; endDate?: string; gpa?: string }) => ({
            id: generateId(),
            school: edu.school || '',
            degree: edu.degree || '',
            field: edu.field || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            gpa: edu.gpa || '',
         })
      ),
      skills: (parsed.skills || []).map(
         (skill: { category?: string; items?: string[] }) => ({
            id: generateId(),
            category: skill.category || '',
            items: skill.items || [],
         })
      ),
      projects: (parsed.projects || []).map(
         (proj: { name?: string; description?: string; techStack?: string; link?: string }) => ({
            id: generateId(),
            name: proj.name || '',
            description: proj.description || '',
            techStack: proj.techStack || '',
            link: proj.link || '',
         })
      ),
      certifications: (parsed.certifications || []).map(
         (cert: { name?: string; issuer?: string; date?: string; link?: string }) => ({
            id: generateId(),
            name: cert.name || '',
            issuer: cert.issuer || '',
            date: cert.date || '',
            link: cert.link || '',
         })
      ),
      customSections: [],
   };

   return data;
}

export function AiImportModal({ open, onClose, onImport }: AiImportModalProps) {
   const [step, setStep] = useState<'prompt' | 'paste'>('prompt');
   const [aiResponse, setAiResponse] = useState('');
   const [copied, setCopied] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleCopyPrompt = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(SEED_PROMPT);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         // Fallback
         const el = document.createElement('textarea');
         el.value = SEED_PROMPT;
         document.body.appendChild(el);
         el.select();
         document.execCommand('copy');
         document.body.removeChild(el);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   }, []);

   const handleImport = useCallback(() => {
      setError(null);
      try {
         const data = parseAiResponse(aiResponse);

         // Basic validation
         if (!data.personalInfo.fullName && !data.summary && data.experience.length === 0) {
            setError('The response doesn\'t seem to contain valid resume data. Please check and try again.');
            return;
         }

         onImport(data);
         // Reset state
         setStep('prompt');
         setAiResponse('');
         setError(null);
         onClose();
      } catch {
         setError('Failed to parse the AI response. Make sure it\'s valid JSON in the expected format. Copy the prompt again and try a fresh response.');
      }
   }, [aiResponse, onImport, onClose]);

   const handleClose = () => {
      setStep('prompt');
      setAiResponse('');
      setError(null);
      onClose();
   };

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                     <Bot className="w-4 h-4 text-white" />
                  </div>
                  Import Resume from AI
               </DialogTitle>
               <DialogDescription>
                  Use any AI tool (ChatGPT, Claude, Gemini, Copilot) to generate your resume content, then paste it here.
               </DialogDescription>
            </DialogHeader>

            {step === 'prompt' ? (
               <div className="space-y-4 mt-2">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                     <span className="font-medium text-foreground">Copy the prompt below</span>
                     <ArrowRight className="w-3 h-3" />
                     <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[10px] font-bold">2</div>
                     <span>Paste AI response</span>
                  </div>

                  {/* Instructions */}
                  <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                     <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <div className="text-sm space-y-1">
                           <p className="font-medium">How it works:</p>
                           <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-xs">
                              <li>Copy the prompt below</li>
                              <li>Paste it into any AI tool (ChatGPT, Claude, Gemini, etc.)</li>
                              <li>Replace <code className="bg-muted px-1 rounded text-[10px]">[PASTE YOUR INFORMATION HERE]</code> with your details</li>
                              <li>Copy the AI&apos;s JSON response and come back here</li>
                           </ol>
                        </div>
                     </div>
                  </div>

                  {/* Prompt preview */}
                  <div className="relative">
                     <pre className="bg-muted/30 border border-border rounded-xl p-4 text-[11px] font-mono text-muted-foreground overflow-auto max-h-[300px] leading-relaxed whitespace-pre-wrap">
                        {SEED_PROMPT}
                     </pre>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                     <Button variant="ghost" size="sm" onClick={handleClose} className="text-xs">
                        Cancel
                     </Button>
                     <div className="flex items-center gap-2">
                        <Button
                           size="sm"
                           variant="outline"
                           onClick={handleCopyPrompt}
                           className="text-xs"
                        >
                           {copied ? (
                              <>
                                 <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                                 Copied!
                              </>
                           ) : (
                              <>
                                 <Copy className="w-3.5 h-3.5 mr-1" />
                                 Copy Prompt
                              </>
                           )}
                        </Button>
                        <Button
                           size="sm"
                           onClick={() => setStep('paste')}
                           className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                           Next: Paste Response
                           <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="space-y-4 mt-2">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[10px] font-bold">1</div>
                     <span>Copy prompt</span>
                     <ArrowRight className="w-3 h-3" />
                     <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                     <span className="font-medium text-foreground">Paste AI response</span>
                  </div>

                  {error && (
                     <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        <p className="text-sm text-destructive">{error}</p>
                     </div>
                  )}

                  {/* Paste area */}
                  <Textarea
                     value={aiResponse}
                     onChange={(e) => setAiResponse(e.target.value)}
                     placeholder='Paste the JSON response from your AI tool here...

{
  "personalInfo": {
    "fullName": "...",
    ...
  },
  ...
}'
                     className="min-h-[300px] font-mono text-xs"
                     spellCheck={false}
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setStep('prompt'); setError(null); }}
                        className="text-xs"
                     >
                        ← Back
                     </Button>
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleClose} className="text-xs">
                           Cancel
                        </Button>
                        <Button
                           size="sm"
                           onClick={handleImport}
                           disabled={!aiResponse.trim()}
                           className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                           <Sparkles className="w-3.5 h-3.5 mr-1" />
                           Import Resume Data
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}
