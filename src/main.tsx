
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n' // Import i18n configuration

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div id="root"></div>';
}

createRoot(document.getElementById("root")!).render(
  <App />
);
