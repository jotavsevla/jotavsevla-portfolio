import { SectionHeading } from '../components/SectionHeading';
import { experiences } from '../data/profile';

export function ExperienceSection() {
  return (
    <section id="experiencia" className="section">
      <SectionHeading
        eyebrow="Experiência"
        title="Execução sob contexto real"
        description="Vivência profissional com atendimento técnico, priorização e comunicação operacional de qualidade."
      />

      <div className="timeline">
        {experiences.map((experience) => (
          <article className="timeline-card" key={experience.role} data-reveal>
            <div className="timeline-card__header">
              <h3>{experience.role}</h3>
              <p>
                {experience.period} • {experience.location}
              </p>
            </div>
            <ul>
              {experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
