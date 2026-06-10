# Maria | Frontend Developer Portfolio

Personal frontend portfolio — a single-page site showcasing professional experience, projects, and technical skills

**Live demo:** [https://maria-kapiturko-portfolio.vercel.app](https://maria-kapiturko-portfolio.vercel.app)

---

## Overview

Single-page portfolio built to demonstrate practical frontend skills: semantic markup, scalable SCSS architecture, modular vanilla JavaScript, and accessible UI patterns

The focus is on clean structure, maintainable styling, and realistic production-level layout practices. All components follow a BEM methodology with strict naming conventions and a modular SCSS structure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 — semantic, component partials via `vite-plugin-html-inject` |
| Styling | SCSS — BEM methodology, modular architecture |
| Scripting | JavaScript ES6+ — vanilla DOM API, no framework |
| Build | Vite |
| Tooling | ESLint · Stylelint · Prettier |

---

## Key Features

- Fully responsive layout with adaptive CSS Grid
- Dark / light theme toggle using the View Transition API
- EN / RU language switch
- Mobile burger navigation with auto-close on resize
- Scroll-based reveal animations via `IntersectionObserver`
- Interactive hero section — mouse-tracking parallax via CSS custom properties
- Project cards with inline expand / collapse (CSS Grid animation, no JS animation logic)
- Centralized SVG icon sprite system
- Open Graph and Twitter Card meta tags
- Keyboard-accessible interactive elements throughout

---

## What I focused on

- FOUC prevention: `initTheme()` and `initLanguage()` execute before `DOMContentLoaded` so the correct theme and language are applied before the first paint
- View Transition API for theme and language switching — no CSS class toggling or JS animation logic
- `IntersectionObserver` for both scroll-reveal animations and active nav link tracking — no `scroll` event listeners
- CSS Grid `grid-template-rows: 0fr → 1fr` for project card expand/collapse — animation is entirely in CSS, JS only toggles a class and aria attributes
- Centralized SVG sprite: all icons live in a single `public/sprite.svg`, referenced via `<use href="sprite.svg#icon-*">`
- EN/RU language switch driven by `lang` attribute on `<html>` — CSS handles visibility of `[lang="en"]` / `[lang="ru"]` spans, no DOM manipulation
- Mouse-tracking parallax in the hero section implemented via CSS custom properties updated on `pointermove` — no JS animation loop

---

## UI / UX Highlights

- Theme toggle transitions with a native View Transition animation — content morphs smoothly, no flash
- Language switch between EN and RU is instant and stateful — preference persisted in `localStorage`
- Project cards expand inline with a CSS Grid row animation — no modal, no overlay, no scroll lock
- Mobile navigation auto-closes when the viewport resizes past the desktop breakpoint via `MediaQueryList`
- Active nav link updates on scroll without a scroll listener — driven by `IntersectionObserver` on each section
- Scroll-reveal animations respect `prefers-reduced-motion` — utility class approach, no JS condition needed
- Hero parallax effect is skipped on touch devices via `(pointer: fine)` media query — no interaction on mobile

---

## Architecture

- Each component lives in its own folder with a co-located `.scss` file — HTML partial and styles stay together
- Global SCSS is split into focused partials: `_reset`, `_config` (tokens, mixins, functions), `_shared` (global element styles), loaded through a single `style.scss` entry point
- Utility layer separated into focused files: `_animations`, `_layout`, `_typography`, `_components`
- BEM naming throughout — flat specificity, no deep nesting
- Design tokens (colors, spacing, font sizes) are centralized as CSS custom properties in `_config.scss`; pixel-to-rem conversion handled by a custom `rem()` function
- Layout built with CSS Grid for section-level structure and Flexbox for component internals — no utility framework
- HTML partials injected at build time via `vite-plugin-html-inject` — component markup stays co-located, `index.html` stays clean
- Single JS entry point (`main.js`); each UI concern is an isolated module initialized explicitly after `DOMContentLoaded`
- Theme and language modules initialize before `DOMContentLoaded` to prevent FOUC — all other modules initialize after DOM is ready
- Build tooling: Vite

---

## Accessibility

- Semantic HTML structure (`header`, `main`, `section`, `article`, `footer`)
- Proper heading hierarchy (H1 → H2 → H3)
- `aria-expanded`, `aria-hidden`, `aria-label` on interactive elements
- Keyboard-accessible navigation and controls
- Focus states on all interactive elements
- `prefers-reduced-motion` respected via CSS

---

## AI Assistance

AI tools were used as a supporting instrument throughout the project. All core architecture, markup, styling, and technical decisions were implemented manually. AI assisted with generating and refining parts of the JavaScript logic, improving component interactivity and UX behavior, and auditing the codebase — catching bugs, weak spots, accessibility issues, and structural inconsistencies. It was also used for targeted refactoring and optimization of individual modules. All suggestions were critically reviewed and adapted before integration. Final responsibility for all code and decisions remained with the author

---

## Getting Started

```bash
git clone https://github.com/taracamary/my-portfolio.git
cd my-portfolio
npm install
npm run dev       # dev server → http://127.0.0.1:5173
```
---

## Contact

- **Developer:** Maria Kapiturko — Frontend & HTML Developer
- **Location:** Minsk, Belarus (Available for global remote cooperation)
- **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/taracamary)
- **GitHub:** [Follow on GitHub](https://github.com/taracamary)
