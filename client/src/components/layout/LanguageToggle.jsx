import { useTranslation } from 'react-i18next';
import './LanguageToggle.css';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  function toggle() {
    const next = current === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('greenfco_lang', next);
  }

  return (
    <button className="lang-toggle" onClick={toggle} title="Toggle language">
      <span className={current === 'fr' ? 'active' : ''}>FR</span>
      <span className="separator">|</span>
      <span className={current === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
}
