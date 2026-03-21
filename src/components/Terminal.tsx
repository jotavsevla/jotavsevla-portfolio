import { useCallback, useEffect, useRef, useState } from 'react';
import { profileData } from '../data/profile';
import { gsap, useGSAP } from '../hooks/useGsap';
import { useLanguage } from '../i18n/context';
import '../styles/terminal.css';

type TerminalLine = { type: 'system' | 'input' | 'output' | 'error'; text: string };

const COMMAND_NAMES = [
  'help',
  'about',
  'projects',
  'skills',
  'experience',
  'contact',
  'lang',
  'clear',
  'github',
  'secret',
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

export function Terminal() {
  const { lang, toggleLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: 'Portfolio Terminal v1.0.0' },
    { type: 'system', text: t('terminal.help_hint') },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollOutput = useCallback(() => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, []);

  const addLines = useCallback(
    (newLines: TerminalLine[]) => {
      setLines((prev) => [...prev, ...newLines]);
      scrollOutput();
    },
    [scrollOutput]
  );

  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().toLowerCase();
      const [cmd, ...args] = trimmed.split(/\s+/);

      const commands: Record<string, () => void> = {
        help: () =>
          addLines([
            { type: 'output', text: 'Available commands:' },
            { type: 'output', text: '  about       \u2014 About me' },
            { type: 'output', text: '  projects    \u2014 View projects' },
            { type: 'output', text: '  skills      \u2014 View tech stack' },
            { type: 'output', text: '  experience  \u2014 Work history' },
            { type: 'output', text: '  contact     \u2014 Contact info' },
            { type: 'output', text: '  lang [pt|en] \u2014 Switch language' },
            { type: 'output', text: '  github      \u2014 Open GitHub profile' },
            { type: 'output', text: '  clear       \u2014 Clear terminal' },
            { type: 'output', text: '  secret      \u2014 ???' },
          ]),
        about: () => {
          addLines([
            { type: 'output', text: `\u{1F4CB} ${profileData.displayName}` },
            { type: 'output', text: `   ${profileData.role}` },
            { type: 'output', text: '' },
            { type: 'output', text: `   ${profileData.shortBio}` },
          ]);
          scrollToSection('inicio');
        },
        projects: () => {
          addLines([
            { type: 'output', text: '\u{1F4C2} Scrolling to projects...' },
            { type: 'output', text: `   Check out my repos at ${profileData.github}` },
          ]);
          scrollToSection('projetos');
        },
        skills: () => {
          addLines([
            { type: 'output', text: '\u{1F6E0}\uFE0F Tech Stack:' },
            { type: 'output', text: '   Java (21 & 25) \u2022 JDBC \u2022 PostgreSQL \u2022 SQL' },
            { type: 'output', text: '   REST APIs \u2022 Docker Compose \u2022 TDD' },
            { type: 'output', text: '   JUnit 5 \u2022 pytest \u2022 Integration Tests' },
          ]);
          scrollToSection('stack');
        },
        experience: () => {
          addLines([
            { type: 'output', text: '\u{1F4BC} Work Experience:' },
            { type: 'output', text: '   Mercado Livre (AeC, CLT) \u2022 06/2024 - 12/2025' },
            { type: 'output', text: '   Customer Support \u2022 NPS > 30%' },
          ]);
          scrollToSection('experiencia');
        },
        contact: () => {
          addLines([
            { type: 'output', text: `\u{1F4E7} ${profileData.email}` },
            { type: 'output', text: `\u{1F517} ${profileData.linkedin}` },
          ]);
          scrollToSection('contato');
        },
        lang: () => {
          const target = args[0];
          if (target === 'pt' || target === 'en') {
            if (target !== lang) {
              toggleLang();
              addLines([{ type: 'output', text: `Language switched to ${target.toUpperCase()}.` }]);
            } else {
              addLines([{ type: 'output', text: `Already using ${target.toUpperCase()}.` }]);
            }
          } else {
            addLines([
              { type: 'output', text: `Current language: ${lang.toUpperCase()}` },
              { type: 'output', text: 'Usage: lang [pt|en]' },
            ]);
          }
        },
        clear: () => setLines([]),
        github: () => {
          window.open(profileData.github, '_blank');
          addLines([{ type: 'output', text: 'Opening GitHub...' }]);
        },
        secret: () =>
          addLines([
            {
              type: 'output',
              text: '\u{1F52E} Try the Konami Code on the page... \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA',
            },
          ]),
      };

      if (!cmd) return;

      const handler = commands[cmd];
      if (handler) {
        handler();
      } else {
        addLines([
          {
            type: 'error',
            text: `Command not found: ${cmd}. Type 'help' for available commands.`,
          },
        ]);
      }
    },
    [addLines, lang, toggleLang]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const value = input.trim();
        if (value) {
          addLines([{ type: 'input', text: `$ ${value}` }]);
          setHistory((prev) => [...prev, value]);
          executeCommand(value);
        }
        setInput('');
        setHistoryIndex(-1);
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.trim().toLowerCase();
        if (!partial) return;
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          addLines([{ type: 'output', text: matches.join('  ') }]);
        }
      }
    },
    [input, history, historyIndex, addLines, executeCommand]
  );



  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useGSAP(
    () => {
      if (!terminalRef.current) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isOpen) {
        gsap.fromTo(
          terminalRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: prefersReduced ? 0 : 0.3,
            ease: 'power2.out',
          }
        );
      }
    },
    { scope: terminalRef, dependencies: [isOpen] }
  );

  return (
    <>
      <button
        type="button"
        className="terminal-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Terminal</title>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </button>

      {isOpen && (
        <div ref={terminalRef} className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-header__dots">
              <span className="terminal-header__dot terminal-header__dot--red" />
              <span className="terminal-header__dot terminal-header__dot--yellow" />
              <span className="terminal-header__dot terminal-header__dot--green" />
            </div>
            <span className="terminal-header__title">{t('terminal.prompt')} ~ terminal</span>
            <button
              type="button"
              className="terminal-header__close"
              onClick={() => setIsOpen(false)}
              aria-label={t('common.close')}
            >
              &times;
            </button>
          </div>

          <div ref={outputRef} className="terminal-output" role="log" aria-live="polite" aria-label="Terminal output">
            {lines.map((line, idx) => (
              <div key={`tl-${idx.toString()}-${line.type}`} className={`terminal-line terminal-line--${line.type}`}>
                {line.text}
              </div>
            ))}
          </div>

          <div className="terminal-input-row">
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setHistoryIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder={t('terminal.placeholder')}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      )}
    </>
  );
}
