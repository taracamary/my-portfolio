/**
 * Инициализация эффектов прокрутки сайта и трекинга активных секций
 * @param {HTMLElement} header 
 * @param {NodeList} menuLinks 
 */
export const initNavigation = (header, menuLinks) => {
  if (!header || !menuLinks.length) return;

  // 1. Изменение состояния шапки при скролле
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('header--scrolled', currentScroll > 20);

    // Если мы в самом верху — подсвечиваем Главную/Home по умолчанию
    if (currentScroll <= 20) {
      menuLinks.forEach(link => {
        const isHome = link.getAttribute('href') === '#';
        link.classList.toggle('header__link--active', isHome);
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Вызываем один раз для проверки состояния при перезагрузке

  // 2. Отслеживание секций через IntersectionObserver
  const sections = Array.from(menuLinks)
    .map(link => {
      const href = link.getAttribute('href');
      return href?.startsWith('#') && href.length > 1 ? document.querySelector(href) : null;
    })
    .filter(Boolean); // Чистим массив от null и несуществующих элементов

  if (!sections.length) return;

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
        menuLinks.forEach(link => {
          const isCurrent = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('header__link--active', isCurrent);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
};
