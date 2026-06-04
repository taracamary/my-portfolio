import '../styles/style.scss';
import { initTheme, setupTheme } from './modules/theme.js';
import { initLanguage, setupLanguage } from './modules/lang.js';
import { initBurgerMenu } from './modules/menu.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroEffects } from './modules/hero-effects.js';
import { initScrollAnimations } from './modules/scroll-animations.js';

// Инициализируем тему мгновенно, не дожидаясь сборки DOM, чтобы избежать белой вспышки
initTheme();
initLanguage();

document.addEventListener('DOMContentLoaded', () => {
  // Кэшируем глобальные DOM-элементы
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');
  const themeToggleBtn = document.querySelector('.header__theme-toggle');
  const langToggleBtn = document.querySelector('.header__lang-toggle');
  const heroSection = document.getElementById('hero');

  // Инициализация независимых модулей
  setupTheme(themeToggleBtn);
  setupLanguage(langToggleBtn);
  initBurgerMenu(burgerBtn, menu);
  initNavigation(header, menuLinks);
  initHeroEffects(heroSection);
  initScrollAnimations();
});
