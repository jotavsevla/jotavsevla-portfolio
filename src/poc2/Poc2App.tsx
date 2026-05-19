import { useEffect, useState } from 'react';
import { profileData, skillGroups, experiences, education, languages } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { StackCube } from '../poc-shared/StackCube';
import { CursorDot } from '../poc-shared/CursorDot';
import { useSmoothPage } from '../poc-shared/useSmoothPage';
import { useActiveSection } from '../poc-shared/useActiveSection';
import { useSplitReveal } from '../poc-shared/useSplitReveal';
import { WorkDrawer, type WorkItem } from './WorkDrawer';
import './poc2.css';

function useScrollPct(): number {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
      setPct(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return pct;
}

function useCopyEmail(email: string): [boolean, () => void] {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }).catch(() => null);
  };
  return [copied, copy];
}

const SECTION_IDS = ['work', 'stack', 'archive', 'about', 'contact'];

export function Poc2App() {
  useSmoothPage();
  const { dict, lang, toggleLang } = useLanguage();
  const t = dict.poc2;
  const mailto = `mailto:${profileData.email}?subject=${encodeURIComponent('Backend conversation')}`;
  const now = new Date();
  const issue = `N°${String(now.getFullYear() - 2023).padStart(3, '0')}`;
  const ref = `EDI-${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}-R02`;
  const pct = useScrollPct();
  const [copied, copyEmail] = useCopyEmail(profileData.email);
  const activeSection = useActiveSection(SECTION_IDS);
  const [openWork, setOpenWork] = useState<WorkItem | null>(null);

  // split text reveal — re-runs on language change so lines are re-measured
  useSplitReveal('.poc2-section__head h2, .poc2-contact__mail', lang);

  // Marquee items duplicated for seamless loop
  const marqueeItems = [...t.footer.marquee, ...t.footer.marquee];

  return (
    <div className="poc2">
      <CursorDot />

      {/* ── Sticky header: nav + spine glued together ───────────────────── */}
      <div className="poc2-header">
      <header className="poc2-nav">
        <div className="poc2-nav__brand">
          <span className="poc2-nav__name">{profileData.fullName.split(' ').slice(0, 2).join(' ')}</span>
          <span className="poc2-nav__role">{t.nav.role_line}</span>
        </div>
        <nav className="poc2-nav__menu" aria-label="Sections">
          <a href="#work" className={activeSection === 'work' ? 'is-active' : ''}>{t.nav.works}</a>
          <a href="#archive" className={activeSection === 'archive' ? 'is-active' : ''}>{t.nav.archive}</a>
          <a href="#about" className={activeSection === 'about' ? 'is-active' : ''}>{t.nav.about}</a>
          <a href="#contact" className={activeSection === 'contact' ? 'is-active' : ''}>{t.nav.contact}</a>
        </nav>
        <div className="poc2-nav__right">
          <button
            type="button"
            className="poc2-nav__lang"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            <span className={lang === 'pt' ? 'is-active' : ''}>PT</span>
            <span className="poc2-nav__lang-sep">/</span>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
          </button>
          <button
            type="button"
            className={`poc2-nav__copy ${copied ? 'poc2-nav__copy--copied' : ''}`}
            onClick={copyEmail}
          >
            {copied ? t.nav.copied : t.nav.copy_email} <span>↗</span>
          </button>
        </div>
      </header>

      {/* ── Spine: ref / issue / live scroll % ──────────────────────────── */}
      <div className="poc2-spine">
        <span>{t.spine.issue} {issue} / {t.spine.coll} {now.getFullYear()}</span>
        <span className="poc2-spine__sep">·</span>
        <span className="poc2-spine__ref">Ref. {ref}</span>
        <span className="poc2-spine__sep">·</span>
        <span className="poc2-spine__pct" aria-live="polite">{String(pct).padStart(2, '0')}%</span>
        <span className="poc2-spine__bar" aria-hidden="true">
          <span className="poc2-spine__bar-fill" style={{ width: `${pct}%` }} />
        </span>
      </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="poc2-hero">
        <div className="poc2-hero__inner">
          <p className="poc2-hero__caption">
            {t.hero.caption_pre} <em>{t.hero.caption_em}</em>{t.hero.caption_post}
          </p>
          <h1 className="poc2-hero__display">
            <span>João Victor</span>
            <span className="poc2-hero__display-em">Araújo</span>
          </h1>
          <div className="poc2-hero__row">
            <div className="poc2-hero__bio-wrap">
              <p className="poc2-hero__bio">
                {t.hero.bio_pre}
                <sup className="poc2-hero__bio-fn">{t.hero.bio_footnote_marker}</sup>
                {t.hero.bio_post}
              </p>
              <p className="poc2-hero__bio-footnote">{t.hero.bio_footnote}</p>
            </div>
            <div className="poc2-hero__cube">
              <StackCube size={260} variant="cream" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured works ──────────────────────────────────────────────── */}
      <section className="poc2-section" id="work">
        <div className="poc2-section__head">
          <span className="poc2-section__num">— 01</span>
          <h2>{t.works.section_title}</h2>
          <span className="poc2-section__meta">{t.works.section_meta}</span>
        </div>

        <ol className="poc2-works">
          {t.works.items.map((w, i) => (
            <li className="poc2-work" key={w.code}>
              <button
                type="button"
                className="poc2-work__link"
                onClick={() => setOpenWork(w)}
              >
                <span className="poc2-work__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="poc2-work__title">{w.title}</span>
                <span className="poc2-work__kind">{w.kind}</span>
                <span className="poc2-work__stack">{w.stack}</span>
                <span className="poc2-work__year">{w.year}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Stack ───────────────────────────────────────────────────────── */}
      <section className="poc2-section" id="stack">
        <div className="poc2-section__head">
          <span className="poc2-section__num">— 02</span>
          <h2>{t.stack.section_title}</h2>
          <span className="poc2-section__meta">{t.stack.section_meta}</span>
        </div>
        <div className="poc2-stack">
          {skillGroups.map((g, i) => (
            <article className="poc2-stack__card" key={g.title}>
              <header>
                <span className="poc2-stack__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.title}</h3>
              </header>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Trajectory ──────────────────────────────────────────────────── */}
      <section className="poc2-section" id="archive">
        <div className="poc2-section__head">
          <span className="poc2-section__num">— 03</span>
          <h2>{t.trajectory.section_title}</h2>
          <span className="poc2-section__meta">{t.trajectory.section_meta}</span>
        </div>
        <div className="poc2-traj">
          {experiences.map((e) => (
            <article className="poc2-traj__row" key={e.role}>
              <div className="poc2-traj__period">{e.period}</div>
              <div className="poc2-traj__body">
                <h3>{e.role}</h3>
                <p className="poc2-traj__loc">{e.location}</p>
                <ul>
                  {e.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section className="poc2-section poc2-section--split" id="about">
        <div>
          <div className="poc2-section__head">
            <span className="poc2-section__num">— 04</span>
            <h2>{t.education.section_title}</h2>
          </div>
          <article className="poc2-edu">
            <h3>{education.course}</h3>
            <p>{education.institution} · {education.period}</p>
            <ul>
              {education.subjects.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>
        </div>
        <div>
          <div className="poc2-section__head">
            <span className="poc2-section__num">— 05</span>
            <h2>{t.education.languages_title}</h2>
          </div>
          <ul className="poc2-langs">
            {languages.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span>{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section className="poc2-section poc2-contact" id="contact">
        <div className="poc2-contact__watermark" aria-hidden="true">JV.</div>
        <div className="poc2-contact__content">
          <div className="poc2-section__head">
            <span className="poc2-section__num">— 06</span>
            <h2>{t.contact.section_title}</h2>
            <span className="poc2-section__meta">{t.contact.section_meta}</span>
          </div>
          <a className="poc2-contact__mail" href={mailto}>
            <em>{t.contact.mail_prefix_em}</em> {t.contact.mail_prefix_to} {profileData.email} ↗
          </a>
          <div className="poc2-contact__row">
            <a href={profileData.linkedin} target="_blank" rel="noreferrer">linkedin</a>
            <a href={profileData.github} target="_blank" rel="noreferrer">github</a>
            <a href="/cv/JoaoCV.pdf" target="_blank" rel="noreferrer">curriculum.pdf</a>
          </div>
        </div>
      </section>

      {/* ── Footer: marquee + colophon + meta ───────────────────────────── */}
      <footer className="poc2-foot">
        <div className="poc2-marquee" aria-hidden="true">
          <div className="poc2-marquee__track">
            {marqueeItems.map((m, i) => (
              <span key={`${m}-${i}`} className="poc2-marquee__item">
                {m}
                <span className="poc2-marquee__sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        <p className="poc2-colophon">{t.footer.colophon}</p>

        <div className="poc2-foot__row">
          <span>© {now.getFullYear()} — {profileData.fullName}</span>
          <span>{t.footer.version}</span>
        </div>
      </footer>

      <WorkDrawer
        work={openWork}
        onClose={() => setOpenWork(null)}
        labelView={t.drawer.view_repo}
        labelClose={t.drawer.close}
        labelStack={t.drawer.label_stack}
        labelRepo={t.drawer.label_repo}
        labelYear={t.drawer.label_year}
      />
    </div>
  );
}
