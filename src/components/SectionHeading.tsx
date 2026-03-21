interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading" data-reveal>
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 className="glitch--subtle" data-glitch={title}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
