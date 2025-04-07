
import en from './pricing/en';
import ru from './pricing/ru';
import fr from './pricing/fr';
import de from './pricing/de';
import es from './pricing/es';
import ar from './pricing/ar';
import bn from './pricing/bn';
import hi from './pricing/hi';
import ja from './pricing/ja';
import pt from './pricing/pt';
import zh from './pricing/zh';
import he from './pricing/he';

// Define all supported languages based on i18n configuration
const supportedLanguages = ['en', 'ru', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'zh', 'he'];

// Create the translation structure
const pricingTranslations: Record<string, any> = {};

// Create language mapping for easy access
const translationFiles: Record<string, any> = {
  en, ru, fr, de, es, ar, bn, hi, ja, pt, zh, he
};

// Add proper translations for each language
supportedLanguages.forEach(lang => {
  // Use the appropriate translation file for each language
  const translationData = translationFiles[lang];
  
  // Store translations with the proper structure for each language
  pricingTranslations[lang] = {
    pricing: translationData
  };
});

// Log all languages that have pricing translations for debugging
console.log('Languages with pricing translations:', Object.keys(pricingTranslations));

export { pricingTranslations, supportedLanguages };
