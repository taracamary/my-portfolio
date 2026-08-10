export function initProjectExpand() {
  const cards = document.querySelectorAll('.projects__card');

  cards.forEach((card) => {
    const { detailsEn, detailsRu, github, demo } = card.dataset;
    const elEn = card.querySelector('.projects__expand-details[lang="en"]');
    const elRu = card.querySelector('.projects__expand-details[lang="ru"]');
    const demoLink = card.querySelector('.projects__expand-link--demo');
    const githubLink = card.querySelector('.projects__expand-link--github');

    if (elEn) elEn.textContent = detailsEn ?? '';
    if (elRu) elRu.textContent = detailsRu ?? '';
    setOptionalProjectLink(demoLink, demo);
    setOptionalProjectLink(githubLink, github);

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;

      const isExpanded = card.classList.contains('is-expanded');
      cards.forEach((c) => collapseCard(c));
      if (!isExpanded) expandCard(card);
    });
  });
}

function expandCard(card) {
  card.classList.add('is-expanded');
  card.querySelector('.projects__details-btn')?.setAttribute('aria-expanded', 'true');

  const panel = card.querySelector('.projects__expand');
  if (panel) panel.inert = false;
}

function collapseCard(card) {
  card.classList.remove('is-expanded');
  card.querySelector('.projects__details-btn')?.setAttribute('aria-expanded', 'false');

  const panel = card.querySelector('.projects__expand');
  if (panel) panel.inert = true;
}

function setOptionalProjectLink(link, url) {
  if (!link) return;

  if (url) {
    link.href = url;
    link.hidden = false;
    return;
  }

  link.removeAttribute('href');
  link.hidden = true;
}
