// ============================================================================
// renderVision.ts — Clothesline OKLCH color-blind simulation layer
// ============================================================================

const ROLES = [
  "primary", "secondary", "tertiary",
  "success", "warning", "error", "info",
  "accent", "neutral", "surface"
] as const;

const MID_SHADES = [200, 300, 400, 500, 600, 700, 800] as const;

/** Helper to output an oklch-from-var expression */
function oklchFromCT(varName: string, lExpr: string, cExpr: string, hExpr: string): string {
  return `  ${varName}: oklch(from var(${varName}-ct) ${lExpr} ${cExpr} ${hExpr});`;
}

/** Main vision mode renderer */
export function renderVision(): string {
  const modes: Record<string, string[]> = {
    protanopia: [],
    deuteranopia: [],
    tritanopia: [],
    monochrome: [],
  };

  // Iterate all roles and shades
  for (const role of ROLES) {
    for (const shade of MID_SHADES) {
      const base = `--color-${role}-${shade}`;

      // === Protanopia (red-weak) ===
      modes.protanopia.push(
        oklchFromCT(base, "L", "calc(C * 0.82)", "calc(H + 12deg)")
      );

      // === Deuteranopia (green-weak) ===
      modes.deuteranopia.push(
        oklchFromCT(base, "calc(L + 2%)", "calc(C * 0.75)", "calc(H + 6deg)")
      );

      // === Tritanopia (blue-weak) ===
      modes.tritanopia.push(
        oklchFromCT(base, "calc(L + 4%)", "calc(C * 0.70)", "calc(H - 18deg)")
      );

      // === Monochrome (no chroma) ===
      modes.monochrome.push(oklchFromCT(base, "L", "0", "H"));
    }
  }

  // Emit CSS
  return `
/* ================================================================
   Vision Simulation Modes (OKLCH-based)
   ================================================================ */
html[data-vision='protanopia'] {
${modes.protanopia.join("\n")}
}

html[data-vision='deuteranopia'] {
${modes.deuteranopia.join("\n")}
}

html[data-vision='tritanopia'] {
${modes.tritanopia.join("\n")}
}

html[data-vision='monochrome'] {
${modes.monochrome.join("\n")}
}
`.trim();
}
