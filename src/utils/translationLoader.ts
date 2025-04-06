
import i18n from '@/i18n';

/**
 * Dynamically adds translations to the i18n instance
 * This works even for "read-only" translation files as it adds translations to the runtime
 */
export const addTranslations = (
  language: string, 
  namespace: string, 
  resources: Record<string, string>
) => {
  try {
    // Add the resources to the i18n instance
    i18n.addResourceBundle(language, namespace, resources, true, true);
    console.log(`Added translations for ${language}/${namespace}:`, resources);
    return true;
  } catch (error) {
    console.error(`Failed to add translations for ${language}/${namespace}:`, error);
    return false;
  }
};

/**
 * Adds wallet translations for a specific language
 */
export const addWalletTranslations = (language: string) => {
  // Define wallet translations for the specified language
  const walletTranslations: Record<string, Record<string, string>> = {
    en: {
      "wallet.title": "CollabCoin Wallet",
      "wallet.description": "Your tokenized incentives",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "Earn through secure collaboration and spend on premium features",
      "wallet.section_title": "CollabCoin Wallet",
      "wallet.section_description": "Your tokenized incentives"
    },
    ru: {
      "wallet.title": "Кошелек CollabCoin",
      "wallet.description": "Ваши токенизированные стимулы",
      "wallet.coins": "КоллабКоины",
      "wallet.earn": "Зарабатывайте через безопасное сотрудничество и тратьте на премиум-функции",
      "wallet.section_title": "Кошелек CollabCoin",
      "wallet.section_description": "Ваши токенизированные стимулы"
    },
    fr: {
      "wallet.title": "Portefeuille CollabCoin",
      "wallet.description": "Vos incitations tokenisées",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "Gagnez grâce à une collaboration sécurisée et dépensez pour des fonctionnalités premium",
      "wallet.section_title": "Portefeuille CollabCoin",
      "wallet.section_description": "Vos incitations tokenisées"
    },
    de: {
      "wallet.title": "CollabCoin Wallet",
      "wallet.description": "Ihre tokenisierten Anreize",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "Verdienen Sie durch sichere Zusammenarbeit und geben Sie für Premium-Funktionen aus",
      "wallet.section_title": "CollabCoin Wallet",
      "wallet.section_description": "Ihre tokenisierten Anreize"
    }
    // Add more languages as needed
  };

  // Get translations for the requested language, fallback to English
  const translations = walletTranslations[language] || walletTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Load wallet translations for all supported languages
 */
export const loadAllWalletTranslations = () => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'ru', 'zh', 'ar', 'he', 'hi', 'bn', 'pt', 'ja'];
  
  // Filter out 'cimode' and other special language codes
  const actualLanguages = supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
  
  console.log('Loading wallet translations for languages:', actualLanguages);
  
  // Add translations for each language
  actualLanguages.forEach(lang => {
    addWalletTranslations(lang);
  });
};
