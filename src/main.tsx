
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18next from 'i18next';
import './i18n' // Import i18n configuration

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

// Function to render the app
const renderApp = () => {
  console.log('Rendering app with language:', i18next.language);
  createRoot(document.getElementById("root")!).render(
    <App />
  );
};

// Initialize the app - improved approach
if (i18next.isInitialized) {
  console.log('i18next already initialized, rendering immediately');
  renderApp();
} else {
  console.log('Waiting for i18next to initialize...');
  
  const timeoutId = setTimeout(() => {
    console.warn('i18next initialization timed out after 2 seconds, rendering anyway');
    renderApp();
  }, 2000);
  
  i18next.on('initialized', () => {
    clearTimeout(timeoutId);
    console.log('i18next initialized event fired');
    renderApp();
  });
}
