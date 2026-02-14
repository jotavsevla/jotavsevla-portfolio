import { profileData } from '../data/profile';

const EMAIL_SUBJECT = encodeURIComponent('Oportunidade de estágio backend');

export function HeroSection() {
  const mailtoLink = `mailto:${profileData.email}?subject=${EMAIL_SUBJECT}`;

  return (
    <section className="hero" id="inicio">
      <div className="hero__content" data-reveal>
        <p className="hero__eyebrow">Disponível para estágio</p>
        <h1>{profileData.heroHeadline}</h1>
        <p className="hero__summary">{profileData.shortBio}</p>

        <ul className="hero__highlights">
          {profileData.heroHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="hero__actions">
          <a className="btn btn--primary" href={mailtoLink}>
            Enviar e-mail
          </a>
          <a className="btn btn--secondary" href={profileData.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href="/cv/JoaoCV.pdf" target="_blank" rel="noreferrer">
            Ver CV
          </a>
          <a className="btn btn--ghost" href="/cv/JoaoCV.pdf" download>
            Baixar CV
          </a>
        </div>
      </div>

      <aside className="hero__panel" data-reveal>
        <img src={profileData.avatarUrl} alt={profileData.displayName} className="hero__avatar" loading="eager" />
        <div className="hero__identity">
          <p className="hero__name">{profileData.displayName}</p>
          <p>{profileData.role}</p>
          <p>{profileData.location}</p>
        </div>
        <div className="hero__links">
          <a href={profileData.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profileData.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={mailtoLink}>Email</a>
        </div>
      </aside>
    </section>
  );
}
