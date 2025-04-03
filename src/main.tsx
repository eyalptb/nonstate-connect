
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
  console.log('[main] Rendering app with language:', i18n.language);
  console.log('[main] i18n initialization status:', { 
    isInitialized: i18n.isInitialized, 
    language: i18n.language,
    availableLanguages: i18n.languages,
    loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
    resourcesAvailable: Object.keys(i18n.store?.data || {})
  });
  
  // Check if specific namespaces and languages are loaded in a type-safe way
  const hasRussianCommon = !!i18n.store?.data?.ru?.common;
  const hasEnglishCommon = !!i18n.store?.data?.en?.common;
  
  // Get wallet keys in a type-safe way
  const russianWallet = hasRussianCommon && 
                       typeof i18n.store?.data?.ru?.common === 'object' && 
                       'wallet' in i18n.store?.data?.ru?.common ? 
                       i18n.store?.data?.ru?.common?.wallet : undefined;
  
  console.log('[main] Resource availability check:', {
    hasRussianCommon,
    hasEnglishCommon,
    russianCommonKeys: hasRussianCommon ? Object.keys(i18n.store?.data?.ru?.common || {}) : [],
    englishCommonKeys: hasEnglishCommon ? Object.keys(i18n.store?.data?.en?.common || {})  : [],
    russianWallet
  });
  
  document.documentElement.lang = i18n.language; // Set HTML lang attribute
  root.render(<App />);
};

// Initialize i18n and then render
if (i18n.isInitialized) {
  console.log('[main] i18n already initialized, rendering immediately');
  renderApp();
} else {
  console.log('[main] Waiting for i18n to initialize');
  
  // Set a timeout in case initialization takes too long
  const timeoutId = setTimeout(() => {
    console.warn('[main] i18n initialization timed out after 2000ms, rendering anyway');
    renderApp();
  }, 2000);
  
  // Listen for initialization
  i18n.on('initialized', () => {
    console.log('[main] i18n initialized event fired');
    clearTimeout(timeoutId);
    renderApp();
  });
  
  // Also check for loaded event as backup
  i18n.on('loaded', (data) => {
    console.log('[main] i18n resources loaded event fired', data);
    // Don't render here, just log
  });
}

// Check initialization status periodically for debugging
const checkInitStatus = setInterval(() => {
  if (i18n.isInitialized) {
    console.log('[main] i18n is now initialized, clearing check interval');
    clearInterval(checkInitStatus);
  } else {
    console.log('[main] i18n still not initialized...');
  }
}, 500);

// Clear the interval after 5 seconds regardless
setTimeout(() => clearInterval(checkInitStatus), 5000);
