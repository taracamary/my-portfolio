export const initNavigation = (header, menuLinks) => {
  if (!header || !menuLinks.length) return;

  const SCROLLED_CLASS = 'header--scrolled';
  const ACTIVE_LINK_CLASS = 'header__link--active';
  const links = Array.from(menuLinks);

  const setActiveLink = (activeId) => {
    links.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle(ACTIVE_LINK_CLASS, isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const handleScroll = () => {
    header.classList.toggle(SCROLLED_CLASS, window.scrollY > 20);

    if (window.scrollY <= 20) {
      setActiveLink('hero');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (!('IntersectionObserver' in window)) return;

  const sections = links
    .map((link) => {
      const href = link.getAttribute('href');
      return href?.startsWith('#') && href.length > 1
        ? document.getElementById(href.slice(1))
        : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // rootMargin skips the top of the page — force hero while near the top
      if (window.scrollY <= 20) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.getAttribute('id'));
        }
      });
    },
    {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
};
