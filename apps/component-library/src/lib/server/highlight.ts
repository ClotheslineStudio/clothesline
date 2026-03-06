import { createHighlighter } from 'shiki';

type SupportedLanguage = 'svelte' | 'ts' | 'js' | 'css' | 'html' | 'json' | 'bash';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['svelte', 'ts', 'js', 'css', 'html', 'json', 'bash']
    });
  }

  return highlighterPromise;
}

export async function highlightCode(code: string, language: SupportedLanguage = 'svelte') {
  try {
    const highlighter = await getHighlighter();
    return highlighter.codeToHtml(code, {
      lang: language,
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    });
  } catch {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }
}

