
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n'
import { TranslationProvider } from './contexts/translation/TranslationContext'

// Get the root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create root once
const root = createRoot(rootElement);

// Function to render the app
const renderApp = () => {
  document.documentElement.lang = i18n.language;
  root.render(
    <TranslationProvider>
      <App />
    </TranslationProvider>
  );
};

// Initialize i18n and then render
if (i18n.isInitialized) {
  renderApp();
} else {
  // Set a timeout in case initialization takes too long
  const timeoutId = setTimeout(() => {
    renderApp();
  }, 2000);
  
  // Listen for initialization
  i18n.on('initialized', () => {
    clearTimeout(timeoutId);
    renderApp();
  });
}
