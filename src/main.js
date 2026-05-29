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
});