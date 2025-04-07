
import en from './pricing/en';
import ru from './pricing/ru';

// Define all supported languages based on i18n configuration
const supportedLanguages = ['en', 'ru', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'zh', 'he'];

// Create the translation structure
const pricingTranslations: Record<string, any> = {};

// Add proper translations for each language
supportedLanguages.forEach(lang => {
  // Use available translations or fall back to English
  const translationData = 
    lang === 'en' ? en : 
    lang === 'ru' ? ru : 
    en; // fallback to English for all other languages
  
  // Store translations with the proper structure for each language
  // This ensures all languages have pricing entries properly defined
  pricingTranslations[lang] = {
    pricing: translationData
  };
});

export { pricingTranslations, supportedLanguages };
