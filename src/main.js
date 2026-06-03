import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');
  const themeToggleBtn = document.querySelector('.header__theme-toggle');
  const langToggleBtn = document.querySelector('.header__lang-toggle');

  // Защита: если на странице нет базовых элементов шапки, скрипт мягко завершает работу
  if (!header) return;

  // Инициализация темы (выполняется мгновенно без анимации, чтобы избежать вспышки)
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

    document.documentElement.setAttribute('data-theme', currentTheme);
  };

  initTheme();

  // Плавное переключение темы по клику
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'dark' : 'light';

      // Используем View Transitions API для бесшовного перетекания цветов
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
        });
      } else {
        // Фолбек для старых браузеров
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
    });
  }

  // Переключение языка
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const newLang = currentLang === 'en' ? 'ru' : 'en';

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          document.documentElement.setAttribute('lang', newLang);
          localStorage.setItem('lang', newLang);
        });
      } else {
        document.documentElement.setAttribute('lang', newLang);
        localStorage.setItem('lang', newLang);
      }
    });
  }

  // Бургер-меню
  if (burgerBtn && menu) {
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

    menu.addEventListener('click', (event) => {
      if (event.target.closest('.header__link') && menu.classList.contains('header__menu--open')) {
        toggleMenu(false);
      }
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
      if (e.matches && menu.classList.contains('header__menu--open')) {
        toggleMenu(false);
      }
    });
  }

  // Логика скролла шапки
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('header--scrolled', currentScroll > 20);

    if (currentScroll <= 20) {
      menuLinks.forEach(link => {
        const isHome = link.getAttribute('href') === '#';
        link.classList.toggle('header__link--active', isHome);
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Подсветка active пунктов меню через IntersectionObserver
  if (menuLinks.length > 0) {
    const sections = Array.from(menuLinks)
      .map(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') && href.length > 1 ? document.querySelector(href) : null;
      })
      .filter(section => section !== null);

    if (sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        if (window.scrollY <= 20) return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            menuLinks.forEach(link => {
              const isCurrent = link.getAttribute('href') === `#${id}` && id !== null;
              link.classList.toggle('header__link--active', isCurrent);
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }
  }

  // Интерактивный трекинг курсора
  const hero = document.getElementById('hero');
  if (hero) {
    // Слушаем движение мыши строго над секцией Hero
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Передаем точные пиксели для CSS Mask и translate3d
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true }); // passive: true повышает производительность скролла/движений
  }
});