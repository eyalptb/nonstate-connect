
import i18n from '@/i18n';
import { loadTranslations } from './translationCore';
import { addTranslations } from './translationHelpers';
import { walletTranslations } from './walletTranslations';
import { featureTranslations } from './featureTranslations';
import { joinCtaTranslations } from './joinCtaTranslations';
import { projectTranslations } from './projectTranslations';
import { footerTranslations } from './footerTranslations';
import { backendTranslations } from './backendTranslations';
import { featurePageTranslations } from './featurePageTranslations';
import { useCasesTranslations } from './useCasesTranslations';
import { learnTranslations } from './learnTranslations';
import { pricingTranslations } from './pricingTranslations';
import { contactSalesTranslations, supportedLanguages } from './contactSalesTranslations';
import { dashboardTranslations } from './dashboardTranslations';

// Helper to get translations with fallback
const getTranslationsWithFallback = (
  translationSet: Record<string, any>, 
  language: string,
  fallbackLanguage: string = 'en'
) => {
  return translationSet[language] || translationSet[fallbackLanguage];
};

// Wallet translations
export const addWalletTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(walletTranslations, language));

export const loadAllWalletTranslations = () => loadTranslations('wallet', { allLanguages: true });

// Feature translations
export const addFeatureTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(featureTranslations, language));

export const loadAllFeatureTranslations = () => loadTranslations('feature', { allLanguages: true });

// Join CTA translations
export const addJoinCtaTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(joinCtaTranslations, language));

export const loadAllJoinCtaTranslations = () => loadTranslations('joinCta', { allLanguages: true });

// Project translations
export const addProjectTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(projectTranslations, language));

export const loadAllProjectTranslations = () => loadTranslations('project', { allLanguages: true });

// Footer translations
export const addFooterTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(footerTranslations, language));

export const loadAllFooterTranslations = () => loadTranslations('footer', { allLanguages: true });

// Backend translations
export const addBackendTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(backendTranslations, language));

export const loadAllBackendTranslations = () => loadTranslations('backend', { allLanguages: true });

// Feature page translations
export const addFeaturePageTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(featurePageTranslations, language));

export const loadAllFeaturePageTranslations = () => loadTranslations('featurePage', { allLanguages: true });

// Use cases translations
export const addUseCasesTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(useCasesTranslations, language));

export const loadAllUseCasesTranslations = () => loadTranslations('useCases', { allLanguages: true });

// Learn translations 
export const addLearnTranslations = (language = i18n.language) => {
  const learnData = getTranslationsWithFallback(learnTranslations, language)?.learn || {};
  return addTranslations(language, 'common', { learn: learnData });
};

export const loadAllLearnTranslations = () => loadTranslations('learn', { allLanguages: true });

// Pricing translations
export const addPricingTranslations = (language = i18n.language) => {
  const pricingData = getTranslationsWithFallback(pricingTranslations, language)?.pricing || {};
  return addTranslations(language, 'common', { pricing: pricingData });
};

export const loadAllPricingTranslations = () => loadTranslations('pricing', { allLanguages: true });

// Contact Sales translations
export const addContactSalesTranslations = (language = i18n.language) => {
  console.log(`Adding contactSales translations for ${language}`);
  
  // Get the translation data with proper fallback
  const contactSalesData = getTranslationsWithFallback(contactSalesTranslations, language);
  
  if (!contactSalesData || !contactSalesData.contactSales) {
    console.error(`No contactSales data found for ${language}`);
    return false;
  }
  
  // Add the translations to the i18n instance
  const result = addTranslations(language, 'common', { contactSales: contactSalesData.contactSales });
  
  // Force update resources to ensure they're loaded
  if (result) {
    i18n.reloadResources(language, ['common']);
  }
  
  return result;
};

export const loadAllContactSalesTranslations = () => {
  console.log('Loading all ContactSales translations');
  
  // First add the translations for the current language to ensure immediate visibility
  addContactSalesTranslations(i18n.language);
  
  // Then add translations for all supported languages
  supportedLanguages.forEach(lang => {
    if (lang !== i18n.language) {
      addContactSalesTranslations(lang);
    }
  });
  
  // Force a reload of the current language's resources
  i18n.reloadResources(i18n.language, ['common']);
  
  // Dispatch an event to notify that translations have been loaded
  document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
    detail: { component: 'contactSales' } 
  }));
  
  return true;
};

// Dashboard translations
export const addDashboardTranslations = (language = i18n.language) => {
  console.log(`Adding dashboard translations for ${language}`);
  
  // Get the dashboard data with fallback
  const dashboardData = getTranslationsWithFallback(dashboardTranslations, language);
  
  // Check if we have the dashboard data
  if (!dashboardData || !dashboardData.dashboard) {
    console.error(`No dashboard data found for ${language}`);
    return false;
  }
  
  // Add the translations with the dashboard key
  const result = addTranslations(language, 'common', { dashboard: dashboardData.dashboard });
  
  // Force a reload of resources
  if (result) {
    i18n.reloadResources(language, ['common']);
    
    // Debug log to verify translations are loaded
    console.log(`Dashboard translations added for ${language}:`, 
      i18n.getResourceBundle(language, 'common')?.dashboard || 'None found');
  }
  
  return result;
};

export const loadAllDashboardTranslations = () => {
  console.log('Loading all Dashboard translations');
  
  // Get all supported languages
  const allLanguages = supportedLanguages;
  
  // First add the translations for the current language
  addDashboardTranslations(i18n.language);
  
  // Then add translations for all other supported languages
  allLanguages.forEach(lang => {
    if (lang !== i18n.language) {
      addDashboardTranslations(lang);
    }
  });
  
  // Force a reload of current language resources
  i18n.reloadResources(i18n.language, ['common']).then(() => {
    console.log('Dashboard translations reloaded for:', i18n.language);
  });
  
  // Dispatch an event to notify that translations have been loaded
  document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
    detail: { component: 'dashboard' } 
  }));
  
  return true;
};

// Helper to get supported languages - moved to the translationHelpers.ts
function getSupportedLanguages() {
  return i18n.options.supportedLngs || supportedLanguages;
}
