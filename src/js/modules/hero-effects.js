/**
 * Модуль интерактивных эффектов секции Hero
 *
 * Используется для:
 * - создания эффекта «прожектора», который следует за курсором мыши
 *
 * Особенности реализации:
 * - Позиция курсора передаётся через CSS-переменные --mouse-x и --mouse-y,
 *   которые используются в SCSS для позиционирования radial-gradient маски.
 *   JS не трогает стили напрямую — только обновляет переменные
 * - На устройствах без точного указателя (сенсорные экраны, стилусы) тяжёлый
 *   обработчик mousemove не навешивается вовсе: вместо этого маска фиксируется
 *   по центру секции через те же CSS-переменные
 * - { passive: true } в addEventListener гарантирует, что браузер не блокирует
 *   рендер в ожидании возможного preventDefault() во время движения мыши
 */

export const initHeroEffects = (heroElement) => {
  if (!heroElement) return;

  // (pointer: fine) — истина для мыши/трекпада, ложь для пальца/стилуса
  const isHoverableDevice = window.matchMedia('(pointer: fine)').matches;

  if (!isHoverableDevice) {
    // На тач-устройствах центрируем маску статично — без лишних слушателей событий
    heroElement.style.setProperty('--mouse-x', '50%');
    heroElement.style.setProperty('--mouse-y', '50%');
    return;
  }

  // Вычисляем координаты курсора относительно самой секции, а не окна,
  // чтобы маска двигалась правильно при любом положении hero на странице
  const handleMouseMove = (e) => {
    const rect = heroElement.getBoundingClientRect();
    heroElement.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    heroElement.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    heroElement.removeEventListener('mousemove', handleMouseMove);
  };
};
