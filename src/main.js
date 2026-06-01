import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');
  const header = document.querySelector('.header');

  const toggleMenu = () => {
    // Переключаем класс анимации крестика у кнопки
    const isOpen = burgerBtn.classList.toggle('header__burger--open');
    // Переключаем класс открытия самого меню
    menu.classList.toggle('header__menu--open');

    // Обновляем доступность для скринридеров
    burgerBtn.setAttribute('aria-expanded', isOpen);

    // Блокируем скролл страницы, чтобы под открытым меню нельзя было прокручивать контент
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  // Клик по кнопке бургер-меню
  if (burgerBtn && menu) {
    burgerBtn.addEventListener('click', toggleMenu);
  }

  // Закрываем меню при клике на любую из ссылок навигации
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('header__menu--open')) {
        toggleMenu();
      }
    });
  });

  // Эффект размытия хедера при скролле (Scroll Blur Effect)
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  // Слушаем событие скролла страницы
  window.addEventListener('scroll', handleScroll);
  // Вызываем один раз при загрузке, чтобы проверить начальное положение экрана
  handleScroll();

  // Собираем список всех секций, за которыми нужно следить
  const sections = Array.from(menuLinks)
    .filter(link => link.getAttribute('href').length > 1)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(section => section !== null);

  // Настраиваем "датчик" наблюдения
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  // Создаем сам наблюдатель
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Если секция вошла в нашу "рабочую зону"
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        // Проходим по всем ссылкам меню
        menuLinks.forEach(link => {
          // Убираем активный класс у всех ссылок
          link.classList.remove('header__link--active');
          // Добавляем его только той ссылке, чей href совпадает с ID секции
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('header__link--active');
          }
        });
      }
    });
  }, observerOptions);

  // Запускаем наблюдение за каждой найденной секцией
  sections.forEach(section => observer.observe(section));
});