
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
    },
    ja: {
      "wallet.title": "CollabCoinウォレット",
      "wallet.description": "あなたのトークン化されたインセンティブ",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "安全なコラボレーションを通じて獲得し、プレミアム機能に使用",
      "wallet.section_title": "CollabCoinウォレット",
      "wallet.section_description": "あなたのトークン化されたインセンティブ"
    },
    zh: {
      "wallet.title": "CollabCoin 钱包",
      "wallet.description": "您的代币激励",
      "wallet.coins": "CollabCoin 币",
      "wallet.earn": "通过安全协作赚取并用于高级功能",
      "wallet.section_title": "CollabCoin 钱包",
      "wallet.section_description": "您的代币激励"
    },
    ar: {
      "wallet.title": "محفظة CollabCoin",
      "wallet.description": "حوافزك المؤمنة بالخصوصية",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "اكسب من خلال التعاون الآمن وأنفق على الميزات المتميزة",
      "wallet.section_title": "محفظة CollabCoin",
      "wallet.section_description": "حوافزك المؤمنة بالخصوصية"
    },
    he: {
      "wallet.title": "ארנק CollabCoin",
      "wallet.description": "התמריצים המאובטחים שלך",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "הרוויחו באמצעות שיתוף פעולה מאובטח והשקיעו בתכונות פרימיום",
      "wallet.section_title": "ארנק CollabCoin",
      "wallet.section_description": "התמריצים המאובטחים שלך"
    },
    hi: {
      "wallet.title": "CollabCoin वॉलेट",
      "wallet.description": "आपके गोपनीयता-सुरक्षित प्रोत्साहन",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "सुरक्षित सहयोग के माध्यम से कमाएं और प्रीमियम सुविधाओं पर खर्च करें",
      "wallet.section_title": "CollabCoin वॉलेट",
      "wallet.section_description": "आपके गोपनीयता-सुरक्षित प्रोत्साहन"
    },
    bn: {
      "wallet.title": "CollabCoin ওয়ালেট",
      "wallet.description": "আপনার টোকেনাইজড ইনসেন্টিভ",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "নিরাপদ সহযোগিতার মাধ্যমে উপার্জন করুন এবং প্রিমিয়াম বৈশিষ্ট্যগুলিতে ব্যয় করুন",
      "wallet.section_title": "CollabCoin ওয়ালেট",
      "wallet.section_description": "আপনার টোকেনাইজড ইনসেন্টিভ"
    },
    pt: {
      "wallet.title": "Carteira CollabCoin",
      "wallet.description": "Seus incentivos tokenizados",
      "wallet.coins": "CollabCoins",
      "wallet.earn": "Ganhe através de colaboração segura e gaste em recursos premium",
      "wallet.section_title": "Carteira CollabCoin",
      "wallet.section_description": "Seus incentivos tokenizados"
    }
    // Add more languages as needed
  };

  // Get translations for the requested language, fallback to English
  const translations = walletTranslations[language] || walletTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Adds feature translations for a specific language
 */
export const addFeatureTranslations = (language: string) => {
  // Define feature translations for the specified language
  const featureTranslations: Record<string, Record<string, string>> = {
    en: {
      "features.heading": "Privacy-Focused Infrastructure for Innovation",
      "features.subheading": "Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy.",
      "features.privacy.title": "Privacy-First Architecture",
      "features.privacy.description": "End-to-end encryption secures your data across our platform. Your information remains private, even from us.",
      "features.ai.title": "AI-Powered Collaboration",
      "features.ai.description": "Our integrated AI tools help teams work together more effectively while maintaining complete data privacy.",
      "features.zones.title": "Contribution Zones",
      "features.zones.description": "Create specialized zones for different types of collaboration, from open innovation to highly secured environments.",
      "features.dashboard.title": "Customized Dashboard",
      "features.dashboard.description": "Personalize your workspace to track projects, monitor activity, and manage contributions in one place.",
      "features.simulator.title": "Innovation Simulator",
      "features.simulator.description": "Model potential outcomes and impacts of your projects before committing resources to implementation.",
      "features.blueprint.title": "Blueprint Library",
      "features.blueprint.description": "Access templates for common collaboration scenarios to jumpstart your projects and initiatives."
    },
    fr: {
      "features.heading": "Infrastructure axée sur la confidentialité pour l'innovation",
      "features.subheading": "Notre plateforme combine une technologie de cryptage sécurisée avec des outils de collaboration alimentés par l'IA pour permettre aux innovateurs sans compromettre la confidentialité.",
      "features.privacy.title": "Architecture centrée sur la confidentialité",
      "features.privacy.description": "Le chiffrement de bout en bout sécurise vos données sur notre plateforme. Vos informations restent privées, même pour nous.",
      "features.ai.title": "Collaboration alimentée par l'IA",
      "features.ai.description": "Nos outils d'IA intégrés aident les équipes à travailler ensemble plus efficacement tout en maintenant une confidentialité totale des données.",
      "features.zones.title": "Zones de contribution",
      "features.zones.description": "Créez des zones spécialisées pour différents types de collaboration, de l'innovation ouverte aux environnements hautement sécurisés.",
      "features.dashboard.title": "Tableau de bord personnalisé",
      "features.dashboard.description": "Personnalisez votre espace de travail pour suivre les projets, surveiller l'activité et gérer les contributions en un seul endroit.",
      "features.simulator.title": "Simulateur d'innovation",
      "features.simulator.description": "Modélisez les résultats et les impacts potentiels de vos projets avant d'engager des ressources pour la mise en œuvre.",
      "features.blueprint.title": "Bibliothèque de plans",
      "features.blueprint.description": "Accédez à des modèles pour des scénarios de collaboration courants pour démarrer vos projets et initiatives."
    },
    // Add more languages as needed
  };

  // Get translations for the requested language, fallback to English
  const translations = featureTranslations[language] || featureTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Load wallet translations for all supported languages
 */
export const loadAllWalletTranslations = () => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  
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

/**
 * Load feature translations for all supported languages
 */
export const loadAllFeatureTranslations = () => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  
  // Filter out 'cimode' and other special language codes
  const actualLanguages = supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
  
  console.log('Loading feature translations for languages:', actualLanguages);
  
  // Add translations for each language
  actualLanguages.forEach(lang => {
    addFeatureTranslations(lang);
  });
};

export default {
  addTranslations,
  addWalletTranslations,
  addFeatureTranslations,
  loadAllWalletTranslations,
  loadAllFeatureTranslations
};
