
import { dashboardTranslations as importedDashboardTranslations, supportedLanguages } from './dashboard/index';

// Export the imported translations
export const dashboardTranslations = importedDashboardTranslations;
export { supportedLanguages };

// Add debug log to check what translations are available
console.log('[dashboardTranslations] Translations loaded:', Object.keys(importedDashboardTranslations));
for (const lang in importedDashboardTranslations) {
  console.log(`[dashboardTranslations] ${lang} translation keys:`, 
    importedDashboardTranslations[lang] ? Object.keys(importedDashboardTranslations[lang]) : 'none');
}
