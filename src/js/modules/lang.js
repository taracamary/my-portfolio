const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ru'];

export const initLanguage = () => {
  const savedLang = localStorage.getItem('lang');
  const currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : DEFAULT_LANG;

  document.documentElement.setAttribute('lang', currentLang);
};

// aria-label / alt cannot be toggled via CSS [lang] spans
const localizeAttributes = () => {
  const isRu = (document.documentElement.getAttribute('lang') || DEFAULT_LANG) === 'ru';

  document.querySelectorAll('[data-aria-label-en]').forEach((el) => {
    const value = isRu ? el.dataset.ariaLabelRu : el.dataset.ariaLabelEn;
    if (value) el.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-alt-en]').forEach((el) => {
    const value = isRu ? el.dataset.altRu : el.dataset.altEn;
    if (value != null) el.setAttribute('alt', value);
  });
};

export const setupLanguage = (langBtn) => {
  localizeAttributes();

  if (!langBtn) return;

  const updateToggleState = () => {
    const currentLang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;

    langBtn.setAttribute('aria-pressed', String(currentLang === 'ru'));
    langBtn.setAttribute(
      'aria-label',
      currentLang === 'ru'
        ? 'Переключить язык на английский'
        : 'Switch language to Russian',
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
  window.addEventListener('portfolio:languagechange', localizeAttributes);
};
