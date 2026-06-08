/**
 * Модуль управления языком интерфейса (EN / RU)
 *
 * Используется для:
 * - установки языка при старте до появления DOM (initLanguage)
 * - переключения языка по кнопке и обновления aria-состояния (setupLanguage)
 *
 * Особенности реализации:
 * - Язык задаётся атрибутом lang на <html>; CSS в _config.scss скрывает
 *   нужные [lang="..."] спаны глобально через селектор — JS только
 *   выставляет атрибут, отображением управляет CSS
 * - После переключения рассылается кастомное событие 'portfolio:languagechange',
 *   чтобы другие модули (например, theme.js) могли обновить свои aria-метки
 * - View Transition применяется для плавного перехода при смене языка,
 *   аналогично теме
 */

const DEFAULT_LANG = 'en';
const SUPPORTED_LANGS = ['en', 'ru'];

// Применяет сохранённый язык до рендера DOM — вызывается в main.js до DOMContentLoaded
export const initLanguage = () => {
  const savedLang = localStorage.getItem('lang');

  // Если сохранённый язык не входит в список поддерживаемых — откатываемся к дефолтному
  const currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : DEFAULT_LANG;
  document.documentElement.setAttribute('lang', currentLang);
};

// Локализует aria-label / alt у элементов с data-*-en / data-*-ru.
// Эти атрибуты нельзя переключать CSS-трюком со спанами, поэтому их обновляет JS
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

// Навешивает обработчик клика и следит за актуальностью aria-атрибутов кнопки
export const setupLanguage = (langBtn) => {
  // Синхронизируем локализуемые атрибуты с текущим языком при инициализации
  localizeAttributes();

  if (!langBtn) return;

  // Синхронизирует aria-pressed и aria-label с текущим активным языком
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

  // Переключает язык, сохраняет в localStorage и оповещает другие модули
  const toggleLang = () => {
    const currentLang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    const newLang = currentLang === 'en' ? 'ru' : 'en';

    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('lang', newLang);
    updateToggleState();

    // Кастомное событие — другие модули (theme.js) слушают его для обновления своих меток
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

  // Обновляем собственную кнопку и локализуемые атрибуты при изменениях языка
  window.addEventListener('portfolio:languagechange', updateToggleState);
  window.addEventListener('portfolio:languagechange', localizeAttributes);

  return () => {
    langBtn.removeEventListener('click', handleClick);
    window.removeEventListener('portfolio:languagechange', updateToggleState);
    window.removeEventListener('portfolio:languagechange', localizeAttributes);
  };
};
