
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
  addDashboardTranslations,
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
  loadAllContactSalesTranslations,
  loadAllDashboardTranslations
} from './translations/component-helpers';

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
  addDashboardTranslations,
  
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
  loadAllContactSalesTranslations,
  loadAllDashboardTranslations
};
