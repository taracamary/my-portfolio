/**
 * Модуль раскрытия карточек проектов
 *
 * Используется для:
 * - инлайн-раскрытия карточки с подробным описанием и ссылками без перехода на другую страницу
 *
 * Особенности реализации:
 * - Контент блока .projects__expand заполняется из data-атрибутов карточки один раз
 *   при инициализации — HTML остаётся пустым, данные живут только в атрибутах
 * - Логика «одна открытая карточка»: при каждом раскрытии сначала сбрасываются
 *   все карточки, а потом раскрывается только нажатая — без отдельного отслеживания
 *   предыдущей активной карточки
 * - Клики по ссылкам внутри карточки пропускаются через e.target.closest('a'),
 *   чтобы переходы по GitHub/Demo работали как обычно и не триггерили toggle
 * - Анимация раскрытия реализована в CSS через grid-template-rows: 0fr → 1fr
 *   и opacity transition — JS только переключает класс is-expanded и aria-атрибуты
 */

export function initProjectExpand() {
  const cards = document.querySelectorAll('.projects__card');

  cards.forEach((card) => {
    // Заполняем expand-контент из data-атрибутов при инициализации, а не при каждом раскрытии — DOM меняется только один раз
    const { detailsEn, detailsRu, github, demo } = card.dataset;
    const elEn = card.querySelector('.projects__expand-details[lang="en"]');
    const elRu = card.querySelector('.projects__expand-details[lang="ru"]');
    const demoLink = card.querySelector('.projects__expand-link--demo');
    const githubLink = card.querySelector('.projects__expand-link--github');

    if (elEn) elEn.textContent = detailsEn ?? '';
    if (elRu) elRu.textContent = detailsRu ?? '';
    if (demoLink) demoLink.href = demo ?? '#';
    if (githubLink) githubLink.href = github ?? '#';

    card.addEventListener('click', (e) => {
      // Не перехватываем клики по ссылкам внутри карточки — они открывают GitHub/Demo
      if (e.target.closest('a')) return;

      const isExpanded = card.classList.contains('is-expanded');

      // Сбрасываем все карточки перед раскрытием выбранной
      cards.forEach((c) => collapseCard(c));

      // Если карточка была свёрнута — раскрываем; если уже была открыта — оставляем свёрнутой
      if (!isExpanded) expandCard(card);
    });
  });
}

function expandCard(card) {
  card.classList.add('is-expanded');

  // aria-expanded сообщает вспомогательным технологиям, что блок раскрыт
  card.querySelector('.projects__details-btn')?.setAttribute('aria-expanded', 'true');

  // Снимаем inert: контент панели становится доступен и для фокуса, и для скринридера
  const panel = card.querySelector('.projects__expand');
  if (panel) panel.inert = false;
}

function collapseCard(card) {
  card.classList.remove('is-expanded');
  card.querySelector('.projects__details-btn')?.setAttribute('aria-expanded', 'false');

  // inert убирает свёрнутую панель из таб-порядка и из дерева доступности —
  // ссылки внутри больше не получают фокус, пока карточка закрыта
  const panel = card.querySelector('.projects__expand');
  if (panel) panel.inert = true;
}
