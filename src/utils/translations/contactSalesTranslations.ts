
import en from './contactSales/en';
import ru from './contactSales/ru';

// Define supported languages
const supportedLanguages = ['en', 'ru'];

// Create the translation structure
const contactSalesTranslations: Record<string, any> = {};

// Add translations for each language
supportedLanguages.forEach(lang => {
  // Directly use the translation objects without nesting under contactSales
  contactSalesTranslations[lang] = lang === 'en' ? en : 
                                 lang === 'ru' ? ru : 
                                 en; // fallback to English
});

export { contactSalesTranslations };
