import { profileData } from '../data/profile';
import { useLanguage } from '../i18n/context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <span>
        {t('footer.portfolio_of')} <strong>{profileData.displayName}</strong>
      </span>
      <span className="footer__sep">•</span>
      <span>{t('footer.built_with')}</span>
      <span className="footer__sep">•</span>
      <span className="footer__year">{new Date().getFullYear()}</span>
    </footer>
  );
}
