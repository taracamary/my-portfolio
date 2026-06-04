/**
 * Инициализация эффектов прокрутки сайта и трекинга активных секций
 * @param {HTMLElement} header
 * @param {NodeList} menuLinks
 */
export const initNavigation = (header, menuLinks) => {
  if (!header || !menuLinks.length) return;

  const SCROLLED_CLASS = 'header--scrolled';
  const ACTIVE_LINK_CLASS = 'header__link--active';
  const links = Array.from(menuLinks);

  const setActiveLink = (activeId) => {
    links.forEach(link => {
      const isCurrent = link.getAttribute('href') === `#${activeId}`;

      link.classList.toggle(ACTIVE_LINK_CLASS, isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // 1. Изменение состояния шапки при скролле
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    header.classList.toggle(SCROLLED_CLASS, currentScroll > 20);

    // Если мы в самом верху — подсвечиваем Главную/Home по умолчанию
    if (currentScroll <= 20) {
      setActiveLink('hero');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Вызываем один раз для проверки состояния при перезагрузке

  // 2. Отслеживание секций через IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  const sections = links
    .map(link => {
      const href = link.getAttribute('href');
      return href?.startsWith('#') && href.length > 1
        ? document.getElementById(href.slice(1))
        : null;
    })
    .filter(Boolean); // Чистим массив от null и несуществующих элементов

  if (!sections.length) {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px', // Идеальный триггер для подсветки контента по центру
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    // Не переключаем классы навигации, если пользователь находится в самом верху (обрабатывается handleScroll)
    if (window.scrollY <= 20) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  return () => {
    window.removeEventListener('scroll', handleScroll);
    observer.disconnect();
  };
};
