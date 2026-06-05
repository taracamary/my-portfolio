/**
 * Модуль анимации появления элементов при прокрутке
 *
 * Используется для:
 * - плавного появления элементов с классом .u-fade-up при входе в вьюпорт
 *
 * Особенности реализации:
 * - Анимация реализована через CSS-класс is-visible (keyframe fadeUp в _animations.scss),
 *   JS только добавляет этот класс — никакой inline-анимации
 * - После того как элемент стал видим, observer перестаёт его наблюдать (unobserve):
 *   анимация срабатывает ровно один раз, повторный скролл её не запускает
 * - rootMargin '0px 0px -10% 0px' + threshold 0.15 означают: элемент должен
 *   войти во вьюпорт не менее чем на 15% и не касаться последних 10% экрана —
 *   так анимация не срабатывает от самого края экрана
 * - Graceful degradation: если IntersectionObserver недоступен (старый браузер),
 *   все элементы сразу становятся видимыми без анимации
 */

const REVEAL_SELECTOR = '.u-fade-up';
const VISIBLE_CLASS = 'is-visible';

export const initScrollAnimations = () => {
  const animatedElements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
  if (!animatedElements.length) return;

  // Fallback для браузеров без IntersectionObserver: показываем всё сразу
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach((el) => el.classList.add(VISIBLE_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add(VISIBLE_CLASS);

        // Прекращаем наблюдение: анимация одноразовая, дальнейший трекинг не нужен
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15,
    },
  );

  animatedElements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};
