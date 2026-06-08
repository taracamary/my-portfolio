/**
 * Модуль управления бургер-меню для мобильных устройств
 *
 * Используется для:
 * - открытия и закрытия мобильного навигационного меню
 * - блокировки прокрутки страницы при открытом меню
 * - автоматического закрытия при переходе по ссылке или расширении до десктопа
 * - корректного управления фокусом (перенос в меню, возврат на кнопку, ловушка)
 *
 * Особенности реализации:
 * - Брейкпоинт читается из CSS-переменной --breakpoint-tablet (единый источник
 *   правды с SCSS-картой $breakpoints), с числовым фолбэком на 768px
 * - Закрытое мобильное меню помечается атрибутом inert: оно уходит из таб-порядка
 *   и из дерева доступности, поэтому offscreen-ссылки больше не ловят фокус.
 *   На десктопе меню никогда не inert — это обычная навигация
 * - При открытии фокус переносится на первый пункт, при закрытии возвращается
 *   на кнопку-бургер; Escape закрывает меню; Tab зациклен внутри меню (focus trap)
 * - Закрытие по клику на ссылку реализовано через делегирование событий на блок меню
 */

export const initBurgerMenu = (burgerBtn, menu) => {
  if (!burgerBtn || !menu) return;

  const BURGER_OPEN_CLASS = 'header__burger--open';
  const MENU_OPEN_CLASS = 'header__menu--open';
  const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

  // Единый источник правды: брейкпоинт берём из CSS-переменной, сгенерированной
  // из SCSS-карты $breakpoints. Фолбэк на 768px, если переменная недоступна
  const tabletBreakpoint =
    getComputedStyle(document.documentElement)
      .getPropertyValue('--breakpoint-tablet')
      .trim() || '768px';
  const desktopQuery = window.matchMedia(`(min-width: ${tabletBreakpoint})`);

  // Сохраняем overflow до блокировки, чтобы восстановить точное значение
  let previousBodyOverflow = '';

  const isOpen = () => menu.classList.contains(MENU_OPEN_CLASS);

  // На мобильном закрытое меню должно быть inert; на десктопе — никогда
  const syncInert = (open) => {
    menu.inert = desktopQuery.matches ? false : !open;
  };

  // Единая функция применения состояния: синхронизирует классы, aria, scroll, inert, фокус
  const toggleMenu = (open, { restoreFocus = true } = {}) => {
    if (open) {
      previousBodyOverflow = document.body.style.overflow;
    }

    burgerBtn.classList.toggle(BURGER_OPEN_CLASS, open);
    menu.classList.toggle(MENU_OPEN_CLASS, open);
    burgerBtn.setAttribute('aria-expanded', open);

    // Блокируем прокрутку body, пока меню открыто, чтобы не скроллить контент под оверлеем
    document.body.style.overflow = open ? 'hidden' : previousBodyOverflow;

    syncInert(open);

    if (open) {
      // Переносим фокус в меню для клавиатурных пользователей
      menu.querySelector(FOCUSABLE_SELECTOR)?.focus();
    } else if (restoreFocus) {
      // Возвращаем фокус на кнопку-триггер после закрытия
      burgerBtn.focus();
    }
  };

  const handleBurgerClick = () => {
    toggleMenu(!isOpen());
  };

  // Делегирование: ловим клики по всему меню, реагируем только на ссылки
  const handleMenuClick = (e) => {
    if (
      e.target instanceof Element
      && e.target.closest('.header__link')
      && isOpen()
    ) {
      toggleMenu(false);
    }
  };

  // Если пользователь растянул окно до десктопа — принудительно закрываем меню
  const handleDesktopChange = (e) => {
    if (e.matches && isOpen()) {
      // Без переноса фокуса: переход к десктопной раскладке не должен дёргать фокус
      toggleMenu(false, { restoreFocus: false });
    }
    // Поддерживаем корректное состояние inert при смене брейкпоинта
    syncInert(isOpen());
  };

  // Зацикливаем Tab внутри открытого меню (focus trap) только на мобильном
  const trapFocus = (e) => {
    const items = Array.from(menu.querySelectorAll(FOCUSABLE_SELECTOR));
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleKeydown = (e) => {
    if (!isOpen() || desktopQuery.matches) return;

    if (e.key === 'Escape') {
      toggleMenu(false);
    } else if (e.key === 'Tab') {
      trapFocus(e);
    }
  };

  // Начальное состояние inert (мобильный + закрыто → inert)
  syncInert(false);

  burgerBtn.addEventListener('click', handleBurgerClick);
  menu.addEventListener('click', handleMenuClick);
  desktopQuery.addEventListener('change', handleDesktopChange);
  document.addEventListener('keydown', handleKeydown);

  return () => {
    burgerBtn.removeEventListener('click', handleBurgerClick);
    menu.removeEventListener('click', handleMenuClick);
    desktopQuery.removeEventListener('change', handleDesktopChange);
    document.removeEventListener('keydown', handleKeydown);
    menu.inert = false;
  };
};
