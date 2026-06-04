/**
 * Инициализация логики мобильного меню
 * @param {HTMLElement} burgerBtn 
 * @param {HTMLElement} menu 
 */
export const initBurgerMenu = (burgerBtn, menu) => {
  if (!burgerBtn || !menu) return;

  const toggleMenu = (isOpen) => {
    burgerBtn.classList.toggle('header__burger--open', isOpen);
    menu.classList.toggle('header__menu--open', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  burgerBtn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('header__menu--open');
    toggleMenu(isOpen);
  });

  // Закрытие меню при клике на ссылки (делегирование событий)
  menu.addEventListener('click', (e) => {
    if (
      e.target instanceof Element
      && e.target.closest('.header__link')
      && menu.classList.contains('header__menu--open')
    ) {
      toggleMenu(false);
    }
  });

  // Автозакрытие меню, если экран растянули до десктопа
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches && menu.classList.contains('header__menu--open')) {
      toggleMenu(false);
    }
  });
};
