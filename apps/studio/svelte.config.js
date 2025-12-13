import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';
import prism from 'prismjs';
import adapter from '@sveltejs/adapter-vercel';

// ✅ Static imports for extra languages
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-markup.js'; // HTML, XML, SVG
// ❌ No prism-svelte.js needed — we fake it by treating svelte as markup

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: false,
      highlight: {
        highlighter: (code, lang) => {
          const language = (lang === 'svelte') ? 'markup' : lang;
          const grammar = prism.languages[language] || prism.languages.markup;
          const html = prism.highlight(code, grammar, language);
          return `<pre class="language-${lang}"><code>${html}</code></pre>`;
        }
      }
    })
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $content: path.resolve('./src/lib/content')
    }
  }
};

export default config;







