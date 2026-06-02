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
      // Смотрим текущий язык на теге html
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const newLang = currentLang === 'en' ? 'ru' : 'en';

      // Проверяем, поддерживает ли браузер View Transitions API
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          // Все изменения внутри этой функции будут анимированы автоматически
          document.documentElement.setAttribute('lang', newLang);
          localStorage.setItem('lang', newLang);
        });
      } else {
        // Меняем атрибут
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
      // Блокируем скролл body, чтобы страница не дергалась под меню
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // Клик по кнопке бургера
    burgerBtn.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('header__menu--open');
      toggleMenu(isOpen);
    });

    // Делегирование событий: закрываем меню при клике на любую ссылку внутри nav
    menu.addEventListener('click', (event) => {
      if (event.target.closest('.header__link') && menu.classList.contains('header__menu--open')) {
        toggleMenu(false);
      }
    });

    // Если пользователь открыл меню на мобилке и перевернул экран в альбомный режим (десктоп), сбрасываем состояние и разблокируем body автоматически
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

    // Если мы вернулись на самый верх (в пределах 20px), принудительно активируем Home
    if (currentScroll <= 20) {
      menuLinks.forEach(link => {
        const isHome = link.getAttribute('href') === '#';
        link.classList.toggle('header__link--active', isHome);
      });
    }
  };

  // Отключает блокировку главного потока браузера.
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Подсветка активных пунктов меню при скролле
  if (menuLinks.length > 0) {
    // Собираем только реальные секции на основе href ссылок нашего меню
    const sections = Array.from(menuLinks)
      .map(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') && href.length > 1 ? document.querySelector(href) : null;
      })
      // Отсекаем пустые ссылки или ссылки-заглушки типа "#"
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
          // Если секция попала в рабочую область viewport
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Пробегаемся по ссылкам и синхронизируем классы верстки
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
});