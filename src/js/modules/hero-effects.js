/**
 * Инициализация параллакса сетки и движения glow-маски.
 * @param {HTMLElement} heroElement
 */
export const initHeroEffects = (heroElement) => {
  if (!heroElement) return;

  // Проверяем, есть ли у пользователя точный указатель (мышь/трекпад)
  const isHoverableDevice = window.matchMedia('(pointer: fine)').matches;

  if (!isHoverableDevice) {
    // На мобильных жестко фиксируем светящуюся маску ровно по центру секции
    heroElement.style.setProperty('--mouse-x', '50%');
    heroElement.style.setProperty('--mouse-y', '50%');
    return; // Выходим из функции, не навешивая тяжелый слушатель событий
  }

  // Для десктопов оставляем плавный интерактивный трекинг
  const handleMouseMove = (e) => {
    const rect = heroElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroElement.style.setProperty('--mouse-x', `${x}px`);
    heroElement.style.setProperty('--mouse-y', `${y}px`);
  };

  heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    heroElement.removeEventListener('mousemove', handleMouseMove);
  };
};
