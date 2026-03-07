import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const s = StyleSheet.create({
   page: {
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#0f172a',
      padding: 48,
      lineHeight: 1.6,
   },
   header: {
      marginBottom: 24,
      textAlign: 'center',
   },
   name: {
      fontSize: 26,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      letterSpacing: 2,
      marginBottom: 12,
   },
   title: {
      fontSize: 11,
      color: '#64748b',
      letterSpacing: 1,
      marginBottom: 10,
   },
   contactRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 3,
   },
   contactItem: {
      fontSize: 9,
      color: '#64748b',
      marginHorizontal: 6,
   },
   contactSeparator: {
      fontSize: 9,
      color: '#cbd5e1',
   },
   sectionTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 10,
      marginTop: 22,
   },
   divider: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#e2e8f0',
      marginBottom: 10,
   },
   summary: {
      fontSize: 10,
      color: '#334155',
      lineHeight: 1.7,
      textAlign: 'center',
   },
   entryBlock: {
      marginBottom: 12,
   },
   entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
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
      color: '#94a3b8',
      textAlign: 'right',
   },
   bullet: {
      fontSize: 10,
      color: '#334155',
      marginLeft: 10,
      marginBottom: 2,
   },
   skillRow: {
      flexDirection: 'row',
      marginBottom: 3,
   },
   skillCategory: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      width: 80,
   },
   skillItems: {
      fontSize: 10,
      color: '#475569',
      flex: 1,
   },
   projectLink: {
      fontSize: 9,
      color: '#64748b',
   },
});

interface MinimalTemplateProps {
   data: ResumeData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
   const { personalInfo, summary, experience, education, skills, projects, certifications, customSections } = data;

   const contactItems = [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.website,
   ].filter(Boolean);

   return (
      <Document>
         <Page size="A4" style={s.page}>
            <View style={s.header}>
               <Text style={s.name}>{(personalInfo.fullName || 'Your Name').toUpperCase()}</Text>
               {personalInfo.title && <Text style={s.title}>{personalInfo.title}</Text>}
               <View style={s.contactRow}>
                  {contactItems.map((item, i) => (
                     <View key={i} style={{ flexDirection: 'row' }}>
                        {i > 0 && <Text style={s.contactSeparator}> | </Text>}
                        <Text style={s.contactItem}>{item}</Text>
                     </View>
                  ))}
               </View>
            </View>

            <View style={s.divider} />

            {summary && (
               <View>
                  <Text style={s.summary}>{summary}</Text>
               </View>
            )}

            {experience.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Experience</Text>
                  <View style={s.divider} />
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
                  <Text style={s.sectionTitle}>Education</Text>
                  <View style={s.divider} />
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

            {skills.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Skills</Text>
                  <View style={s.divider} />
                  {skills.map((skill) => (
                     <View key={skill.id} style={s.skillRow}>
                        {skill.category && <Text style={s.skillCategory}>{skill.category}</Text>}
                        <Text style={s.skillItems}>{skill.items.join('  /  ')}</Text>
                     </View>
                  ))}
               </View>
            )}

            {projects.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Projects</Text>
                  <View style={s.divider} />
                  {projects.map((proj) => (
                     <View key={proj.id} style={s.entryBlock}>
                        <Text style={s.entryTitle}>{proj.name}</Text>
                        {proj.description && <Text style={s.bullet}>{proj.description}</Text>}
                        {proj.techStack && (
                           <Text style={[s.bullet, { color: '#94a3b8', fontSize: 9 }]}>{proj.techStack}</Text>
                        )}
                        {proj.link && <Text style={s.projectLink}>{proj.link}</Text>}
                     </View>
                  ))}
               </View>
            )}

            {certifications.length > 0 && (
               <View>
                  <Text style={s.sectionTitle}>Certifications</Text>
                  <View style={s.divider} />
                  {certifications.map((cert) => (
                     <View
                        key={cert.id}
                        style={[s.entryBlock, { flexDirection: 'row', justifyContent: 'space-between' }]}
                     >
                        <View>
                           <Text style={s.entryTitle}>{cert.name}</Text>
                           {cert.issuer && <Text style={s.entrySubtitle}>{cert.issuer}</Text>}
                        </View>
                        {cert.date && <Text style={s.entryDate}>{cert.date}</Text>}
                     </View>
                  ))}
               </View>
            )}

            {customSections.map((section) => (
               <View key={section.id}>
                  <Text style={s.sectionTitle}>{section.title || 'Additional'}</Text>
                  <View style={s.divider} />
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
