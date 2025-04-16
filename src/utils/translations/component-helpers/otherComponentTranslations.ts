
import i18n from '@/i18n';
import { addTranslations } from '../translationHelpers';
import { walletTranslations } from '../walletTranslations';
import { featureTranslations } from '../featureTranslations';
import { joinCtaTranslations } from '../joinCtaTranslations';
import { projectTranslations } from '../projectTranslations';
import { footerTranslations } from '../footerTranslations';
import { featurePageTranslations } from '../featurePageTranslations';
import { useCasesTranslations } from '../useCasesTranslations';
import { learnTranslations } from '../learnTranslations';
import { pricingTranslations } from '../pricingTranslations';
import { contactSalesTranslations, supportedLanguages } from '../contactSalesTranslations';
import { getTranslationsWithFallback, dispatchTranslationsLoadedEvent } from './translationHelpers';

// Wallet translations
export const addWalletTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(walletTranslations, language));

export const loadAllWalletTranslations = () => {
  // Add translations for current language
  addWalletTranslations(i18n.language);
  
  // Force reload resources
  i18n.reloadResources([i18n.language], ['common']);
  
  return true;
};

// Feature translations
export const addFeatureTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(featureTranslations, language));

export const loadAllFeatureTranslations = () => {
  addFeatureTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Join CTA translations
export const addJoinCtaTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(joinCtaTranslations, language));

export const loadAllJoinCtaTranslations = () => {
  addJoinCtaTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Project translations
export const addProjectTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(projectTranslations, language));

export const loadAllProjectTranslations = () => {
  addProjectTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Footer translations
export const addFooterTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(footerTranslations, language));

export const loadAllFooterTranslations = () => {
  addFooterTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Feature page translations
export const addFeaturePageTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(featurePageTranslations, language));

export const loadAllFeaturePageTranslations = () => {
  addFeaturePageTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};

// Use cases translations
export const addUseCasesTranslations = (language = i18n.language) => 
  addTranslations(language, 'common', getTranslationsWithFallback(useCasesTranslations, language));

export const loadAllUseCasesTranslations = () => {
  addUseCasesTranslations(i18n.language);
  i18n.reloadResources([i18n.language], ['common']);
  return true;
};
