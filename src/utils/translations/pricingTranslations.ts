
import en from './pricing/en';
import ru from './pricing/ru';

// Define supported languages
const supportedLanguages = ['en', 'ru'];

// Create the translation structure
const pricingTranslations: Record<string, any> = {};

// Add translations for each language
supportedLanguages.forEach(lang => {
  const translations = lang === 'en' ? en : 
                      lang === 'ru' ? ru : 
                      en; // fallback to English
  
  // Store translations with the proper structure
  pricingTranslations[lang] = {
    pricing: translations
  };
});

export { pricingTranslations };
