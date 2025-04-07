
import en from './contactSales/en';
import ru from './contactSales/ru';

// Define supported languages
const supportedLanguages = ['en', 'ru'];

// Create the translation structure
const contactSalesTranslations: Record<string, any> = {
  en: { contactSales: en },
  ru: { contactSales: ru }
};

export { contactSalesTranslations };
