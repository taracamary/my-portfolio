const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ru'];

export const initLanguage = () => {
  const savedLang = localStorage.getItem('lang');
  const currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : DEFAULT_LANG;

  document.documentElement.setAttribute('lang', currentLang);
};

/**
 * Настройка переключателя языков
 * @param {HTMLElement} langBtn
 */
export const setupLanguage = (langBtn) => {
  if (!langBtn) return;

  const updateToggleState = () => {
    const currentLang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;

    langBtn.setAttribute('aria-pressed', String(currentLang === 'ru'));
    langBtn.setAttribute(
      'aria-label',
      currentLang === 'ru'
        ? 'Переключить язык на английский'
        : 'Switch language to Russian'
    );
  };

  const toggleLang = () => {
    const currentLang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    const newLang = currentLang === 'en' ? 'ru' : 'en';

    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('lang', newLang);
    updateToggleState();
    window.dispatchEvent(new Event('portfolio:languagechange'));
  };

  const handleClick = () => {
    if (document.startViewTransition) {
      document.startViewTransition(toggleLang);
    } else {
      toggleLang();
    }
  };

  updateToggleState();
  langBtn.addEventListener('click', handleClick);
  window.addEventListener('portfolio:languagechange', updateToggleState);

  return () => {
    langBtn.removeEventListener('click', handleClick);
    window.removeEventListener('portfolio:languagechange', updateToggleState);
  };
};
