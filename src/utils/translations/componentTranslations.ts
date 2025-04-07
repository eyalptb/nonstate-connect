
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

// Track which translations have already been processed to prevent infinite loops
const processedTranslations = new Set<string>();
const MAX_PROCESSING_TIME_MS = 30000; // 30 seconds timeout

// Helper function to safely add translations with error handling
const safelyAddTranslations = (language: string, namespace: string, translations: any): boolean => {
  if (!translations) {
    return false;
  }
  
  try {
    return addTranslations(language, namespace, translations);
  } catch (error) {
    return false;
  }
};

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
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(walletTranslations, language));

export const loadAllWalletTranslations = () => loadTranslations('wallet', { allLanguages: true });

// Feature translations
export const addFeatureTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(featureTranslations, language));

export const loadAllFeatureTranslations = () => loadTranslations('feature', { allLanguages: true });

// Join CTA translations
export const addJoinCtaTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(joinCtaTranslations, language));

export const loadAllJoinCtaTranslations = () => loadTranslations('joinCta', { allLanguages: true });

// Project translations
export const addProjectTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(projectTranslations, language));

export const loadAllProjectTranslations = () => loadTranslations('project', { allLanguages: true });

// Footer translations
export const addFooterTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(footerTranslations, language));

export const loadAllFooterTranslations = () => loadTranslations('footer', { allLanguages: true });

// Backend translations
export const addBackendTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(backendTranslations, language));

export const loadAllBackendTranslations = () => loadTranslations('backend', { allLanguages: true });

// Feature page translations
export const addFeaturePageTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(featurePageTranslations, language));

export const loadAllFeaturePageTranslations = () => loadTranslations('featurePage', { allLanguages: true });

// Use cases translations
export const addUseCasesTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(useCasesTranslations, language));

export const loadAllUseCasesTranslations = () => loadTranslations('useCases', { allLanguages: true });

// Learn translations - using the same approach we'll use for pricing
export const addLearnTranslations = (language = i18n.language) => {
  // Create a unique key for this translation attempt
  const attemptKey = `learn_${language}`;
  
  // Check if we've already attempted this translation recently
  if (processedTranslations.has(attemptKey)) {
    return false;
  }
  
  // Mark this translation as attempted
  processedTranslations.add(attemptKey);
  
  // Get translations, fallback to English if needed
  const translations = getTranslationsWithFallback(learnTranslations, language);
  
  if (!translations) {
    // Remove from attempted after a short delay to allow future attempts
    setTimeout(() => processedTranslations.delete(attemptKey), MAX_PROCESSING_TIME_MS);
    return false;
  }
  
  // Add translations directly to i18n
  const success = safelyAddTranslations(language, 'common', translations);
  
  // Remove from attempted after a delay
  setTimeout(() => processedTranslations.delete(attemptKey), MAX_PROCESSING_TIME_MS);
  
  return success;
};

export const loadAllLearnTranslations = () => loadTranslations('learn', { allLanguages: true });

// Pricing translations - simplified to match Learn's approach
export const addPricingTranslations = (language = i18n.language) => {
  // Create a unique key for this translation attempt
  const attemptKey = `pricing_${language}`;
  
  // Check if we've already attempted this translation recently
  if (processedTranslations.has(attemptKey)) {
    return false;
  }
  
  // Mark this translation as attempted
  processedTranslations.add(attemptKey);
  
  // Get translations, fallback to English if needed
  const translations = getTranslationsWithFallback(pricingTranslations, language);
  
  if (!translations) {
    // Remove from attempted after a short delay to allow future attempts
    setTimeout(() => processedTranslations.delete(attemptKey), MAX_PROCESSING_TIME_MS);
    return false;
  }
  
  // Add translations directly to i18n
  const success = safelyAddTranslations(language, 'common', translations);
  
  // Remove from attempted after a delay
  setTimeout(() => processedTranslations.delete(attemptKey), MAX_PROCESSING_TIME_MS);
  
  return success;
};

export const loadAllPricingTranslations = () => loadTranslations('pricing', { allLanguages: true });
