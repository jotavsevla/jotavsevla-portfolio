import { useLanguage } from '../i18n/context';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        padding: '0.5rem 1rem',
        background: 'rgba(168, 85, 247, 0.2)',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        borderRadius: '8px',
        color: '#f0eef6',
        fontFamily: "'JetBrains Mono Variable', monospace",
        fontSize: '0.8rem',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={`Switch language, current: ${lang.toUpperCase()}`}
    >
      {lang.toUpperCase()}
    </button>
  );
}
