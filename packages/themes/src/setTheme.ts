import type { ModeState, Vision, Contrast } from './modes.js';

function setAttr(el: HTMLElement, name: string, value?: string | null) {
  if (value === undefined || value === null || value === '') el.removeAttribute(name);
  else el.setAttribute(name, String(value));
}
function setBool(el: HTMLElement, name: string, on?: boolean) {
  if (!!on) el.setAttribute(name, 'true'); else el.removeAttribute(name);
}
function setList(el: HTMLElement, name: string, list?: string[] | null) {
  if (list && list.length) el.setAttribute(name, list.join(' '));
  else el.removeAttribute(name);
}

function applyState(root: HTMLElement, s: Partial<ModeState>) {
  if (s.theme !== undefined) setAttr(root, 'data-theme', s.theme || null);
  if (s.mode !== undefined) setAttr(root, 'data-mode', s.mode || null);

  if (s.vision !== undefined) {
    const v = (s.vision === 'none' ? null : s.vision);
    setAttr(root, 'data-vision', v);
  }

  if (s.contrast !== undefined) {
    if (s.contrast === 'normal') {
      setAttr(root, 'data-contrast', 'normal');
      root.style.removeProperty('--contrast-factor');
    } else if (s.contrast === 'high') {
      setAttr(root, 'data-contrast', 'high');
      root.style.removeProperty('--contrast-factor');
    } else {
      setAttr(root, 'data-contrast', 'custom');
      const factor = Math.max(0.8, Math.min(1.5, Number(s.contrast.custom || 1)));
      root.style.setProperty('--contrast-factor', String(factor));
    }
  }

  if (s.typescale !== undefined) setAttr(root, 'data-typescale', String(s.typescale));

  if (s.reading !== undefined) {
    setAttr(root, 'data-reading', s.reading === 'none' ? null : s.reading);
  }

  if (s.motion !== undefined) setAttr(root, 'data-motion', s.motion || null);
  if (s.focus !== undefined) setBool(root, 'data-focus', s.focus);
  if (s.rtl !== undefined) setBool(root, 'data-rtl', s.rtl);

  if (s.ui !== undefined) setList(root, 'data-ui', s.ui || null);
  if (s.motor !== undefined) setList(root, 'data-motor', s.motor || null);
  if (s.dev !== undefined) setList(root, 'data-dev', s.dev || null);
}

export function setTheme(state: Partial<ModeState>): void;
/** Back-compat: setTheme(theme, mode, vision?) */
export function setTheme(theme?: string, mode?: 'light' | 'dark', vision?: Exclude<Vision, 'none'>): void;
export function setTheme(a?: any, b?: any, c?: any): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  if (typeof a === 'string') {
    // Back-compat call
    const s: Partial<ModeState> = { theme: a, mode: b, vision: c ?? 'none' };
    applyState(root, s);
    return;
  }
  // Object form (partial updates OK)
  const s: Partial<ModeState> = a || {};
  applyState(root, s);
}







