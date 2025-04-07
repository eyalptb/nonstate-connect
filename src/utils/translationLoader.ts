
import { addTranslations, getSupportedLanguages } from './translations/translationHelpers';
import { 
  addComponentTranslations, 
  loadAllComponentTranslations, 
  loadTranslations 
} from './translations/translationCore';
import { 
  addWalletTranslations, 
  addFeatureTranslations, 
  addJoinCtaTranslations, 
  addProjectTranslations, 
  addFooterTranslations, 
  addBackendTranslations, 
  addFeaturePageTranslations, 
  addUseCasesTranslations,
  addLearnTranslations,
  addPricingTranslations,
  addContactSalesTranslations,
  loadAllWalletTranslations, 
  loadAllFeatureTranslations, 
  loadAllJoinCtaTranslations, 
  loadAllProjectTranslations, 
  loadAllFooterTranslations, 
  loadAllBackendTranslations, 
  loadAllFeaturePageTranslations,
  loadAllUseCasesTranslations,
  loadAllLearnTranslations,
  loadAllPricingTranslations,
  loadAllContactSalesTranslations
} from './translations/componentTranslations';

// Export everything in a single export block
export { 
  // Helpers
  addTranslations,
  getSupportedLanguages,
  
  // Core functions
  addComponentTranslations,
  loadAllComponentTranslations,
  loadTranslations,
  
  // Component-specific add functions
  addWalletTranslations,
  addFeatureTranslations,
  addJoinCtaTranslations,
  addProjectTranslations,
  addFooterTranslations,
  addBackendTranslations,
  addFeaturePageTranslations,
  addUseCasesTranslations,
  addLearnTranslations,
  addPricingTranslations,
  addContactSalesTranslations,
  
  // Component-specific load all functions
  loadAllWalletTranslations,
  loadAllFeatureTranslations,
  loadAllJoinCtaTranslations,
  loadAllProjectTranslations,
  loadAllFooterTranslations,
  loadAllBackendTranslations,
  loadAllFeaturePageTranslations,
  loadAllUseCasesTranslations,
  loadAllLearnTranslations,
  loadAllPricingTranslations,
  loadAllContactSalesTranslations
};
