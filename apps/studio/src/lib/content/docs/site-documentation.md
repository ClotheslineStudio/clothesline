# Overview
Welcome to the documentation for **[Your Site Name]**! This site serves as a personal portfolio, blog, and project showcase, designed with SvelteKit and Tailwind CSS.

## Purpose
* **Showcase** personal skills and projects.
* **Blog** for articles and knowledge sharing.
* **Lead generation** for freelance or contract work.

## Tech Stack
* **Frontend:** SvelteKit
* **Styling:** Tailwind CSS (with Typography and Forms plugins)
* **Content:** Markdown
* **Hosting:** Vercel / Netlify (to be decided)
* **Version Control:** GitHub

## Core Features
* Clean, fast, modern responsive design.
* Blog/knowledge base area.
* Project portfolio with detailed case studies.
* Contact form or lead capture.
* Light/Dark mode toggle.
* SEO and accessibility enhancements.

## Folder Structure

```
/src
  /components     # Reusable UI components (Header, Footer, ProjectCards, etc.)
  /lib
    /content      # Markdown files for blog, docs, case studies
  /routes         # Page routes for SvelteKit
    /about
    /projects
    /docs
    /contact
  /styles         # Tailwind CSS and global styles
/static           # Static assets (images, favicon, etc.)
```

## Key Components
* **Header.svelte**: Site navigation + dark mode toggle.
* **Footer.svelte**: Footer with social media links.
* **ProjectCards.svelte**: Grid layout for showcasing projects.
* **ThemeToggle.svelte**: Light/Dark mode switching.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

4. Visit http://localhost:5173 to view the site.

## Content Management
* **Blog posts** are written in Markdown and placed in `/src/lib/content/blog`.
* **Docs** are placed in `/src/lib/content/docs`.
* **Projects** are described in structured objects inside `/src/lib/data/projects.ts`.

## Future Enhancements
* Integrate Sanity CMS for dynamic content.
* Build an accessibility panel for user customization.
* Add GSAP animations for enhanced interactions.
* Connect GitHub to showcase commits and repositories.
* Implement scheduling and payment integration (Stripe).

## Deployment
* Set up on **Vercel** or **Netlify** with auto-deployment on GitHub push.
* Configure environment variables if needed (e.g., for form handling or API keys).

## SEO & Accessibility
* Metadata (`<svelte:head>`) managed per page.
* Open Graph tags for social sharing.
* Accessible navigation and component structures.
* Color contrast maintained for readability.

Thanks for visiting! Let's build something great together.
*(c) [Your Name / Studio Name] - All Rights Reserved.*
