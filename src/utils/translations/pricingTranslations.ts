
import en from './pricing/en';
import ru from './pricing/ru';

// Type for pricing translations
export type PricingTranslations = typeof en;

// Structure for all supported translations
const pricingTranslations: Record<string, PricingTranslations> = {
  en,
  ru
};

export { pricingTranslations };
