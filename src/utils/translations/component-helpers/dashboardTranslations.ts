
import i18n from '@/i18n';
import { addTranslations } from '../translationHelpers';
import { dashboardTranslations } from '../dashboardTranslations';
import { 
  getTranslationsWithFallback, 
  forceReloadResources, 
  dispatchTranslationsLoadedEvent 
} from './translationHelpers';

/**
 * Adds dashboard translations for the specified language
 */
export const addDashboardTranslations = (language = i18n.language) => {
  console.log(`Adding dashboard translations for ${language}`);
  
  // Get the dashboard data with fallback
  const dashboardData = getTranslationsWithFallback(dashboardTranslations, language);
  
  // Debug log what we found
  console.log(`Dashboard data for ${language}:`, dashboardData);
  
  // Check if we have the dashboard data
  if (!dashboardData || !dashboardData.dashboard) {
    console.error(`No dashboard data found for ${language}`);
    return false;
  }
  
  // Add the translations with the dashboard key
  const result = addTranslations(language, 'common', { dashboard: dashboardData.dashboard });
  
  // Force a reload of resources
  if (result) {
    i18n.reloadResources(language, ['common']).then(() => {
      // Debug log to verify translations are loaded after resource reload
      console.log(`Dashboard translations verified after reload for ${language}:`, 
        i18n.getResourceBundle(language, 'common')?.dashboard || 'None found');
      
      // Check specifically for garden projects
      const bundle = i18n.getResourceBundle(language, 'common');
      if (bundle && typeof bundle === 'object' && 'dashboard' in bundle) {
        const dashboard = (bundle as Record<string, any>).dashboard;
        if (dashboard && 'gardenProjects' in dashboard) {
          console.log(`Garden projects translations loaded for ${language}:`, dashboard.gardenProjects);
        } else {
          console.warn(`No garden projects translations found in dashboard for ${language}`);
        }
      }
    });
  }
  
  return result;
};

/**
 * Loads all dashboard translations for all supported languages
 */
export const loadAllDashboardTranslations = () => {
  console.log('Loading all Dashboard translations');
  
  // Get all supported languages
  const allLanguages = getSupportedLanguages();
  
  // First add the translations for the current language
  const currentResult = addDashboardTranslations(i18n.language);
  console.log(`Dashboard translations loaded for current language (${i18n.language}):`, currentResult);
  
  // Then add translations for all other supported languages
  allLanguages.forEach(lang => {
    if (lang !== i18n.language) {
      const result = addDashboardTranslations(lang);
      console.log(`Dashboard translations loaded for ${lang}:`, result);
    }
  });
  
  // Force a reload of current language resources
  i18n.reloadResources(i18n.language, ['common']).then(() => {
    console.log('Dashboard translations reloaded for:', i18n.language);
    
    // Verify garden project translations are loaded
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    if (bundle && typeof bundle === 'object' && 'dashboard' in bundle) {
      const dashboard = (bundle as Record<string, any>).dashboard;
      if (dashboard && 'gardenProjects' in dashboard) {
        console.log(`Garden projects translations verified for ${i18n.language}:`, dashboard.gardenProjects);
      } else {
        console.warn(`Garden projects translations still missing for ${i18n.language} after reload`);
      }
    }
  });
  
  // Dispatch an event to notify that translations have been loaded
  dispatchTranslationsLoadedEvent('dashboard');
  
  return true;
};

/**
 * Helper to get supported languages
 */
function getSupportedLanguages() {
  return i18n.options.supportedLngs || ['en', 'ru', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'zh', 'he'];
}
