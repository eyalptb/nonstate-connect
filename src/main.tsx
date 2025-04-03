
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n'

// Get the root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create root once
const root = createRoot(rootElement);

// Function to render the app
const renderApp = () => {
  console.log('Rendering app with language:', i18n.language);
  document.documentElement.lang = i18n.language; // Set HTML lang attribute
  root.render(<App />);
};

// Initialize i18n and then render
if (i18n.isInitialized) {
  console.log('i18n already initialized');
  renderApp();
} else {
  console.log('Waiting for i18n to initialize');
  
  // Set a timeout in case initialization takes too long
  const timeoutId = setTimeout(() => {
    console.warn('i18n initialization timed out, rendering anyway');
    renderApp();
  }, 2000);
  
  // Listen for initialization
  i18n.on('initialized', () => {
    console.log('i18n initialized event fired');
    clearTimeout(timeoutId);
    renderApp();
  });
}

// Set up language change listener to update HTML lang attribute
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng;
});
