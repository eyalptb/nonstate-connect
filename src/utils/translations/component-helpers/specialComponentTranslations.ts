
import i18n from '@/i18n';
import { addTranslations } from '../translationHelpers';
import { learnTranslations } from '../learnTranslations';
import { pricingTranslations } from '../pricingTranslations';
import { contactSalesTranslations, supportedLanguages } from '../contactSalesTranslations';
import { getTranslationsWithFallback, dispatchTranslationsLoadedEvent } from './translationHelpers';

// Learn translations 
export const addLearnTranslations = (language = i18n.language) => {
  const learnData = getTranslationsWithFallback(learnTranslations, language)?.learn || {};
  return addTranslations(language, 'common', { learn: learnData });
};

export const loadAllLearnTranslations = () => {
  addLearnTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Pricing translations
export const addPricingTranslations = (language = i18n.language) => {
  const pricingData = getTranslationsWithFallback(pricingTranslations, language)?.pricing || {};
  return addTranslations(language, 'common', { pricing: pricingData });
};

export const loadAllPricingTranslations = () => {
  addPricingTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

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
    i18n.reloadResources([language], ['common']);
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
  i18n.reloadResources([i18n.language], ['common']);
  
  // Dispatch an event to notify that translations have been loaded
  dispatchTranslationsLoadedEvent('contactSales');
  
  return true;
};
