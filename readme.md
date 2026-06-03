# Portfolio | Maryia Kapiturka

A fast, responsive, and accessible portfolio website built with pure JavaScript without heavy frameworks. Developed with a focus on flawless responsive layout, high performance, and smooth animations

* **Live Demo:** `[https://maria-kapiturko-portfolio.vercel.app](https://maria-kapiturko-portfolio.vercel.app)`

---

## 🚀 Key Features

### 1. Interactive Grid & Spotlight FX

* **Smoothness:** The grid animation and spotlight highlight effect run on pure JS and CSS (no heavy Canvas or WebGL required)
* **Optimization:** The mouse move listener is strictly attached to the `Hero` section rather than the entire `window`. Calculations are handled directly by the GPU (via `translate3d` and `mask-image`), keeping the animation at a stable 60+ FPS even on low-end devices

### 2. Flicker-Free Theme & Language Toggles

* **Instant Init:** Theme and language configurations are checked before the DOM fully renders. This completely prevents any unpleasant white flashes or layout jumps on page reload
* **Fluid Transitions:** Toggling themes and languages utilizes the modern View Transitions API for seamless, soft color animations

### 3. Smart Navigation

* **Menu Highlighting:** Active menu items are tracked via the `IntersectionObserver` API as you scroll. This is incredibly lightweight and vastly superior for CPU performance compared to traditional scroll event listeners
* **Mobile-First Menu:** The burger menu is fully responsive, supports proper accessibility attributes (`aria-expanded`), and locks background scrolling when active

### 🤖 AI-Assisted Workflow (Smart Engineering)

* **Leveraging Modern Tools:** This project was developed utilizing advanced AI pair-programming workflows. AI was used as a senior collaborator to perform rigorous code reviews, optimize complex SCSS parallax math, and modularize the JavaScript architecture into clean, decoupled ES6 components

---

## 🛠 Tech Stack & Architecture

### Tools & Technologies

* **Vanilla JS (ES6+)** — Pure JavaScript for ultra-fast load speeds and zero framework overhead
* **SCSS (Sass)** — Used to manage clean styles, design tokens (variables), and flat nesting
* **Vite** — The build tool providing instant Hot Module Replacement (HMR) during development and heavily compressed, production-ready bundles

### Code Architecture

* **Semantic HTML5:** Built strictly with semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`), ensuring maximum SEO indexability and screen-reader friendliness
* **BEM Methodology:** Styles follow a strict BEM structure. This guarantees zero class conflicts, flat selector specificity, and blazing-fast CSS rendering
* **Fluid Responsiveness:** Spacings and font sizes are computed dynamically using a custom `rem()` scaling function. The layout scales beautifully from compact smartphones to ultra-wide desktop monitors

---

## 📈 Performance & Quality

* **Lighthouse 100 / 100:** Achieved perfect scores across all categories: Performance, Accessibility, Best Practices, and SEO
* **Asset Optimization:** Images are delivered in modern `.webp` and `.avif` formats, utilizing native `loading="lazy"` to prevent Cumulative Layout Shifts (CLS)
* **Code Validity:** The markup is 100% compliant with W3C specifications, containing zero syntax errors
* **Cross-Browser Consistency:** Fully tested and proven to perform identically across Blink (Chrome, Edge), WebKit (Safari iOS/macOS), and Gecko (Firefox) engines

---

## 🛠 Getting Started

### Prerequisites

Ensure your current local runtime environment contains the modern stable branch of Node.js:

```bash
node --version # Recommended: v18.0.0 or higher
npm --version  # Recommended: v9.0.0 or higher

```

### Installation Workflow

1. Clone the master repository branch into your system root:
```bash
git clone https://github.com/taracamary/my-portfolio.git
cd my-portfolio

```


2. Boot the dependency acquisition routine:
```bash
npm install

```


3. Launch the hot-reloading development server profile:
```bash
npm run dev

```


The application will instantly mount under your localhost loopback proxy grid: `http://127.0.0.1:5173/`


---

## ✉️ Contact

* **Developer:** Maria Kapiturko — Frontend & HTML Developer
* **Location:** Minsk, Belarus (Available for global remote cooperation)
* **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/taracamary)
* **GitHub:** [Follow on GitHub](https://github.com/taracamary)
