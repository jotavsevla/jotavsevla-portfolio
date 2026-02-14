import { SectionHeading } from '../components/SectionHeading';
import { differential } from '../data/profile';

export function DifferentialSection() {
  return (
    <section id="diferencial" className="section">
      <article className="differential" data-reveal>
        <SectionHeading eyebrow="Diferencial" title={differential.title} description={differential.body} />
        <ul>
          {differential.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
