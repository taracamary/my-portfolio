/**
 * Модуль управления цветовой темой (светлая / тёмная)
 *
 * Используется для:
 * - установки темы при старте страницы без мерцания (initTheme)
 * - переключения темы по кнопке и синхронизации aria-состояния (setupTheme)
 *
 * Особенности реализации:
 * - Тема хранится в localStorage; при отсутствии записи определяется
 *   через prefers-color-scheme, чтобы соответствовать системным настройкам
 * - Переключение оборачивается в document.startViewTransition (если браузер
 *   поддерживает), что даёт плавный cross-fade без дополнительных CSS-анимаций
 * - Метка кнопки обновляется при смене языка через кастомное событие
 *   'portfolio:languagechange', поэтому модуль не зависит напрямую от lang.js
 */

// Применяет тему до рендера DOM — вызывается в main.js до DOMContentLoaded
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Если пользователь раньше выбирал тему — берём её; иначе смотрим на ОС
  const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
};

// Навешивает обработчик клика и следит за актуальностью aria-атрибутов кнопки
export const setupTheme = (toggleBtn) => {
  if (!toggleBtn) return;

  // Синхронизирует aria-pressed и aria-label с текущим состоянием темы и языка
  const updateToggleState = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const lang = document.documentElement.getAttribute('lang') || 'en';

    toggleBtn.setAttribute('aria-pressed', String(isLight));
    toggleBtn.setAttribute(
      'aria-label',
      lang === 'ru'
        ? `Переключить на ${isLight ? 'темную' : 'светлую'} тему`
        : `Switch to ${isLight ? 'dark' : 'light'} theme`,
    );
  };

  // Применяет новую тему и сохраняет выбор пользователя в localStorage
  const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleState();
  };

  // Оборачивает смену темы в View Transition для плавного cross-fade, если API поддерживается браузером
  const handleClick = () => {
    if (document.startViewTransition) {
      document.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
  };

  updateToggleState();
  toggleBtn.addEventListener('click', handleClick);

  // Перерисовываем метку кнопки при переключении языка интерфейса
  window.addEventListener('portfolio:languagechange', updateToggleState);

  // Возвращаем функцию очистки для возможного демонтажа модуля
  return () => {
    toggleBtn.removeEventListener('click', handleClick);
    window.removeEventListener('portfolio:languagechange', updateToggleState);
  };
};
