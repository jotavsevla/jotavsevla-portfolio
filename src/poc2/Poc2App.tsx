import { useState } from 'react';
import { profileData } from '../data/profile';
import { useLanguage } from '../i18n/context';
import { useActiveSection } from '../poc-shared/useActiveSection';
import { useParallaxRefs } from '../poc-shared/useParallaxRefs';
import { usePullquoteSlide } from '../poc-shared/usePullquoteSlide';
import { useScrollProgress } from '../poc-shared/useScrollProgress';
import { WorkDrawer, type WorkItem } from './WorkDrawer';
import './poc2.css';

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

const CHAPTER_BG = ['', 'poc2-chapter--lilac', 'poc2-chapter--mint'];

export function Poc2App() {
  const { dict, lang, toggleLang } = useLanguage();
  const t = dict.poc2;
  const mailto = `mailto:${profileData.email}?subject=${encodeURIComponent('Backend conversation')}`;
  const now = new Date();
  const datestamp = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const [copied, copyEmail] = useCopyEmail(profileData.email);
  const activeSection = useActiveSection(SECTION_IDS);
  const [openWork, setOpenWork] = useState<WorkItem | null>(null);
  const scrollProgress = useScrollProgress();
  useParallaxRefs('.poc2-chapter__num', 36);
  usePullquoteSlide();

  // Take first 3 capabilities as "chapters"
  const chapterCapabilities = t.stack.groups.slice(0, 3);
  // Remaining capabilities listed as compact rows
  const otherCapabilities = t.stack.groups.slice(3);

  return (
    <div className="poc2">
      {/* ── Scroll progress ─────────────────────────────────────────── */}
      <div className="poc2-progress" aria-hidden="true">
        <div className="poc2-progress__bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      {/* ── Top nav ─────────────────────────────────────────────────── */}
      <header className="poc2-nav">
        <div className="poc2-nav__brand">
          <span className="poc2-nav__brand-mark">JV</span>
          <span className="poc2-nav__brand-meta">{lang === 'pt' ? '26 · PORTFÓLIO' : '26 · PORTFOLIO'}</span>
        </div>

        <div className="poc2-nav__center">
          <button
            type="button"
            className={`poc2-nav__cta ${copied ? 'poc2-nav__cta--copied' : ''}`}
            onClick={copyEmail}
          >
            {copied ? t.nav.copied : t.nav.copy_email} <span aria-hidden="true">→</span>
          </button>
        </div>

        <nav className="poc2-nav__menu" aria-label="Sections">
          <a href="#work" className={activeSection === 'work' ? 'is-active' : ''}>{t.nav.works}</a>
          <a href="#stack" className={activeSection === 'stack' ? 'is-active' : ''}>{t.nav.stack ?? 'Stack'}</a>
          <a href="#archive" className={activeSection === 'archive' ? 'is-active' : ''}>{t.nav.archive}</a>
          <a href="#contact" className={activeSection === 'contact' ? 'is-active' : ''}>{t.nav.contact}</a>
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
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="poc2-hero">
        <div className="poc2-hero__inner">
          <div className="poc2-hero__top">
            <p className="poc2-hero__caption">{t.hero.caption_top}</p>
            <a className="poc2-hero__scroll" href="#thesis">
              {t.hero.scroll_to_read} <span className="poc2-hero__scroll-arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          <h1 className="poc2-hero__display">
            <span className="poc2-hero__display-line">João Victor Araújo</span>
            <span className="poc2-hero__display-line">{t.hero.display_year}</span>
          </h1>

          <div className="poc2-hero__sub">
            <p className="poc2-hero__sub-by">{t.hero.sub_by}</p>
            <span className="poc2-hero__sub-status">
              <span className="poc2-hero__sub-dot" aria-hidden="true" />
              {t.hero.status}
            </span>
          </div>
        </div>
      </section>

      {/* ── Thesis (An inflection point) ────────────────────────────── */}
      <span id="thesis" />
      <div className="poc2-eyebrow">{t.thesis.eyebrow}</div>
      <section className="poc2-thesis">
        <p className="poc2-thesis__text">
          {t.thesis.pre}<em>{t.thesis.em}</em>{t.thesis.post}
        </p>
      </section>
      <hr className="poc2-rule" />

      {/* ── About block ─────────────────────────────────────────────── */}
      <div className="poc2-eyebrow">{t.about.eyebrow}</div>
      <section className="poc2-about">
        <p className="poc2-about__lead">{t.about.lead}</p>
        <div className="poc2-about__body">
          {t.about.paragraphs.map((p, i) => <p key={`about-${i}`}>{p}</p>)}
        </div>
      </section>

      {/* ── Pull quote ──────────────────────────────────────────────── */}
      <section className="poc2-pullquote">
        <div className="poc2-pullquote__author">
          <span className="poc2-pullquote__open" aria-hidden="true">“</span>
          <div>
            <p className="poc2-pullquote__author-name">{profileData.fullName.split(' ').slice(0, 2).join(' ')}</p>
            <p className="poc2-pullquote__author-role">{t.quote.attr_role}</p>
          </div>
        </div>
        <div className="poc2-pullquote__body">
          <p className="poc2-pullquote__text">{t.quote.text}</p>
        </div>
      </section>

      {/* ── Chapter bands (top 3 capabilities) ──────────────────────── */}
      <span id="stack" />
      {chapterCapabilities.map((cap, i) => (
        <section className={`poc2-chapter ${CHAPTER_BG[i]}`} key={cap.title}>
          <div className="poc2-chapter__inner">
            <div className="poc2-chapter__num">{String(i + 1).padStart(2, '0')}</div>
            <div className="poc2-chapter__body">
              <h2 className="poc2-chapter__title">{cap.title}</h2>
              <p className="poc2-chapter__desc">{cap.manifesto}</p>
              <p className="poc2-chapter__cover-label">{t.stack.in_this_chapter}</p>
              <ul className="poc2-chapter__bullets">
                {cap.contexts.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* ── Other capabilities (compact) ────────────────────────────── */}
      {otherCapabilities.length > 0 ? (
        <>
          <div className="poc2-eyebrow">{t.stack.also_eyebrow}</div>
          <section className="poc2-traj">
            <div className="poc2-traj__list">
              {otherCapabilities.map((cap, i) => (
                <div className="poc2-traj__row" key={cap.title}>
                  <div className="poc2-traj__period">{String(i + 4).padStart(2, '0')}</div>
                  <div className="poc2-traj__body">
                    <h3>{cap.title}</h3>
                    <p className="poc2-traj__loc">{cap.manifesto}</p>
                    <ul>
                      {cap.contexts.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {/* ── Featured Works grid ─────────────────────────────────────── */}
      <div className="poc2-eyebrow" id="work">{t.works.section_eyebrow}</div>
      <section className="poc2-works">
        <div className="poc2-works__head">
          <h2 className="poc2-works__title">{t.works.section_title}</h2>
          <span className="poc2-works__meta">{t.works.section_meta}</span>
        </div>

        <div className="poc2-works__grid">
          {t.works.items.map((w) => {
            const statusLabel = t.works.status[w.status as keyof typeof t.works.status] ?? w.status;
            return (
              <button
                type="button"
                className="poc2-case"
                key={w.code}
                onClick={() => setOpenWork(w)}
              >
                <div className={`poc2-case__media poc2-case__media--${w.status}`}>
                  <span className="poc2-case__media-label">{statusLabel}</span>
                  <span className="poc2-case__media-title">{w.title}</span>
                </div>
                <div className="poc2-case__body">
                  <div className="poc2-case__meta">
                    <span>{w.year}</span>
                    <span>{w.stack.split('·')[0].trim()}</span>
                  </div>
                  <p className="poc2-case__positioning">{w.kind}</p>
                  <span className="poc2-case__cta">
                    {t.works.read_more} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Trajectory ──────────────────────────────────────────────── */}
      <div className="poc2-eyebrow" id="archive">{t.trajectory.section_eyebrow}</div>
      <section className="poc2-traj">
        <div className="poc2-traj__head">
          <h2 className="poc2-traj__title">{t.trajectory.section_title}</h2>
          <span className="poc2-works__meta">{t.trajectory.section_meta}</span>
        </div>

        <div className="poc2-traj__list">
          {t.trajectory.entries.map((e, i) => {
            const isCurrent = i === 0;
            return (
              <article className={`poc2-traj__row ${isCurrent ? 'poc2-traj__row--current' : ''}`} key={e.role}>
                <div className="poc2-traj__period">
                  {isCurrent ? <span className="poc2-traj__now">{t.trajectory.now_label}</span> : null}
                  {e.period}
                </div>
                <div className="poc2-traj__body">
                  <h3>{e.role}</h3>
                  {e.badge ? <span className="poc2-traj__badge">{e.badge}</span> : null}
                  <p className="poc2-traj__loc">{e.location}</p>
                  <ul>
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Education / Languages ──────────────────────────────────── */}
      <div className="poc2-eyebrow">{t.education.eyebrow}</div>
      <section className="poc2-edu-block">
        <div className="poc2-edu">
          <h2 className="poc2-edu__title">{t.education.section_title}</h2>
          <article>
            <h3>{t.education_data.course}</h3>
            <p>{t.education_data.institution} · {t.education_data.period}</p>
            <ul>
              {t.education_data.subjects.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>
        </div>
        <div className="poc2-langs">
          <h2 className="poc2-langs__title">{t.education.languages_title}</h2>
          <ul>
            {t.languages_data.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <span>{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="poc2-stats" aria-label={t.stats.aria}>
        <div className="poc2-stats__inner">
          <p className="poc2-stats__lead">{t.stats.lead}</p>
          {t.stats.items.map((stat) => (
            <article className="poc2-stat" key={stat.label}>
              <div className="poc2-stat__value">{stat.value}</div>
              <div className="poc2-stat__label">{stat.label}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────── */}
      <div className="poc2-eyebrow" id="contact">{t.contact.eyebrow}</div>
      <section className="poc2-contact">
        <div className="poc2-contact__head">
          <h2 className="poc2-contact__title">{t.contact.section_title}</h2>
          <span className="poc2-works__meta">{t.contact.section_meta}</span>
        </div>
        <a className="poc2-contact__mail" href={mailto}>
          {profileData.email} ↗
        </a>
        <div className="poc2-contact__row">
          <a href={profileData.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a href={profileData.github} target="_blank" rel="noreferrer">github</a>
          <a href="/cv/JoaoCV.pdf" target="_blank" rel="noreferrer">curriculum.pdf</a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="poc2-foot">
        <div className="poc2-foot__inner">
          <p className="poc2-foot__display">João Victor Araújo 2026</p>

          <div className="poc2-foot__columns">
            <div className="poc2-foot__col">
              <h4>{t.footer.col_index}</h4>
              <ul>
                <li><a href="#work">{t.nav.works}</a></li>
                <li><a href="#stack">{t.nav.stack ?? 'Stack'}</a></li>
                <li><a href="#archive">{t.nav.archive}</a></li>
                <li><a href="#contact">{t.nav.contact}</a></li>
              </ul>
            </div>
            <div className="poc2-foot__col">
              <h4>{t.footer.col_links}</h4>
              <ul>
                <li><a href={profileData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href={profileData.github} target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href={mailto}>Email</a></li>
                <li><a href="/cv/JoaoCV.pdf" target="_blank" rel="noreferrer">CV (PDF)</a></li>
              </ul>
            </div>
            <div className="poc2-foot__col">
              <h4>{t.footer.col_now}</h4>
              <ul>
                <li>{t.footer.now_lines[0]}</li>
                <li>{t.footer.now_lines[1]}</li>
                <li>{t.footer.now_lines[2]}</li>
              </ul>
            </div>
            <div className="poc2-foot__col">
              <h4>{t.footer.col_colophon}</h4>
              <ul>
                <li>{t.footer.colophon}</li>
              </ul>
            </div>
          </div>

          <div className="poc2-foot__bottom">
            <span>© {now.getFullYear()} — {profileData.fullName}</span>
            <span>{datestamp}</span>
          </div>
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
