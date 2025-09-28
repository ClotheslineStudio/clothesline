// SVGO v3
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,        // keep id="tone1"/"tone2"
          removeViewBox: false,     // keep viewBox

          // 🔒 keep structure & order — don't fold/move/merge groups/elems
          collapseGroups: false,
          mergePaths: false,
          moveGroupAttrsToElems: false,
          moveElemsAttrsToGroup: false,

          // keep primitive shapes (helps our circle overlap fixer)
          convertShapeToPath: false,

          // keep explicit fill="none"/stroke props we rely on pre-sanitize
          removeUselessStrokeAndFill: false,
        },
      },
    },
    // purely cosmetic; safe to remove
    // { name: 'sortAttrs' },
  ],
};

