// Load Tailwind + all theme CSS (from src/app.css)
import '../src/app.css';

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
};

// Apply default theme attributes so your tokens resolve
const root = document.documentElement;
root.setAttribute('data-theme', 'clothesline');
root.setAttribute('data-mode', 'light');
root.setAttribute('data-contrast', 'normal');

// No decorators for now – keep it simple
export const decorators = [];


