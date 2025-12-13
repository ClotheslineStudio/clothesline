# Deployment and Maintenance

This section explains how to deploy and maintain the Clothesline Studio website.

## Hosting Options

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Render](https://render.com/)

> **Preferred:** Vercel for simplicity and SvelteKit optimization.

## Deploying to Vercel

1. Connect the GitHub repository.
2. Set Framework to **SvelteKit**.
3. Set environment variables if needed.
4. Deploy!

## Scheduled Maintenance

- Update dependencies monthly (`pnpm update`)
- Check for Tailwind, SvelteKit, and MDsveX upgrades
- Review SEO and LLM optimization metadata

## Backup Strategy

- GitHub serves as the source of truth
- Periodic local backups of the `src` and `static` folders

---

_Keep it simple. Keep it fast. Keep it creative._
