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
  const contactSalesData = getTranslationsWithFallback(contactSalesTranslations, language)?.contactSales || {};
  return addTranslations(language, 'common', { contactSales: contactSalesData });
};

export const loadAllContactSalesTranslations = () => loadTranslations('contactSales', { allLanguages: true });
