
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
  loadAllWalletTranslations, 
  loadAllFeatureTranslations, 
  loadAllJoinCtaTranslations, 
  loadAllProjectTranslations, 
  loadAllFooterTranslations, 
  loadAllBackendTranslations, 
  loadAllFeaturePageTranslations,
  loadAllUseCasesTranslations
} from './translations/componentTranslations';

// Export everything for backward compatibility
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
  
  // Component-specific load all functions
  loadAllWalletTranslations,
  loadAllFeatureTranslations,
  loadAllJoinCtaTranslations,
  loadAllProjectTranslations,
  loadAllFooterTranslations,
  loadAllBackendTranslations,
  loadAllFeaturePageTranslations,
  loadAllUseCasesTranslations
};

// Export as default for convenience
export default {
  addTranslations,
  addComponentTranslations,
  loadAllComponentTranslations,
  loadTranslations,
  addWalletTranslations,
  addFeatureTranslations,
  addJoinCtaTranslations,
  addProjectTranslations,
  addFooterTranslations,
  addBackendTranslations,
  addFeaturePageTranslations,
  addUseCasesTranslations,
  loadAllWalletTranslations,
  loadAllFeatureTranslations,
  loadAllJoinCtaTranslations,
  loadAllProjectTranslations,
  loadAllFooterTranslations,
  loadAllBackendTranslations,
  loadAllFeaturePageTranslations,
  loadAllUseCasesTranslations
};
