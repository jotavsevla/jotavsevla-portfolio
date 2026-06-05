export type Lang = 'pt' | 'en';

export interface Poc2WorkItem {
  title: string;
  code: string;
  kind: string;
  stack: string;
  status: 'production' | 'academic' | 'personal' | 'open_source';
  year: number;
  bullets: string[];
}

export interface Poc2StackGroup {
  title: string;
  manifesto: string;
  contexts: string[];
}

export interface Poc2TrajectoryEntry {
  role: string;
  period: string;
  location: string;
  bullets: string[];
  badge?: string;
}

export interface Poc2StatItem {
  value: string;
  label: string;
}

export interface Poc2Dict {
  nav: {
    role_line: string;
    works: string;
    stack?: string;
    archive: string;
    about: string;
    contact: string;
    copy_email: string;
    copied: string;
  };
  hero: {
    status: string;
    display_year: string;
    caption_top: string;
    scroll_to_read: string;
    sub_by: string;
  };
  thesis: {
    eyebrow: string;
    pre: string;
    em: string;
    post: string;
  };
  about: {
    eyebrow: string;
    lead: string;
    paragraphs: string[];
  };
  stats: {
    aria: string;
    lead: string;
    items: Poc2StatItem[];
  };
  works: {
    section_title: string;
    section_eyebrow: string;
    section_meta: string;
    read_more: string;
    status: {
      production: string;
      academic: string;
      personal: string;
      open_source: string;
    };
    items: Poc2WorkItem[];
  };
  stack: {
    section_title: string;
    section_meta: string;
    in_this_chapter: string;
    also_eyebrow: string;
    groups: Poc2StackGroup[];
  };
  quote: {
    text: string;
    attr_role: string;
  };
  trajectory: {
    section_title: string;
    section_eyebrow: string;
    section_meta: string;
    now_label: string;
    entries: Poc2TrajectoryEntry[];
  };
  education: {
    eyebrow: string;
    section_title: string;
    languages_title: string;
  };
  education_data: {
    course: string;
    institution: string;
    period: string;
    subjects: string[];
  };
  languages_data: { name: string; level: string }[];
  contact: {
    eyebrow: string;
    section_title: string;
    section_meta: string;
    mail_prefix_em: string;
    mail_prefix_to: string;
  };
  footer: {
    version: string;
    col_index: string;
    col_links: string;
    col_now: string;
    col_colophon: string;
    now_lines: string[];
    colophon: string;
  };
  drawer: {
    view_repo: string;
    close: string;
    label_stack: string;
    label_repo: string;
    label_year: string;
  };
}

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
  poc2: Poc2Dict;
}
