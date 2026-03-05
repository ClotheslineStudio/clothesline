import { browser } from '$app/environment';

const STYLE_ID = 'cl-theme-live';

export function applyLiveTheme(cssText: string): void {
  if (!browser) return;

  const head = document.head;
  if (!head) return;

  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    head.appendChild(styleEl);
  }

  if (styleEl.textContent !== cssText) {
    styleEl.textContent = cssText;
  }

  if (head.lastElementChild !== styleEl) {
    head.appendChild(styleEl);
  }
}

export function extractThemeName(cssText: string): string | null {
  const match = cssText.match(/html\[data-theme='([^']+)'\]/);
  return match?.[1] ?? null;
}

