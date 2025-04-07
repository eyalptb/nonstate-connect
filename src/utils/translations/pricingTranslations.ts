
import en from './pricing/en';
import ru from './pricing/ru';

// Type for pricing translations
export type PricingTranslations = {
  pricing: typeof en;
};

// Structure for all supported translations
const pricingTranslations: Record<string, PricingTranslations> = {
  en: { pricing: en },
  ru: { pricing: ru }
};

export { pricingTranslations };
