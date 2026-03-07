import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const s = StyleSheet.create({
   page: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#1e293b',
      padding: 40,
      lineHeight: 1.5,
   },
   header: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#1e293b',
      paddingBottom: 12,
   },
   name: {
      fontSize: 24,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      marginBottom: 10,
   },
   title: {
      fontSize: 12,
      color: '#475569',
      marginBottom: 8,
   },
   contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
   },
   contactItem: {
      fontSize: 9,
      color: '#64748b',
      marginRight: 12,
   },
   sectionTitle: {
      fontSize: 12,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#cbd5e1',
      paddingBottom: 4,
      marginBottom: 8,
      marginTop: 16,
   },
   summary: {
      fontSize: 10,
      color: '#334155',
      lineHeight: 1.6,
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
      marginLeft: 12,
      marginBottom: 2,
   },
   skillRow: {
      flexDirection: 'row',
      marginBottom: 4,
   },
   skillCategory: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      width: 80,
   },
   skillItems: {
      fontSize: 10,
      color: '#334155',
      flex: 1,
   },
   entryBlock: {
      marginBottom: 10,
   },
   projectLink: {
      fontSize: 9,
      color: '#6366f1',
   },
});

interface ClassicTemplateProps {
   data: ResumeData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
   const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = data;

   return (
      <Document>
         <Page size="A4" style={s.page}>
            {/* Header */}
            <View style={s.header}>
               <Text style={s.name}>{personalInfo.fullName || 'Your Name'}</Text>
               {personalInfo.title && <Text style={s.title}>{personalInfo.title}</Text>}
               <View style={s.contactRow}>
                  {personalInfo.email && <Text style={s.contactItem}>{personalInfo.email}</Text>}
                  {personalInfo.phone && <Text style={s.contactItem}>{personalInfo.phone}</Text>}
                  {personalInfo.location && <Text style={s.contactItem}>{personalInfo.location}</Text>}
                  {personalInfo.linkedin && <Text style={s.contactItem}>{personalInfo.linkedin}</Text>}
                  {personalInfo.github && <Text style={s.contactItem}>{personalInfo.github}</Text>}
                  {personalInfo.website && <Text style={s.contactItem}>{personalInfo.website}</Text>}
               </View>
            </View>

            {/* Summary */}
            {summary && (
               <View>
                  <Text style={s.sectionTitle}>Professional Summary</Text>
                  <Text style={s.summary}>{summary}</Text>
               </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Experience</Text>
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

            {/* Education */}
            {education.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Education</Text>
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

            {/* Skills */}
            {skills.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Skills</Text>
                  {skills.map((skill) => (
                     <View key={skill.id} style={s.skillRow}>
                        {skill.category && <Text style={s.skillCategory}>{skill.category}:</Text>}
                        <Text style={s.skillItems}>{skill.items.join(', ')}</Text>
                     </View>
                  ))}
               </View>
            )}

            {/* Projects */}
            {projects.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Projects</Text>
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

            {/* Certifications */}
            {certifications.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Certifications</Text>
                  {certifications.map((cert) => (
                     <View key={cert.id} style={s.entryBlock}>
                        <View style={s.entryHeader}>
                           <Text style={s.entryTitle}>{cert.name}</Text>
                           <Text style={s.entryDate}>{cert.date}</Text>
                        </View>
                        {cert.issuer && <Text style={s.entrySubtitle}>{cert.issuer}</Text>}
                     </View>
                  ))}
               </View>
            )}

            {/* Custom Sections */}
            {customSections.map((section) => (
               <View key={section.id}>
                  <Text style={s.sectionTitle}>{section.title || 'Additional'}</Text>
                  {section.bullets.filter(Boolean).map((bullet, i) => (
                     <Text key={i} style={s.bullet}>
                        - {bullet}
                     </Text>
                  ))}
               </View>
            ))}
         </Page>
      </Document>
   );
}
