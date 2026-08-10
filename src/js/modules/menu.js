export const initBurgerMenu = (burgerBtn, menu) => {
  if (!burgerBtn || !menu) return;

  const BURGER_OPEN_CLASS = 'header__burger--open';
  const MENU_OPEN_CLASS = 'header__menu--open';
  const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

  // Keep in sync with SCSS $breakpoints via --breakpoint-tablet
  const tabletBreakpoint =
    getComputedStyle(document.documentElement)
      .getPropertyValue('--breakpoint-tablet')
      .trim() || '768px';
  const desktopQuery = window.matchMedia(`(min-width: ${tabletBreakpoint})`);

  let previousBodyOverflow = '';

  const isOpen = () => menu.classList.contains(MENU_OPEN_CLASS);

  const syncInert = (open) => {
    menu.inert = desktopQuery.matches ? false : !open;
  };

  const toggleMenu = (open, { restoreFocus = true } = {}) => {
    if (open) {
      previousBodyOverflow = document.body.style.overflow;
    }

    burgerBtn.classList.toggle(BURGER_OPEN_CLASS, open);
    menu.classList.toggle(MENU_OPEN_CLASS, open);
    burgerBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : previousBodyOverflow;

    syncInert(open);

    if (open) {
      menu.querySelector(FOCUSABLE_SELECTOR)?.focus();
    } else if (restoreFocus) {
      burgerBtn.focus();
    }
  };

  const handleBurgerClick = () => {
    toggleMenu(!isOpen());
  };

  const handleMenuClick = (e) => {
    if (
      e.target instanceof Element
      && e.target.closest('.header__link')
      && isOpen()
    ) {
      toggleMenu(false);
    }
  };

  const handleDesktopChange = (e) => {
    if (e.matches && isOpen()) {
      toggleMenu(false, { restoreFocus: false });
    }
    syncInert(isOpen());
  };

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

  syncInert(false);

  burgerBtn.addEventListener('click', handleBurgerClick);
  menu.addEventListener('click', handleMenuClick);
  desktopQuery.addEventListener('change', handleDesktopChange);
  document.addEventListener('keydown', handleKeydown);
};
