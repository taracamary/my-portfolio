/**
 * Инициализация темы без анимации во избежание вспышки (FOUC)
 */
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', currentTheme);
};

/**
 * Настройка переключателя темы
 * @param {HTMLElement} toggleBtn
 */
export const setupTheme = (toggleBtn) => {
  if (!toggleBtn) return;

  const updateToggleState = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const lang = document.documentElement.getAttribute('lang') || 'en';

    toggleBtn.setAttribute('aria-pressed', String(isLight));
    toggleBtn.setAttribute(
      'aria-label',
      lang === 'ru'
        ? `Переключить на ${isLight ? 'темную' : 'светлую'} тему`
        : `Switch to ${isLight ? 'dark' : 'light'} theme`
    );
  };

  const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleState();
  };

  const handleClick = () => {
    if (document.startViewTransition) {
      document.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
  };

  updateToggleState();
  toggleBtn.addEventListener('click', handleClick);
  window.addEventListener('portfolio:languagechange', updateToggleState);

  return () => {
    toggleBtn.removeEventListener('click', handleClick);
    window.removeEventListener('portfolio:languagechange', updateToggleState);
  };
};
