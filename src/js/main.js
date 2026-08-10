import '../styles/style.scss';
import { initTheme, setupTheme } from './modules/theme.js';
import { initLanguage, setupLanguage } from './modules/lang.js';
import { initBurgerMenu } from './modules/menu.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroEffects } from './modules/hero-effects.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initProjectExpand } from './modules/project-expand.js';
import { initProjectImages } from './modules/project-images.js';

// Before first paint — avoids theme/lang FOUC (inline head script is the primary guard)
initTheme();
initLanguage();

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');
  const themeToggleBtn = document.querySelector('.header__theme-toggle');
  const langToggleBtn = document.querySelector('.header__lang-toggle');
  const heroSection = document.getElementById('hero');

  setupTheme(themeToggleBtn);
  setupLanguage(langToggleBtn);
  initBurgerMenu(burgerBtn, menu);
  initNavigation(header, menuLinks);
  initHeroEffects(heroSection);
  initScrollAnimations();
  initProjectExpand();
  initProjectImages();
});
