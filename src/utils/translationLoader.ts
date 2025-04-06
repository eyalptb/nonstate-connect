
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
    ru: {
      "features.heading": "Инфраструктура для инноваций, ориентированная на конфиденциальность",
      "features.subheading": "Наша платформа сочетает в себе технологию безопасного шифрования с инструментами для совместной работы на основе искусственного интеллекта, чтобы расширить возможности новаторов без ущерба для конфиденциальности.",
      "features.privacy.title": "Архитектура, ориентированная на конфиденциальность",
      "features.privacy.description": "Сквозное шифрование защищает ваши данные на нашей платформе. Ваша информация остается приватной, даже для нас.",
      "features.ai.title": "Совместная работа с использованием ИИ",
      "features.ai.description": "Наши интегрированные инструменты искусственного интеллекта помогают командам работать вместе более эффективно, сохраняя при этом полную конфиденциальность данных.",
      "features.zones.title": "Зоны вклада",
      "features.zones.description": "Создавайте специализированные зоны для различных типов сотрудничества, от открытых инноваций до высокозащищенных сред.",
      "features.dashboard.title": "Настраиваемая панель управления",
      "features.dashboard.description": "Персонализируйте свое рабочее пространство для отслеживания проектов, мониторинга активности и управления вкладами в одном месте.",
      "features.simulator.title": "Симулятор инноваций",
      "features.simulator.description": "Моделируйте потенциальные результаты и влияние ваших проектов перед выделением ресурсов на реализацию.",
      "features.blueprint.title": "Библиотека чертежей",
      "features.blueprint.description": "Доступ к шаблонам для распространенных сценариев сотрудничества, чтобы ускорить ваши проекты и инициативы."
    },
    de: {
      "features.heading": "Datenschutzfokussierte Infrastruktur für Innovation",
      "features.subheading": "Unsere Plattform kombiniert sichere Verschlüsselungstechnologie mit KI-gestützten Kollaborationstools, um Innovatoren ohne Kompromisse beim Datenschutz zu stärken.",
      "features.privacy.title": "Datenschutz-First-Architektur",
      "features.privacy.description": "Ende-zu-Ende-Verschlüsselung sichert Ihre Daten auf unserer Plattform. Ihre Informationen bleiben privat, selbst für uns.",
      "features.ai.title": "KI-gestützte Zusammenarbeit",
      "features.ai.description": "Unsere integrierten KI-Tools helfen Teams, effektiver zusammenzuarbeiten und dabei die vollständige Datenvertraulichkeit zu wahren.",
      "features.zones.title": "Beitragszonen",
      "features.zones.description": "Erstellen Sie spezialisierte Zonen für verschiedene Arten der Zusammenarbeit, von offener Innovation bis hin zu hochsicheren Umgebungen.",
      "features.dashboard.title": "Angepasstes Dashboard",
      "features.dashboard.description": "Personalisieren Sie Ihren Arbeitsbereich, um Projekte zu verfolgen, Aktivitäten zu überwachen und Beiträge an einem Ort zu verwalten.",
      "features.simulator.title": "Innovationssimulator",
      "features.simulator.description": "Modellieren Sie potenzielle Ergebnisse und Auswirkungen Ihrer Projekte, bevor Sie Ressourcen für die Umsetzung bereitstellen.",
      "features.blueprint.title": "Blueprint-Bibliothek",
      "features.blueprint.description": "Greifen Sie auf Vorlagen für gängige Kooperationsszenarien zu, um Ihre Projekte und Initiativen zu beschleunigen."
    },
    zh: {
      "features.heading": "以隐私为中心的创新基础设施",
      "features.subheading": "我们的平台将安全加密技术与人工智能驱动的协作工具相结合，在不影响隐私的情况下赋能创新者。",
      "features.privacy.title": "隐私优先架构",
      "features.privacy.description": "端到端加密确保您在我们平台上的数据安全。您的信息是私密的，即使对我们也是如此。",
      "features.ai.title": "人工智能驱动的协作",
      "features.ai.description": "我们集成的人工智能工具帮助团队在保持完全数据隐私的同时更有效地协作。",
      "features.zones.title": "贡献区域",
      "features.zones.description": "为不同类型的协作创建专门的区域，从开放式创新到高度安全的环境。",
      "features.dashboard.title": "定制化仪表板",
      "features.dashboard.description": "个性化您的工作空间，在一个地方跟踪项目、监控活动和管理贡献。",
      "features.simulator.title": "创新模拟器",
      "features.simulator.description": "在投入资源实施前，模拟项目的潜在结果和影响。",
      "features.blueprint.title": "蓝图库",
      "features.blueprint.description": "访问常见协作场景的模板，加速启动您的项目和倡议。"
    },
    ja: {
      "features.heading": "プライバシー重視のイノベーション基盤",
      "features.subheading": "当社のプラットフォームは、安全な暗号化技術とAI駆動の協力ツールを組み合わせ、プライバシーを損なうことなくイノベーターをサポートします。",
      "features.privacy.title": "プライバシー優先アーキテクチャ",
      "features.privacy.description": "エンドツーエンドの暗号化によりプラットフォーム全体でデータを保護します。あなたの情報は私たちからも秘密です。",
      "features.ai.title": "AI駆動の協力",
      "features.ai.description": "統合されたAIツールがチームの効果的な協力を支援し、完全なデータプライバシーを維持します。",
      "features.zones.title": "コントリビューションゾーン",
      "features.zones.description": "オープンイノベーションから高度に保護された環境まで、様々な種類の協力のための専門ゾーンを作成します。",
      "features.dashboard.title": "カスタマイズダッシュボード",
      "features.dashboard.description": "作業スペースをパーソナライズし、プロジェクトの追跡、活動のモニタリング、一箇所での貢献管理を行います。",
      "features.simulator.title": "イノベーションシミュレーター",
      "features.simulator.description": "実装にリソースを投入する前に、プロジェクトの潜在的な結果と影響をモデル化します。",
      "features.blueprint.title": "ブループリントライブラリ",
      "features.blueprint.description": "一般的な協力シナリオのテンプレートにアクセスし、プロジェクトや取り組みを迅速に開始します。"
    }
    // Add additional languages as needed
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
