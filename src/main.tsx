
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18next from 'i18next';
import './i18n' // Import i18n configuration before rendering the app

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

// Use a more robust approach for the app rendering
const renderApp = () => {
  console.log('Rendering app with language:', i18next.language);
  createRoot(document.getElementById("root")!).render(
    <App />
  );
};

// Initialize the app once i18next is ready or after 1 second (fallback)
if (i18next.isInitialized) {
  console.log('i18next already initialized');
  renderApp();
} else {
  console.log('Waiting for i18next to initialize...');
  i18next.on('initialized', () => {
    console.log('i18next initialized event fired');
    renderApp();
  });
  
  // Fallback if initialization takes too long
  setTimeout(() => {
    console.log('Fallback timeout triggered for rendering');
    if (!i18next.isInitialized) {
      console.warn('i18next initialization timed out, rendering anyway');
    }
    renderApp();
  }, 1000);
}
