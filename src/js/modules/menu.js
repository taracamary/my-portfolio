/**
 * Инициализация логики мобильного меню
 * @param {HTMLElement} burgerBtn
 * @param {HTMLElement} menu
 */
export const initBurgerMenu = (burgerBtn, menu) => {
  if (!burgerBtn || !menu) return;

  const BURGER_OPEN_CLASS = 'header__burger--open';
  const MENU_OPEN_CLASS = 'header__menu--open';
  const desktopQuery = window.matchMedia('(min-width: 768px)');
  let previousBodyOverflow = '';

  const toggleMenu = (isOpen) => {
    if (isOpen) {
      previousBodyOverflow = document.body.style.overflow;
    }

    burgerBtn.classList.toggle(BURGER_OPEN_CLASS, isOpen);
    menu.classList.toggle(MENU_OPEN_CLASS, isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : previousBodyOverflow;
  };

  const handleBurgerClick = () => {
    const isOpen = !menu.classList.contains(MENU_OPEN_CLASS);
    toggleMenu(isOpen);
  };

  // Закрытие меню при клике на ссылки (делегирование событий)
  const handleMenuClick = (e) => {
    if (
      e.target instanceof Element
      && e.target.closest('.header__link')
      && menu.classList.contains(MENU_OPEN_CLASS)
    ) {
      toggleMenu(false);
    }
  };

  // Автозакрытие меню, если экран растянули до десктопа
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
