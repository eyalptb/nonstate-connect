
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n' // Import i18n configuration before rendering the app

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

// Wait for i18next to initialize before rendering
import i18next from 'i18next';

// Use a more robust approach for the app rendering
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <App />
  );
};

// Initialize the app once i18next is ready or after 1 second (fallback)
if (i18next.isInitialized) {
  renderApp();
} else {
  i18next.on('initialized', renderApp);
  // Fallback if initialization takes too long
  setTimeout(renderApp, 1000);
}
