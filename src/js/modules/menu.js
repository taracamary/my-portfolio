/**
 * Модуль управления бургер-меню для мобильных устройств
 *
 * Используется для:
 * - открытия и закрытия мобильного навигационного меню
 * - блокировки прокрутки страницы при открытом меню
 * - автоматического закрытия при переходе по ссылке или расширении до десктопа
 *
 * Особенности реализации:
 * - Закрытие по клику на ссылку реализовано через делегирование событий на
 *   весь блок меню — вместо навешивания обработчиков на каждый <a>
 * - Предыдущее значение overflow сохраняется перед блокировкой прокрутки,
 *   чтобы корректно восстановить его при закрытии меню
 * - MediaQueryList.addEventListener('change') отслеживает расширение окна до
 *   десктопа и автоматически закрывает меню без дополнительных ResizeObserver
 */

export const initBurgerMenu = (burgerBtn, menu) => {
  if (!burgerBtn || !menu) return;

  const BURGER_OPEN_CLASS = 'header__burger--open';
  const MENU_OPEN_CLASS = 'header__menu--open';

  // Медиазапрос совпадает с брейкпоинтом tablet в _config.scss
  const desktopQuery = window.matchMedia('(min-width: 768px)');

  // Сохраняем overflow до блокировки, чтобы восстановить точное значение
  let previousBodyOverflow = '';

  // Единая функция применения состояния: синхронизирует классы, aria и scroll
  const toggleMenu = (isOpen) => {
    if (isOpen) {
      previousBodyOverflow = document.body.style.overflow;
    }

    burgerBtn.classList.toggle(BURGER_OPEN_CLASS, isOpen);
    menu.classList.toggle(MENU_OPEN_CLASS, isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);

    // Блокируем прокрутку body, пока меню открыто, чтобы не скроллить контент под оверлеем
    document.body.style.overflow = isOpen ? 'hidden' : previousBodyOverflow;
  };

  const handleBurgerClick = () => {
    const isOpen = !menu.classList.contains(MENU_OPEN_CLASS);
    toggleMenu(isOpen);
  };

  // Делегирование: ловим клики по всему меню, реагируем только на ссылки
  const handleMenuClick = (e) => {
    if (
      e.target instanceof Element
      && e.target.closest('.header__link')
      && menu.classList.contains(MENU_OPEN_CLASS)
    ) {
      toggleMenu(false);
    }
  };

  // Если пользователь растянул окно до десктопа — принудительно закрываем меню, иначе оно останется открытым поверх десктопной навигации
  const handleDesktopChange = (e) => {
    if (e.matches && menu.classList.contains(MENU_OPEN_CLASS)) {
      toggleMenu(false);
    }
  };

  burgerBtn.addEventListener('click', handleBurgerClick);
  menu.addEventListener('click', handleMenuClick);
  desktopQuery.addEventListener('change', handleDesktopChange);

  return () => {
    burgerBtn.removeEventListener('click', handleBurgerClick);
    menu.removeEventListener('click', handleMenuClick);
    desktopQuery.removeEventListener('change', handleDesktopChange);
  };
};
