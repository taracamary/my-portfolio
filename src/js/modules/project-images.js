export function initProjectImages() {
  document.querySelectorAll('.projects__image').forEach((img) => {
    const showPlaceholder = () => {
      const wrapper = img.closest('.projects__image-wrapper');
      if (!wrapper || wrapper.querySelector('.projects__placeholder')) return;

      const card = img.closest('.projects__card');
      const title = card?.querySelector('.projects__card-title');
      const lang = document.documentElement.getAttribute('lang') || 'en';
      const isRu = lang === 'ru';
      const titleText =
        title?.querySelector(`[lang="${lang}"]`)?.textContent.trim()
        || title?.textContent.trim()
        || 'Project';

      const placeholder = document.createElement('div');
      placeholder.className = 'projects__placeholder';
      placeholder.setAttribute('role', 'img');
      placeholder.setAttribute(
        'aria-label',
        isRu ? `Превью ${titleText} недоступно` : `${titleText} preview not available`,
      );

      if (title) {
        title.querySelectorAll(':scope > span').forEach((span) => {
          placeholder.appendChild(span.cloneNode(true));
        });
      } else {
        placeholder.textContent = titleText;
      }

      wrapper.replaceChildren(placeholder);
    };

    img.addEventListener('error', showPlaceholder, { once: true });

    // Cached failed loads may not fire error again
    if (img.complete && img.naturalWidth === 0) {
      showPlaceholder();
    }
  });
}
