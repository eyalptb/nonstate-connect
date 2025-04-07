
import en from './contactSales/en';
import ru from './contactSales/ru';
import fr from './contactSales/fr';
import de from './contactSales/de';
import es from './contactSales/es';
import ar from './contactSales/ar';
import bn from './contactSales/bn';
import hi from './contactSales/hi';
import ja from './contactSales/ja';
import pt from './contactSales/pt';
import zh from './contactSales/zh';
import he from './contactSales/he';

// Define supported languages
const supportedLanguages = ['en', 'ru', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'zh', 'he'];

// Create the translation structure
const contactSalesTranslations: Record<string, any> = {
  en: { contactSales: en },
  ru: { contactSales: ru },
  fr: { contactSales: fr },
  de: { contactSales: de },
  es: { contactSales: es },
  ar: { contactSales: ar },
  bn: { contactSales: bn },
  hi: { contactSales: hi },
  ja: { contactSales: ja },
  pt: { contactSales: pt },
  zh: { contactSales: zh },
  he: { contactSales: he }
};

export { contactSalesTranslations, supportedLanguages };
