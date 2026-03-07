// ── Resume Data Types ─────────────────────────────────────────

export interface PersonalInfo {
   fullName: string;
   title: string;
   email: string;
   phone: string;
   location: string;
   linkedin: string;
   github: string;
   website: string;
}

export interface WorkExperience {
   id: string;
   company: string;
   role: string;
   startDate: string;
   endDate: string;
   current: boolean;
   bullets: string[];
}

export interface Education {
   id: string;
   school: string;
   degree: string;
   field: string;
   startDate: string;
   endDate: string;
   gpa: string;
}

export interface Skill {
   id: string;
   category: string;
   items: string[];
}

export interface Project {
   id: string;
   name: string;
   description: string;
   techStack: string;
   link: string;
}

export interface Certification {
   id: string;
   name: string;
   issuer: string;
   date: string;
   link: string;
}

export interface CustomSection {
   id: string;
   title: string;
   bullets: string[];
}

export interface ResumeData {
   personalInfo: PersonalInfo;
   summary: string;
   experience: WorkExperience[];
   education: Education[];
   skills: Skill[];
   projects: Project[];
   certifications: Certification[];
   customSections: CustomSection[];
}

// ── Template Types ────────────────────────────────────────────

export type TemplateId = 'classic' | 'modern' | 'minimal';

export interface ResumeTemplate {
   id: TemplateId;
   name: string;
   description: string;
   accentColor: string; // hex color for PDF rendering
}

// ── Constants ─────────────────────────────────────────────────

export const RESUME_TEMPLATES: ResumeTemplate[] = [
   {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional single-column layout with clear section headings',
      accentColor: '#1e293b', // slate-800
   },
   {
      id: 'modern',
      name: 'Modern',
      description: 'Two-column layout with sidebar for contact & skills',
      accentColor: '#6366f1', // indigo-500
   },
   {
      id: 'minimal',
      name: 'Minimal',
      description: 'Ultra-clean, typography-driven design with generous whitespace',
      accentColor: '#0f172a', // slate-900
   },
];

// ── Helpers ────────────────────────────────────────────────────

let idCounter = 0;
export const generateId = (): string => `${Date.now()}-${++idCounter}`;

export const createEmptyExperience = (): WorkExperience => ({
   id: generateId(),
   company: '',
   role: '',
   startDate: '',
   endDate: '',
   current: false,
   bullets: [''],
});

export const createEmptyEducation = (): Education => ({
   id: generateId(),
   school: '',
   degree: '',
   field: '',
   startDate: '',
   endDate: '',
   gpa: '',
});

export const createEmptySkill = (): Skill => ({
   id: generateId(),
   category: '',
   items: [],
});

export const createEmptyProject = (): Project => ({
   id: generateId(),
   name: '',
   description: '',
   techStack: '',
   link: '',
});

export const createEmptyCertification = (): Certification => ({
   id: generateId(),
   name: '',
   issuer: '',
   date: '',
   link: '',
});

export const createEmptyCustomSection = (): CustomSection => ({
   id: generateId(),
   title: '',
   bullets: [''],
});

export const DEFAULT_RESUME_DATA: ResumeData = {
   personalInfo: {
      fullName: 'John Doe',
      title: 'Senior Software Engineer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      website: 'johndoe.dev',
   },
   summary:
      'Experienced software engineer with 8+ years of expertise in building scalable web applications. Proficient in React, Node.js, and cloud infrastructure. Passionate about clean code, developer tooling, and open-source contributions.',
   experience: [
      {
         id: generateId(),
         company: 'Tech Corp',
         role: 'Senior Software Engineer',
         startDate: 'Jan 2021',
         endDate: '',
         current: true,
         bullets: [
            'Led a team of 5 engineers to build a real-time collaboration platform',
            'Reduced API response time by 40% through query optimization and caching',
            'Architected micro-frontend strategy adopted across 3 product lines',
         ],
      },
      {
         id: generateId(),
         company: 'StartupXYZ',
         role: 'Full Stack Developer',
         startDate: 'Jun 2018',
         endDate: 'Dec 2020',
         current: false,
         bullets: [
            'Built and shipped the core product from 0 to 50K monthly active users',
            'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
         ],
      },
   ],
   education: [
      {
         id: generateId(),
         school: 'University of California, Berkeley',
         degree: 'B.S.',
         field: 'Computer Science',
         startDate: '2014',
         endDate: '2018',
         gpa: '3.8',
      },
   ],
   skills: [
      {
         id: generateId(),
         category: 'Frontend',
         items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      },
      {
         id: generateId(),
         category: 'Backend',
         items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
      },
      {
         id: generateId(),
         category: 'DevOps',
         items: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      },
   ],
   projects: [
      {
         id: generateId(),
         name: 'DevEditor',
         description: 'Open-source developer tools collection with 10+ utilities',
         techStack: 'Next.js, React, TypeScript',
         link: 'github.com/johndoe/deveditor',
      },
   ],
   certifications: [
      {
         id: generateId(),
         name: 'AWS Solutions Architect - Associate',
         issuer: 'Amazon Web Services',
         date: '2023',
         link: '',
      },
   ],
   customSections: [],
};
