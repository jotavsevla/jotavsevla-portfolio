import { SectionHeading } from '../components/SectionHeading';
import { skillGroups } from '../data/profile';

export function SkillsSection() {
  return (
    <section id="stack" className="section">
      <SectionHeading
        eyebrow="Stack"
        title="Competências técnicas"
        description="Base de backend, qualidade e fundamentos aplicada em projetos reais e acadêmicos."
      />

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title} data-reveal>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
