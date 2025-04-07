
import i18n from 'i18next';
import initializeI18n from './config';
import { setupEventHandlers } from './eventHandlers';
import { reloadTranslations } from './utils';
import { forceLoadLearnTranslations } from '@/utils/translations/translationDebugger';

// Initialize i18n types for global window object
declare global {
  interface Window {
    reloadTranslations: (language: string) => Promise<boolean>;
    i18n: typeof i18n; // Make i18n available globally for debugging
    forceLoadLearnTranslations: (language?: string) => boolean; // Add for direct access
  }
}

// Initialize i18n with our configuration
initializeI18n();

// Set up event handlers
setupEventHandlers();

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18n = i18n;
  window.forceLoadLearnTranslations = forceLoadLearnTranslations;
}

export { reloadTranslations };
export default i18n;
