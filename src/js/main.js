/**
 * Точка входа приложения. Импортирует стили, инициализирует все модули и подключает их к DOM
 *
 * Особенности реализации:
 * - initTheme() и initLanguage() вызываются до DOMContentLoaded, чтобы
 *   атрибуты data-theme и lang появились на <html> ещё до рендера —
 *   это предотвращает FOUC (мигание неверной темы или языка)
 * - Все прочие модули инициализируются после полного разбора DOM
 */

import '../styles/style.scss';
import { initTheme, setupTheme } from './modules/theme.js';
import { initLanguage, setupLanguage } from './modules/lang.js';
import { initBurgerMenu } from './modules/menu.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroEffects } from './modules/hero-effects.js';
import { initScrollAnimations } from './modules/scroll-animations.js';
import { initProjectExpand } from './modules/project-expand.js';

// Применяем тему и язык немедленно — до построения DOM — чтобы избежать белой вспышки
initTheme();
initLanguage();

document.addEventListener('DOMContentLoaded', () => {
  // Кэшируем ссылки на глобальные DOM-элементы один раз и передаём в модули — это избавляет каждый модуль от собственных querySelector-запросов
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const menuLinks = document.querySelectorAll('.header__link');
  const themeToggleBtn = document.querySelector('.header__theme-toggle');
  const langToggleBtn = document.querySelector('.header__lang-toggle');
  const heroSection = document.getElementById('hero');

  // Инициализация модулей в порядке от глобальных к секционным
  setupTheme(themeToggleBtn);
  setupLanguage(langToggleBtn);
  initBurgerMenu(burgerBtn, menu);
  initNavigation(header, menuLinks);
  initHeroEffects(heroSection);
  initScrollAnimations();
  initProjectExpand();
});
