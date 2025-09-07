// packages/themes/src/mode.ts

export type Vision =
  | "none"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "monochromacy"; // full term

export type Contrast = "normal" | "high" | { custom: number };

export type ModeState = {
  theme?: string;
  mode?: "light" | "dark";
  vision?: Vision;
  contrast?: Contrast;
  typescale?: number;
  reading?: "dyslexia" | "plain" | "none";
  motion?: "normal" | "reduced" | "off";
  focus?: boolean;
  ui?: Array<"simplified" | "visual-alerts" | "captions">;
  motor?: Array<"large-hit" | "kbd" | "sticky-controls">;
  rtl?: boolean;
  dev?: Array<"a11y-debug" | "grid" | "tokens">;
};

type VisionInput = Vision | "protan" | "deutan" | "tritan" | "mono" | "monochrome";

const VISION_ALIASES: Record<string, Vision> = {
  protan: "protanopia",
  deutan: "deuteranopia",
  tritan: "tritanopia",
  mono: "monochromacy",
  monochrome: "monochromacy",
};

const isBrowser = typeof document !== "undefined";
const root = () =>
  (isBrowser ? document.documentElement : undefined) as HTMLElement | undefined;

function setAttr(el: HTMLElement, name: string, value?: string | null) {
  if (!value || value === "none") el.removeAttribute(name);
  else el.setAttribute(name, value);
}
function setToken(el: HTMLElement, name: string, value?: string | number) {
  if (value === undefined || value === null || value === "") el.style.removeProperty(name);
  else el.style.setProperty(name, String(value));
}
function setSpaceList(el: HTMLElement, name: string, list?: readonly string[] | string[]) {
  if (list && list.length) el.setAttribute(name, list.join(" "));
  else el.removeAttribute(name);
}
function coerceVision(v?: VisionInput): Vision | undefined {
  if (!v) return undefined;
  return (VISION_ALIASES[v] as Vision) || (v as Vision);
}

/** Read current state from the DOM (best-effort). */
export function getTheme(): ModeState {
  const el = root();
  if (!el) return {};
  const theme = el.getAttribute("data-theme") || undefined;
  const mode = (el.getAttribute("data-mode") as "light" | "dark" | null) || undefined;

  const rawVision = (el.getAttribute("data-vision") as VisionInput | null) || undefined;
  const vision = coerceVision(rawVision) || "none";

  let contrast: Contrast = "normal";
  const dc = el.getAttribute("data-contrast");
  if (dc === "high") contrast = "high";
  else if (dc === "custom") {
    const raw = getComputedStyle(el).getPropertyValue("--contrast-factor").trim();
    const num = Number(raw || "1");
    contrast = { custom: isFinite(num) ? num : 1 };
  }

  const typesetVar = getComputedStyle(el).getPropertyValue("--typeset-scale").trim();
  const typescale = typesetVar ? Number(typesetVar) : undefined;

  const reading = (el.getAttribute("data-reading") as ModeState["reading"]) || "none";
  const motion = (el.getAttribute("data-motion") as ModeState["motion"]) || "normal";
  const focus = el.hasAttribute("data-focus") || undefined;
  const ui = el.getAttribute("data-ui")?.split(/\s+/).filter(Boolean) as ModeState["ui"];
  const motor = el.getAttribute("data-motor")?.split(/\s+/).filter(Boolean) as ModeState["motor"];
  const rtl = el.hasAttribute("data-rtl") || undefined;
  const dev = el.getAttribute("data-dev")?.split(/\s+/).filter(Boolean) as ModeState["dev"];

  return { theme, mode, vision, contrast, typescale, reading, motion, focus, ui, motor, rtl, dev };
}

/** Apply a (partial) state to <html>. */
export function setTheme(patch: Partial<ModeState>) {
  const el = root();
  if (!el) return;

  const current = getTheme();
  const next: ModeState = { ...current, ...patch };

  if (patch.theme !== undefined) setAttr(el, "data-theme", next.theme || null);
  if (patch.mode !== undefined) setAttr(el, "data-mode", next.mode || null);

  if (patch.vision !== undefined) {
    const v = coerceVision(patch.vision as VisionInput);
    setAttr(el, "data-vision", v && v !== "none" ? v : null);
  }

  if (patch.contrast !== undefined) {
    if (patch.contrast === "normal") {
      el.removeAttribute("data-contrast");
      setToken(el, "--contrast-factor", "");
    } else if (patch.contrast === "high") {
      el.setAttribute("data-contrast", "high");
      setToken(el, "--contrast-factor", ""); // factor comes from CSS
    } else if (typeof patch.contrast === "object" && patch.contrast.custom) {
      el.setAttribute("data-contrast", "custom");
      setToken(el, "--contrast-factor", patch.contrast.custom);
    }
  }

  if (patch.typescale !== undefined) {
    const t = Number(patch.typescale) || 1;
    setToken(el, "--typeset-scale", t);
    el.setAttribute("data-typescale", String(t)); // handy for debugging
  }

  if (patch.reading !== undefined) setAttr(el, "data-reading", next.reading || null);
  if (patch.motion !== undefined) setAttr(el, "data-motion", next.motion || null);
  if (patch.focus !== undefined) {
    if (next.focus) el.setAttribute("data-focus", "");
    else el.removeAttribute("data-focus");
  }
  if (patch.ui !== undefined) setSpaceList(el, "data-ui", next.ui);
  if (patch.motor !== undefined) setSpaceList(el, "data-motor", next.motor);
  if (patch.rtl !== undefined) {
    if (next.rtl) el.setAttribute("data-rtl", "");
    else el.removeAttribute("data-rtl");
  }
  if (patch.dev !== undefined) setSpaceList(el, "data-dev", next.dev);
}

