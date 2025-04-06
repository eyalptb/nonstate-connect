
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n'
import { TranslationProvider } from './contexts/translation/TranslationContext'
import { NotificationProvider } from './contexts/notification/NotificationContext'
import { Toaster } from 'sonner'

// Get the root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create root once
const root = createRoot(rootElement);

// Function to render the app
const renderApp = () => {
  // Ensure language is set on document
  document.documentElement.lang = i18n.language;
  
  // Load all necessary namespaces at app initialization
  const namespaces = ['common', 'navigation', 'auth', 'messaging', 'governance'];
  
  // Preload all necessary namespaces
  i18n.loadNamespaces(namespaces, (err) => {
    if (err) console.error('Failed to load namespaces:', err);
    
    root.render(
      <TranslationProvider>
        <NotificationProvider>
          <App />
          <Toaster />
        </NotificationProvider>
      </TranslationProvider>
    );
  });
};

// Initialize i18n and then render
if (i18n.isInitialized) {
  console.log('i18n is already initialized, rendering app');
  renderApp();
} else {
  console.log('Waiting for i18n to initialize...');
  
  // Set a timeout in case initialization takes too long
  const timeoutId = setTimeout(() => {
    console.warn('i18n initialization timed out, rendering anyway');
    renderApp();
  }, 2000);
  
  // Listen for initialization
  i18n.on('initialized', () => {
    clearTimeout(timeoutId);
    console.log('i18n initialized successfully');
    renderApp();
  });
}
