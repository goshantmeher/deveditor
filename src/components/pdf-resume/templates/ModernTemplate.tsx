import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const ACCENT = '#6366f1';

const s = StyleSheet.create({
   page: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#1e293b',
      flexDirection: 'row',
   },
   sidebar: {
      width: '32%',
      backgroundColor: '#0f172a',
      padding: 24,
      paddingTop: 36,
      color: '#e2e8f0',
   },
   sidebarName: {
      fontSize: 18,
      fontFamily: 'Helvetica-Bold',
      color: '#ffffff',
      marginBottom: 2,
   },
   sidebarTitle: {
      fontSize: 10,
      color: ACCENT,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 20,
   },
   sidebarSectionTitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: ACCENT,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: 8,
      marginTop: 16,
   },
   sidebarItem: {
      fontSize: 9,
      color: '#cbd5e1',
      marginBottom: 4,
      lineHeight: 1.4,
   },
   sidebarSkillCategory: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: '#e2e8f0',
      marginBottom: 2,
      marginTop: 6,
   },
   sidebarSkillItem: {
      fontSize: 9,
      color: '#94a3b8',
      marginBottom: 1,
   },
   main: {
      width: '68%',
      padding: 30,
      paddingTop: 36,
   },
   mainSectionTitle: {
      fontSize: 12,
      fontFamily: 'Helvetica-Bold',
      color: ACCENT,
      textTransform: 'uppercase',
      letterSpacing: 1,
      borderBottomWidth: 2,
      borderBottomColor: ACCENT,
      paddingBottom: 4,
      marginBottom: 10,
      marginTop: 18,
   },
   summary: {
      fontSize: 10,
      color: '#334155',
      lineHeight: 1.6,
      marginBottom: 4,
   },
   entryBlock: {
      marginBottom: 12,
   },
   entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
   },
   entryTitle: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
   },
   entrySubtitle: {
      fontSize: 10,
      color: '#475569',
   },
   entryDate: {
      fontSize: 9,
      color: '#64748b',
      textAlign: 'right',
   },
   bullet: {
      fontSize: 10,
      color: '#334155',
      marginLeft: 10,
      marginBottom: 2,
   },
   projectLink: {
      fontSize: 9,
      color: ACCENT,
   },
});

interface ModernTemplateProps {
   data: ResumeData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
   const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = data;

   return (
      <Document>
         <Page size="A4" style={s.page}>
            {/* Sidebar */}
            <View style={s.sidebar}>
               <Text style={s.sidebarName}>{personalInfo.fullName || 'Your Name'}</Text>
               {personalInfo.title && <Text style={s.sidebarTitle}>{personalInfo.title}</Text>}

               <Text style={s.sidebarSectionTitle}>Contact</Text>
               {personalInfo.email && <Text style={s.sidebarItem}>{personalInfo.email}</Text>}
               {personalInfo.phone && <Text style={s.sidebarItem}>{personalInfo.phone}</Text>}
               {personalInfo.location && <Text style={s.sidebarItem}>{personalInfo.location}</Text>}
               {personalInfo.linkedin && <Text style={s.sidebarItem}>{personalInfo.linkedin}</Text>}
               {personalInfo.github && <Text style={s.sidebarItem}>{personalInfo.github}</Text>}
               {personalInfo.website && <Text style={s.sidebarItem}>{personalInfo.website}</Text>}

               {skills.length > 0 && (
                  <View>
                     <Text style={s.sidebarSectionTitle}>Skills</Text>
                     {skills.map((skill) => (
                        <View key={skill.id}>
                           {skill.category && <Text style={s.sidebarSkillCategory}>{skill.category}</Text>}
                           {skill.items.map((item, i) => (
                              <Text key={i} style={s.sidebarSkillItem}>
                                 - {item}
                              </Text>
                           ))}
                        </View>
                     ))}
                  </View>
               )}

               {certifications.length > 0 && (
                  <View>
                     <Text style={s.sidebarSectionTitle}>Certifications</Text>
                     {certifications.map((cert) => (
                        <View key={cert.id} style={{ marginBottom: 6 }}>
                           <Text style={[s.sidebarItem, { fontFamily: 'Helvetica-Bold', color: '#e2e8f0' }]}>
                              {cert.name}
                           </Text>
                           {cert.issuer && <Text style={s.sidebarSkillItem}>{cert.issuer}</Text>}
                           {cert.date && <Text style={s.sidebarSkillItem}>{cert.date}</Text>}
                        </View>
                     ))}
                  </View>
               )}
            </View>

            {/* Main Content */}
            <View style={s.main}>
               {summary && (
                  <View>
                     <Text style={[s.mainSectionTitle, { marginTop: 0 }]}>Profile</Text>
                     <Text style={s.summary}>{summary}</Text>
                  </View>
               )}

               {experience.length > 0 && (
                  <View>
                     <Text style={s.mainSectionTitle}>Experience</Text>
                     {experience.map((exp) => (
                        <View key={exp.id} style={s.entryBlock}>
                           <View style={s.entryHeader}>
                              <View>
                                 <Text style={s.entryTitle}>{exp.role}</Text>
                                 <Text style={s.entrySubtitle}>{exp.company}</Text>
                              </View>
                              <Text style={s.entryDate}>
                                 {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </Text>
                           </View>
                           {exp.bullets.filter(Boolean).map((bullet, i) => (
                              <Text key={i} style={s.bullet}>
                                 - {bullet}
                              </Text>
                           ))}
                        </View>
                     ))}
                  </View>
               )}

               {education.length > 0 && (
                  <View>
                     <Text style={s.mainSectionTitle}>Education</Text>
                     {education.map((edu) => (
                        <View key={edu.id} style={s.entryBlock}>
                           <View style={s.entryHeader}>
                              <View>
                                 <Text style={s.entryTitle}>
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                 </Text>
                                 <Text style={s.entrySubtitle}>{edu.school}</Text>
                              </View>
                              <View>
                                 <Text style={s.entryDate}>
                                    {edu.startDate} - {edu.endDate}
                                 </Text>
                                 {edu.gpa && <Text style={s.entryDate}>GPA: {edu.gpa}</Text>}
                              </View>
                           </View>
                        </View>
                     ))}
                  </View>
               )}

               {projects.length > 0 && (
                  <View>
                     <Text style={s.mainSectionTitle}>Projects</Text>
                     {projects.map((proj) => (
                        <View key={proj.id} style={s.entryBlock}>
                           <Text style={s.entryTitle}>{proj.name}</Text>
                           {proj.description && <Text style={s.bullet}>- {proj.description}</Text>}
                           {proj.techStack && (
                              <Text style={[s.bullet, { color: '#64748b', fontSize: 9 }]}>Tech: {proj.techStack}</Text>
                           )}
                           {proj.link && <Text style={s.projectLink}>{proj.link}</Text>}
                        </View>
                     ))}
                  </View>
               )}

               {customSections.map((section) => (
                  <View key={section.id}>
                     <Text style={s.mainSectionTitle}>{section.title || 'Additional'}</Text>
                     {section.bullets.filter(Boolean).map((bullet, i) => (
                        <Text key={i} style={s.bullet}>
                           - {bullet}
                        </Text>
                     ))}
                  </View>
               ))}
            </View>
         </Page>
      </Document>
   );
}
