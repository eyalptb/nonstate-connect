
import en from './contactSales/en';
import ru from './contactSales/ru';

// Define supported languages
const supportedLanguages = ['en', 'ru'];

// Create the translation structure
const contactSalesTranslations: Record<string, any> = {};

// Add translations for each language
supportedLanguages.forEach(lang => {
  const translations = lang === 'en' ? en : 
                      lang === 'ru' ? ru : 
                      en; // fallback to English
  
  // Store translations with the proper structure
  contactSalesTranslations[lang] = {
    contactSales: translations
  };
});

export { contactSalesTranslations };
