# Portfolio

Personal frontend portfolio for Maria Kapiturko, focused on HTML, SCSS, responsive UI implementation, and lightweight vanilla JavaScript. The site is intentionally framework-free: the main work is in semantic markup, component-level styling, adaptive layouts, UI states, and interaction details

**Live demo:** [maria-kapiturko-portfolio.vercel.app](https://maria-kapiturko-portfolio.vercel.app)

## Overview

This is a static single-page portfolio built with Vite. It presents professional experience, contact links, downloadable CV files, and selected frontend/UI projects

The project is structured around the type of work I usually do as an HTML/CSS and frontend markup developer: translating Figma-oriented UI into semantic HTML, maintainable SCSS, reusable BEM blocks, and responsive layouts that can be handed off for integration into larger applications

## Architecture

Vite is used as the development server and build tool. HTML sections are split into component partials and injected into `index.html` with `vite-plugin-html-inject`, which keeps the page shell readable while allowing each section to live in its own folder

The main source structure is:

```text
src/
  components/
    header/
    hero/
    about/
    projects/
    experience/
    contact/
    footer/
  js/
    main.js
    modules/
  styles/
    base/
    utilities/
    style.scss
```

Each visual section has its own HTML partial and SCSS file. Shared styles are separated into base styles, utility mixins, and component styles:

- `styles/base/_config.scss` contains design tokens, the `rem()` function, breakpoints, and the responsive mixin
- `styles/base/_reset.scss` and `_shared.scss` define document-level defaults, focus behavior, reduced-motion handling, shared layout helpers, and global utilities
- `styles/utilities/` contains reusable SCSS mixins for typography, layout, cards, buttons, tags, icons, and reveal animations
- `styles/style.scss` is the single stylesheet entry point imported from `src/js/main.js`

The boundary between layers is deliberate: HTML owns structure and content, SCSS owns layout and visual states, and JavaScript is limited to interaction state

## Styling

The styling is written in SCSS with BEM naming. Component selectors stay local to their section, while shared patterns are extracted only where they are reused across the page: cards, buttons, icon buttons, tags, section shells, typography, and responsive grids

Design tokens are exposed as CSS custom properties on `:root`, including colors, typography, radius values, z-index layers, easing, and transition timing. Light theme values override the semantic color tokens through `html[data-theme="light"]`, so components consume the same variables in both themes

SCSS aliases are used as proxies for CSS custom properties inside component files. This keeps component code concise while still allowing runtime theme changes through custom properties. Sizing is normalized through a small `rem()` function, and layout code uses logical properties such as `inline-size`, `block-size`, `margin-inline`, `padding-block`, and `inset-inline` where appropriate

BEM is used to keep specificity predictable. Nesting is mostly limited to block elements, modifiers, and local interaction states such as hover, focus, expanded cards, and theme-specific icons

## Responsive Design

The layout is mobile-first. Breakpoints are defined in a shared SCSS map:

- `mobile-lg`: `480px`
- `tablet`: `768px`
- `desktop`: `1024px`

The same breakpoint source is also exposed as `--breakpoint-tablet` so JavaScript can keep the mobile menu behavior aligned with the SCSS breakpoint

Responsive behavior is handled through CSS Grid and Flexbox:

- The header starts as a compact mobile layout with a full-height menu and becomes a three-column grid on tablet screens
- The hero uses a single-column layout by default and switches to a two-column grid on desktop
- About and project sections use responsive grids with content-driven widths and max-width containers
- Project previews keep a stable `16 / 9` aspect ratio, while the profile image uses `4 / 5` with `object-fit: cover`
- Typography uses a mix of fixed `rem` sizes and `clamp()` for larger heading scales

The mobile navigation is also responsive in behavior, not only layout. It locks body scrolling while open, closes when a menu link is selected, and resets automatically when the viewport crosses the tablet breakpoint

## Accessibility

The page uses semantic landmarks and sectioning: `header`, `nav`, `main`, `section`, `article`, and `footer`. `main` has a skip target, and a visible-on-focus skip link is available before the header

Interactive controls use native elements where possible. Navigation items and external resources are links, while theme, language, menu, and project expansion controls are buttons. The implementation includes:

- `aria-label` on navigation, icon-only controls, and localized controls
- `aria-expanded` on the burger menu and project details buttons
- `aria-current="page"` on the active navigation link
- `aria-hidden="true"` on decorative SVGs and visual dividers
- `role="group"` on grouped technology tags in the experience section
- `inert` on hidden mobile menu content and collapsed project detail panels
- Focus-visible outlines defined globally and refined where needed
- Escape handling and Tab focus trapping for the open mobile menu
- `prefers-reduced-motion: reduce` handling that shortens transitions and animations

The language switch also updates localized `aria-label` and `alt` attributes, because those cannot be handled by CSS-only language visibility

## JavaScript & Interactions

JavaScript is intentionally lightweight and split into small modules under `src/js/modules/`. The entry point initializes theme and language early, then wires UI modules after `DOMContentLoaded`

Current modules handle:

- Theme initialization and switching, with `localStorage` persistence and optional View Transition API support
- English/Russian language switching, including `lang` state, localized ARIA/alt attributes, and saved preference
- Mobile menu state, scroll locking, `inert`, Escape handling, focus management, and breakpoint sync
- Header scroll state and active navigation link updates through `IntersectionObserver`
- Scroll reveal animations using `IntersectionObserver`, with a no-observer fallback that shows content
- Hero pointer effects using CSS custom properties and `requestAnimationFrame`, only on fine-pointer devices
- Project card expansion, including `aria-expanded`, `inert`, optional links, and CSS-driven expand/collapse animation
- Project image fallback placeholders if an image fails to load

Animations and presentation stay in CSS where possible. For example, project details expand through a grid row transition, while JavaScript only changes state classes and accessibility attributes

## Internationalization

The portfolio supports English and Russian without an i18n framework. Both language variants are present in the HTML using `lang="en"` and `lang="ru"` spans or blocks

Visibility is controlled by the `lang` attribute on the root `html` element:

```scss
html[lang="en"] [lang="ru"] {
  display: none !important;
}

html[lang="ru"] [lang="en"] {
  display: none !important;
}
```

JavaScript is responsible for choosing the initial language, persisting the preference in `localStorage`, updating the root `lang` attribute, and localizing attributes such as `aria-label` and image `alt` text

## Performance & UX Details

The implementation favors CSS-first behavior and a small JavaScript surface. Theme and language are initialized in an inline head script before the module bundle runs, reducing the chance of a wrong-theme or wrong-language flash on first paint

Other source-level details include:

- Vite handles local development and production bundling
- Theme and language changes use the View Transition API when available, with a direct state update fallback
- Hero pointer effects are disabled on non-fine-pointer devices
- Pointer-driven hero updates are batched with `requestAnimationFrame`
- Scroll reveal and active-section detection use `IntersectionObserver`
- SVG icons are referenced from a shared sprite with `<use>`
- Motion is reduced through a global `prefers-reduced-motion` media query

No performance scores or browser support guarantees are claimed here because they are not measured in the repository

## Tooling

The project uses a small frontend tooling stack:

- Vite
- Sass/SCSS through `sass-embedded`
- `vite-plugin-html-inject` for HTML partial injection
- ESLint for JavaScript
- Stylelint with SCSS support for styles
- Prettier for formatting SCSS in the fix script

## AI-assisted Development

AI-assisted development was used as a supporting tool during parts of the workflow. It helped with code exploration, documentation drafting, refactoring suggestions, identifying inconsistencies, and reviewing implementation options

The architecture, code review, validation, editing, and final implementation decisions remained human-controlled. AI was treated as an assistant for analysis and repetitive work, not as an autonomous author of the project

## Selected Projects

The portfolio includes a small set of selected frontend/UI projects. The links below are taken from the project card source:

- **ATT Landing**: [demo](https://att-landing-gray.vercel.app), [repository](https://github.com/taracamary/att-landing)
- **Managed Site**: [demo](https://maria-kapiturko-manage-site.vercel.app), [repository](https://github.com/taracamary/manage-site)
- **Knomary Dashboard**: [demo](https://knomary-dashboard.vercel.app), [repository](https://github.com/taracamary/knomary-dashboard)

These examples are included as portfolio content. This README focuses on the implementation of the portfolio site itself

## Getting Started

```bash
npm install
npm run dev
```

The Vite dev server is configured to run on `127.0.0.1:5173` and open the browser automatically

## Scripts

```bash
npm run start       # alias for npm run dev
npm run dev         # start the Vite dev server
npm run build       # create a production build
npm run preview     # preview the production build locally
npm run lint:js     # lint JavaScript files in src/
npm run lint:style  # lint SCSS files in src/
npm run lint        # run JavaScript and style linting
npm run lint:fix    # run ESLint, Stylelint, and Prettier fixes
```
