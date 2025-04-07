
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

// Track which translations have already been attempted to avoid infinite loops
const attemptedTranslations = new Set<string>();

// Wallet translations
export const addWalletTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', walletTranslations[language] || walletTranslations.en);

export const loadAllWalletTranslations = () => loadTranslations('wallet', { allLanguages: true });

// Feature translations
export const addFeatureTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', featureTranslations[language] || featureTranslations.en);

export const loadAllFeatureTranslations = () => loadTranslations('feature', { allLanguages: true });

// Join CTA translations
export const addJoinCtaTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', joinCtaTranslations[language] || joinCtaTranslations.en);

export const loadAllJoinCtaTranslations = () => loadTranslations('joinCta', { allLanguages: true });

// Project translations
export const addProjectTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', projectTranslations[language] || projectTranslations.en);

export const loadAllProjectTranslations = () => loadTranslations('project', { allLanguages: true });

// Footer translations
export const addFooterTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', footerTranslations[language] || footerTranslations.en);

export const loadAllFooterTranslations = () => loadTranslations('footer', { allLanguages: true });

// Backend translations
export const addBackendTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', backendTranslations[language] || backendTranslations.en);

export const loadAllBackendTranslations = () => loadTranslations('backend', { allLanguages: true });

// Feature page translations
export const addFeaturePageTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', featurePageTranslations[language] || featurePageTranslations.en);

export const loadAllFeaturePageTranslations = () => loadTranslations('featurePage', { allLanguages: true });

// Use cases translations
export const addUseCasesTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', useCasesTranslations[language] || useCasesTranslations.en);

export const loadAllUseCasesTranslations = () => loadTranslations('useCases', { allLanguages: true });

// Learn translations
export const addLearnTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', learnTranslations[language] || learnTranslations.en);

export const loadAllLearnTranslations = () => loadTranslations('learn', { allLanguages: true });

// Pricing translations with loop prevention
export const addPricingTranslations = (language = i18n.language) => {
  // Create a unique key for this translation attempt
  const attemptKey = `pricing_${language}`;
  
  // Check if we've already attempted this translation recently
  if (attemptedTranslations.has(attemptKey)) {
    console.log(`[addPricingTranslations] Already attempted for ${language}, skipping to prevent loops`);
    return false;
  }
  
  // Mark this translation as attempted
  attemptedTranslations.add(attemptKey);
  console.log(`[addPricingTranslations] Called for language: ${language}`);
  
  // Get translations, fallback to English if needed
  const translations = pricingTranslations[language] || pricingTranslations.en;
  
  if (!translations) {
    console.error(`[addPricingTranslations] No pricing translations found for ${language} or en fallback`);
    // Remove from attempted after a short delay to allow future attempts
    setTimeout(() => attemptedTranslations.delete(attemptKey), 5000);
    return false;
  }
  
  console.log(`[addPricingTranslations] Using translations:`, translations);
  
  // Add translations directly to i18n
  const success = addTranslations(language, 'common', translations);
  
  // Also try adding just the pricing part for extra safety
  if (translations.pricing) {
    console.log(`[addPricingTranslations] Also adding pricing-specific structure`);
    const pricingOnly = { pricing: translations.pricing };
    addTranslations(language, 'common', pricingOnly);
  }
  
  // Remove from attempted after a short delay to allow future attempts if needed
  setTimeout(() => attemptedTranslations.delete(attemptKey), 5000);
  
  return success;
};

export const loadAllPricingTranslations = () => {
  // Create a unique key for this operation
  const attemptKey = `loadAllPricing`;
  
  // Check if we've already attempted this recently
  if (attemptedTranslations.has(attemptKey)) {
    console.log(`[loadAllPricingTranslations] Already attempted recently, skipping to prevent loops`);
    return false;
  }
  
  // Mark this operation as attempted
  attemptedTranslations.add(attemptKey);
  console.log(`[loadAllPricingTranslations] Called`);
  
  // Try to load translations
  const result = loadTranslations('pricing', { allLanguages: true });
  
  // Verify pricing translations were loaded, but only once
  setTimeout(() => {
    const currentLanguage = i18n.language;
    const resources = i18n.getResourceBundle(currentLanguage, 'common');
    
    console.log(`[loadAllPricingTranslations] Verifying pricing translations for ${currentLanguage}`);
    const hasPricing = resources && resources.pricing && Object.keys(resources.pricing).length > 0;
    
    if (!hasPricing) {
      console.log(`[loadAllPricingTranslations] Pricing translations missing after load for ${currentLanguage}, adding them manually`);
      addPricingTranslations(currentLanguage);
    } else {
      console.log(`[loadAllPricingTranslations] Pricing translations loaded successfully for ${currentLanguage}`);
    }
    
    // Remove from attempted after a delay
    setTimeout(() => attemptedTranslations.delete(attemptKey), 5000);
  }, 500);
  
  return result;
};
