export type Lang = 'pt' | 'en';

export interface TranslationDict {
  nav: {
    projects: string;
    stack: string;
    experience: string;
    contact: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    summary: string;
    highlights: string[];
    cta_email: string;
    cta_linkedin: string;
    cta_cv_view: string;
    cta_cv_download: string;
    role: string;
    location: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    fallback_warning: string;
    last_updated: string;
    no_recent: string;
    stars: string;
    forks: string;
    view_github: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    groups: {
      stack_principal: string;
      quality: string;
      fundamentals: string;
      learning: string;
    };
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
  };
  education: {
    eyebrow: string;
    title: string;
    description: string;
    period_label: string;
    current: string;
    subjects_label: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta_email: string;
    cta_github: string;
    cta_cv: string;
  };
  footer: {
    built_with: string;
    portfolio_of: string;
  };
  terminal: {
    title: string;
    prompt: string;
    placeholder: string;
    help_hint: string;
    unknown_command: string;
    commands: {
      help: string;
      about: string;
      skills: string;
      projects: string;
      contact: string;
      clear: string;
      whoami: string;
    };
  };
  common: {
    loading: string;
    error: string;
    language: string;
    close: string;
  };
}
