// ✅ Load Tailwind + local app.css (your internal structure)
import '../src/app.css';

// ✅ Manually inject global Clothesline theme
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'file:///C:/Users/travi/OneDrive/Documents/Development/GitHub%20-%20Business/clothesline/packages/themes/dist/clothesline.css';
document.head.appendChild(link);

export const parameters = {
  layout: 'centered',
};


