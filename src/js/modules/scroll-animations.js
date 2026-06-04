const REVEAL_SELECTOR = [
  '.hero__animate-fade-up',
  '.projects__animate-fade-up',
  '.experience__animate-fade-up',
  '.contact__animate-fade-up',
  '.u-fade-up'
].join(', ');

const VISIBLE_CLASS = 'is-visible';

export const initScrollAnimations = () => {
  const animatedElements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));

  if (!animatedElements.length) return;

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(element => element.classList.add(VISIBLE_CLASS));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add(VISIBLE_CLASS);
      currentObserver.unobserve(entry.target);
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  animatedElements.forEach(element => observer.observe(element));
};
