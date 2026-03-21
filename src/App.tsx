import { useRef, useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CustomCursor } from './components/CustomCursor';
import { EasterEgg } from './components/EasterEgg';
import { Footer } from './components/Footer';
import { IntroAnimation } from './components/IntroAnimation';
import { Terminal } from './components/Terminal';
import { profileData } from './data/profile';
import { useGithubProjects } from './hooks/useGithubProjects';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useLanguage } from './i18n/context';
import { ContactSection } from './sections/ContactSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const projectsState = useGithubProjects();
  const { t, lang, toggleLang } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const { activeSection, sectionIds, scrollToSection } = useSmoothScroll({
    containerRef: mainRef,
  });

  const navItems = [
    { href: '#projetos', label: t('nav.projects') },
    { href: '#stack', label: t('nav.stack') },
    { href: '#experiencia', label: t('nav.experience') },
    { href: '#formacao', label: t('nav.education') },
    { href: '#contato', label: t('nav.contact') },
  ];

  const sectionLabels: Record<string, string> = {
    inicio: t('nav.home'),
    projetos: t('nav.projects'),
    stack: t('nav.stack'),
    experiencia: t('nav.experience'),
    formacao: t('nav.education'),
    contato: t('nav.contact'),
  };

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href.replace('#', ''));
    closeMenu();
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <IntroAnimation />
      <AnimatedBackground />
      <CustomCursor />
      <Terminal />
      <EasterEgg />
      <div className="app-shell">
        <header className="topbar">
          <button type="button" className="brand" onClick={(e) => handleNavClick(e, '#inicio')}>
            <span className="brand__name">{profileData.displayName}</span>
            <span className="brand__meta">{profileData.githubUsername} • backend portfolio</span>
          </button>

          <nav aria-label={t('nav.aria_main')}>
            <ul className="topbar__nav">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={activeSection === item.href.replace('#', '') ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="topbar__controls">
            <button 
              type="button"
              className="lang-toggle" 
              onClick={toggleLang}
              aria-label="Toggle Language"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <button 
              type="button"
              className="hamburger" 
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <title>Menu Toggle</title>
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </header>

        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.replace('#', '') ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <main ref={mainRef}>
          <section id="inicio" data-section="inicio"><HeroSection /></section>
          <section id="projetos" data-section="projetos"><ProjectsSection {...projectsState} /></section>
          <section id="stack" data-section="stack"><SkillsSection /></section>
          <section id="experiencia" data-section="experiencia"><ExperienceSection /></section>
          <section id="formacao" data-section="formacao"><EducationSection /></section>
          <section id="contato" data-section="contato"><ContactSection /></section>
        </main>

        <nav className="nav-dots" aria-label="Section navigation">
          {sectionIds.map((id) => (
            <button
              key={id}
              type="button"
              className={`nav-dot ${activeSection === id ? 'nav-dot--active' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-label={t('nav.aria_go_to') + ' ' + (sectionLabels[id] ?? id)}
            />
          ))}
        </nav>

        <Footer />
      </div>
    </>
  );
}

export default App;
