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

  const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  toggleBtn.addEventListener('click', () => {
    if (document.startViewTransition) {
      document.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
  });
};
