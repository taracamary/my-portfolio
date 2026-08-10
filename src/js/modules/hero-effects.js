export const initHeroEffects = (heroElement) => {
  if (!heroElement) return;

  const isHoverableDevice = window.matchMedia('(pointer: fine)').matches;

  if (!isHoverableDevice) {
    heroElement.style.setProperty('--mouse-x', '50%');
    heroElement.style.setProperty('--mouse-y', '50%');
    return;
  }

  let rafId = null;
  let lastClientX = 0;
  let lastClientY = 0;

  const applyPosition = () => {
    rafId = null;
    const rect = heroElement.getBoundingClientRect();
    heroElement.style.setProperty('--mouse-x', `${lastClientX - rect.left}px`);
    heroElement.style.setProperty('--mouse-y', `${lastClientY - rect.top}px`);
  };

  const handleMouseMove = (e) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;

    if (rafId === null) {
      rafId = window.requestAnimationFrame(applyPosition);
    }
  };

  heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
};
