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
 * - Обновление CSS-переменных (а значит и пересчёт radial-gradient маски)
 *   батчится через requestAnimationFrame: не чаще одного раза за кадр,
 *   независимо от частоты событий mousemove
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

  let rafId = null;
  let lastClientX = 0;
  let lastClientY = 0;

  // Применяем последнюю известную позицию курсора один раз за кадр.
  // rect читаем здесь же — это единственное чтение layout на кадр
  const applyPosition = () => {
    rafId = null;
    const rect = heroElement.getBoundingClientRect();
    heroElement.style.setProperty('--mouse-x', `${lastClientX - rect.left}px`);
    heroElement.style.setProperty('--mouse-y', `${lastClientY - rect.top}px`);
  };

  // На событии только запоминаем координаты и планируем кадр, если он ещё не запланирован
  const handleMouseMove = (e) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;

    if (rafId === null) {
      rafId = window.requestAnimationFrame(applyPosition);
    }
  };

  heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    heroElement.removeEventListener('mousemove', handleMouseMove);
    if (rafId !== null) window.cancelAnimationFrame(rafId);
  };
};
