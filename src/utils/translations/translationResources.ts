
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

/**
 * Type for component translation resources
 * The flattened structure ensures proper typing for deeply nested objects
 */
export type TranslationResources = Record<string, Record<string, Record<string, any>>>;

/**
 * Map of all translation resources by namespace
 */
export const translationResources: TranslationResources = {
  wallet: walletTranslations,
  feature: featureTranslations,
  joinCta: joinCtaTranslations,
  project: projectTranslations,
  footer: footerTranslations,
  backend: backendTranslations,
  featurePage: featurePageTranslations,
  useCases: useCasesTranslations,
  learn: learnTranslations,
  pricing: pricingTranslations
};

/**
 * List of all supported component types (for type safety)
 */
export type ComponentType = keyof typeof translationResources;
