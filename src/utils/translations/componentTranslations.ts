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
import { contactSalesTranslations } from './contactSalesTranslations';

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
  
  // Log available translations
  console.log(`Available contactSales translations languages:`, Object.keys(contactSalesTranslations));
  
  // Get the translation data with proper fallback
  const contactSalesData = getTranslationsWithFallback(contactSalesTranslations, language);
  
  if (!contactSalesData || !contactSalesData.contactSales) {
    console.error(`No contactSales data found for ${language}`);
    return false;
  }
  
  // Log what we're adding to help debug
  console.log(`ContactSales data to add:`, contactSalesData.contactSales);
  
  // Add the translations to the i18n instance
  const result = addTranslations(language, 'common', { contactSales: contactSalesData.contactSales });
  
  // Log the result
  console.log(`Added contactSales translations for ${language}: ${result ? 'success' : 'failed'}`);
  
  // Force update resources to ensure they're loaded
  if (result) {
    i18n.reloadResources(language, ['common']);
  }
  
  return result;
};

export const loadAllContactSalesTranslations = () => {
  console.log('Loading all ContactSales translations');
  
  // Get all supported languages
  const supportedLangs = getSupportedLanguages();
  
  // Log available languages
  console.log(`Supported languages:`, supportedLangs);
  
  // First add the translations for the current language to ensure immediate visibility
  addContactSalesTranslations(i18n.language);
  
  // Then add translations for all supported languages
  supportedLangs.forEach(lang => {
    addContactSalesTranslations(lang);
  });
  
  // Force a reload of the current language's resources
  i18n.reloadResources(i18n.language, ['common']);
  
  // Dispatch an event to notify that translations have been loaded
  document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
    detail: { component: 'contactSales' } 
  }));
  
  return true;
};

function getSupportedLanguages() {
  return i18n.options.supportedLngs || [];
}
