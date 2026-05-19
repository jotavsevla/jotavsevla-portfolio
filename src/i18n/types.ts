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
  poc2: {
    nav: {
      role_line: string;
      works: string;
      archive: string;
      about: string;
      contact: string;
      copy_email: string;
      copied: string;
    };
    spine: {
      issue: string;
      coll: string;
    };
    hero: {
      caption_pre: string;
      caption_em: string;
      caption_post: string;
      bio_pre: string;
      bio_footnote_marker: string;
      bio_post: string;
      bio_footnote: string;
    };
    works: {
      section_title: string;
      section_meta: string;
      items: { title: string; code: string; kind: string; stack: string; year: number }[];
    };
    stack: {
      section_title: string;
      section_meta: string;
    };
    trajectory: {
      section_title: string;
      section_meta: string;
    };
    education: {
      section_title: string;
      languages_title: string;
    };
    contact: {
      section_title: string;
      section_meta: string;
      mail_prefix_em: string;
      mail_prefix_to: string;
    };
    footer: {
      version: string;
      marquee: string[];
      colophon: string;
    };
    drawer: {
      view_repo: string;
      close: string;
      label_stack: string;
      label_repo: string;
      label_year: string;
    };
  };
}
