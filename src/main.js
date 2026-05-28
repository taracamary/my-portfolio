import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);

  handleScroll();
});
