import { SectionHeading } from '../components/SectionHeading';
import { education, languages } from '../data/profile';

export function EducationSection() {
  return (
    <section id="formacao" className="section section--two-columns">
      <article className="panel" data-reveal>
        <SectionHeading eyebrow="Formação" title={education.course} description={`${education.institution} • ${education.period}`} />
        <ul className="tag-list">
          {education.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </article>

      <article className="panel" data-reveal>
        <SectionHeading eyebrow="Idiomas" title="Comunicação internacional" />
        <ul className="languages-list">
          {languages.map((language) => (
            <li key={language.name}>
              <span>{language.name}</span>
              <strong>{language.level}</strong>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
