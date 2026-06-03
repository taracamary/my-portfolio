/**
 * Настройка переключателя языков
 * @param {HTMLElement} langBtn 
 */
export const setupLanguage = (langBtn) => {
  if (!langBtn) return;

  const toggleLang = () => {
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    const newLang = currentLang === 'en' ? 'ru' : 'en';

    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('lang', newLang);
  };

  langBtn.addEventListener('click', () => {
    if (document.startViewTransition) {
      document.startViewTransition(toggleLang);
    } else {
      toggleLang();
    }
  });
};
