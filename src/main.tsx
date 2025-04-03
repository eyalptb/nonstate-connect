import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n'

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

// Create root once
const root = createRoot(document.getElementById("root")!);

// Function to render the app
const renderApp = () => {
  console.log('Rendering app with language:', i18n.language);
  root.render(<App />);
};

// Wait for i18next to initialize before rendering
const initializeApp = () => {
  // Set a timeout in case i18next initialization takes too long
  const timeoutId = setTimeout(() => {
    console.warn('i18next initialization timed out after 2 seconds, rendering anyway');
    renderApp();
  }, 2000);

  // If already initialized, render immediately
  if (i18n.isInitialized) {
    console.log('i18next already initialized, rendering immediately');
    clearTimeout(timeoutId);
    renderApp();
    return;
  }

  // Otherwise wait for the initialized event
  i18n.on('initialized', () => {
    console.log('i18next initialized event fired');
    clearTimeout(timeoutId);
    renderApp();
  });
};

// Start initialization process
initializeApp();
