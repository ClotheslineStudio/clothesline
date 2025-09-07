/** @type {import('@sveltejs/package').PackageConfig} */
export default {
  emitTypes: true,
  emitCss: false, // most important — inlines styles for SSR hydration
  input: 'src',   // optional, since you're passing it via CLI already
  output: 'dist'  // optional
};
