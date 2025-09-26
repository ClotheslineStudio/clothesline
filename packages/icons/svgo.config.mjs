const config = {
  multipass: true,
  plugins: [
    'preset-default',
    { name: 'removeViewBox', active: false },
    { name: 'convertPathData', params: { floatPrecision: 3 } },
    { name: 'cleanupNumericValues', params: { floatPrecision: 3 } },
  ],
};

export default config;
