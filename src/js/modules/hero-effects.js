/**
 * Инициализация параллакса сетки и движения glow-маски
 * @param {HTMLElement} heroElement 
 */
export const initHeroEffects = (heroElement) => {
  if (!heroElement) return;

  heroElement.addEventListener('mousemove', (e) => {
    const rect = heroElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroElement.style.setProperty('--mouse-x', `${x}px`);
    heroElement.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
};
