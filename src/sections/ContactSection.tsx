import { SectionHeading } from '../components/SectionHeading';
import { profileData } from '../data/profile';

const EMAIL_SUBJECT = encodeURIComponent('Conversa sobre backend e engenharia');

export function ContactSection() {
  return (
    <section id="contato" className="section">
      <div className="contact" data-reveal>
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar sobre backend e produto"
          description="Se quiser discutir projeto técnico, colaboração ou oportunidade alinhada ao meu perfil, me chama por e-mail ou LinkedIn."
        />

        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${profileData.email}?subject=${EMAIL_SUBJECT}`}>
            Enviar e-mail
          </a>
          <a className="btn btn--secondary" href={profileData.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href={profileData.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn--ghost" href="/cv/JoaoCV.pdf" target="_blank" rel="noreferrer">
            Abrir CV
          </a>
        </div>
      </div>
    </section>
  );
}
