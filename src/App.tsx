import { ThemeToggle } from './components/ThemeToggle';
import { profileData } from './data/profile';
import { useGithubProjects } from './hooks/useGithubProjects';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useTheme } from './hooks/useTheme';
import { ContactSection } from './sections/ContactSection';
import { DifferentialSection } from './sections/DifferentialSection';
import { EducationSection } from './sections/EducationSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';

const NAV_ITEMS = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#stack', label: 'Stack' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#contato', label: 'Contato' },
];

function App() {
  const { theme, toggleTheme } = useTheme();
  const projectsState = useGithubProjects();

  useRevealOnScroll();

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand__name">{profileData.displayName}</span>
          <span className="brand__meta">{profileData.githubUsername} • backend portfolio</span>
        </a>

        <nav aria-label="Navegação principal">
          <ul className="topbar__nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main>
        <HeroSection />
        <ProjectsSection {...projectsState} />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <DifferentialSection />
        <ContactSection />
      </main>

      <footer className="footer">
        <p>
          Portfólio de {profileData.displayName} • construído com React + Vite • tema {theme}
        </p>
      </footer>
    </div>
  );
}

export default App;
