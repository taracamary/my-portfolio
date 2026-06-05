/**
 * Модуль навигации: состояние шапки при скролле и подсветка активной секции
 *
 * Используется для:
 * - добавления класса header--scrolled при прокрутке страницы вниз
 * - подсветки активной ссылки меню в зависимости от видимой секции
 *
 * Особенности реализации:
 * - Активная секция определяется через IntersectionObserver, а не через
 *   постоянный пересчёт позиций в scroll-обработчике — это производительнее
 * - rootMargin '-25% 0px -65% 0px' создаёт «горячую зону» в центре вьюпорта:
 *   секция считается активной, когда находится примерно посередине экрана
 * - Особый случай: когда пользователь в самом верху (scrollY ≤ 20),
 *   IntersectionObserver пропускается и hero принудительно становится активным —
 *   это предотвращает ситуацию, когда observer не видит hero из-за rootMargin
 * - Если IntersectionObserver недоступен (старый браузер), модуль работает
 *   только через scroll: подсветка не меняется, но шапка переключается корректно
 */

export const initNavigation = (header, menuLinks) => {
  if (!header || !menuLinks.length) return;

  const SCROLLED_CLASS = 'header--scrolled';
  const ACTIVE_LINK_CLASS = 'header__link--active';
  const links = Array.from(menuLinks);

  // Снимает активный класс со всех ссылок и ставит на нужную по id секции
  const setActiveLink = (activeId) => {
    links.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle(ACTIVE_LINK_CLASS, isCurrent);

      // aria-current="page" сообщает экранному считывателю, в какой секции находится пользователь
      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // Переключает класс шапки и активирует hero, если страница прокручена в самый верх
  const handleScroll = () => {
    header.classList.toggle(SCROLLED_CLASS, window.scrollY > 20);

    if (window.scrollY <= 20) {
      setActiveLink('hero');
    }
  };

  // { passive: true } — браузер не ждёт, будет ли вызван preventDefault(), что позволяет плавнее обрабатывать скролл на мобильных устройствах
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Вызываем сразу для корректного начального состояния (например, при перезагрузке с якорем)
  handleScroll();

  // Graceful degradation: без IntersectionObserver оставляем только scroll-поведение шапки
  if (!('IntersectionObserver' in window)) {
    return () => window.removeEventListener('scroll', handleScroll);
  }

  // Собираем DOM-элементы секций из href ссылок навигации, пропуская несуществующие
  const sections = links
    .map((link) => {
      const href = link.getAttribute('href');
      return href?.startsWith('#') && href.length > 1
        ? document.getElementById(href.slice(1))
        : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return () => window.removeEventListener('scroll', handleScroll);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // Когда пользователь у самого верха, активен hero — observer не вмешивается
      if (window.scrollY <= 20) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.getAttribute('id'));
        }
      });
    },
    {
      root: null,
      // Верхние 25% и нижние 65% вьюпорта не считаются: секция активна, только когда входит в центральную «горячую зону» — так навигация переключается плавно
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));

  return () => {
    window.removeEventListener('scroll', handleScroll);
    observer.disconnect();
  };
};
