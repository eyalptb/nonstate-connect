
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Fingerprint, Layers, Sparkles, FileCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";
import { addTranslations } from "@/utils/translationLoader";

const Features = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = React.useState(false);

  // Load feature translations when component mounts or language changes
  React.useEffect(() => {
    // Add feature translations for all languages
    loadFeaturesTranslations();
    setTranslationsLoaded(true);
  }, [i18n.language]);

  // Define features with translation keys
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.privacy.title",
      descriptionKey: "features.privacy.description"
    },
    {
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.ai.title",
      descriptionKey: "features.ai.description"
    },
    {
      icon: <Layers className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.zones.title",
      descriptionKey: "features.zones.description"
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.dashboard.title",
      descriptionKey: "features.dashboard.description"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.simulator.title",
      descriptionKey: "features.simulator.description"
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      titleKey: "features.blueprints.title",
      descriptionKey: "features.blueprints.description"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50" key={`features-section-${i18n.language}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("features.heading", "Privacy-Focused Infrastructure for Innovation")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("features.subheading", "Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={`feature-${index}-${i18n.language}`} className="border bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">
                  {t(feature.titleKey, feature.titleKey.split('.').pop())}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70 text-base">
                  {t(feature.descriptionKey, feature.descriptionKey.split('.').pop())}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Function to dynamically add feature translations
const loadFeaturesTranslations = () => {
  // We'll add translations for each supported language
  const languages = ['en', 'de', 'fr', 'he', 'ar', 'ru', 'ja', 'zh', 'pt', 'bn', 'hi'];
  
  // Translations for different languages
  const translations = {
    en: {
      // English translations are already in the files
    },
    de: {
      "features.heading": "Datenschutzorientierte Infrastruktur für Innovation",
      "features.subheading": "Unsere Plattform kombiniert sichere Verschlüsselungstechnologie mit KI-gestützten Kollaborationswerkzeugen, um Innovatoren zu stärken, ohne die Privatsphäre zu gefährden."
    },
    fr: {
      "features.heading": "Infrastructure de confidentialité pour l'innovation",
      "features.subheading": "Notre plateforme combine une technologie de chiffrement sécurisée avec des outils de collaboration alimentés par l'IA pour autonomiser les acteurs du changement sans compromettre la confidentialité."
    },
    he: {
      "features.heading": "תשתית ממוקדת פרטיות לחדשנות",
      "features.subheading": "הפלטפורמה שלנו משלבת טכנולוגיית הצפנה מאובטחת עם כלי שיתוף פעולה מבוססי בינה מלאכותית כדי להעצים יוצרי שינוי מבלי לפגוע בפרטיות."
    },
    ar: {
      "features.heading": "بنية تحتية تركز على الخصوصية للابتكار",
      "features.subheading": "تجمع منصتنا بين تقنية التشفير الآمنة وأدوات التعاون المدعومة بالذكاء الاصطناعي لتمكين المبتكرين دون المساس بالخصوصية."
    },
    ru: {
      "features.heading": "Инфраструктура для инноваций, ориентированная на конфиденциальность",
      "features.subheading": "Наша платформа сочетает в себе безопасную технологию шифрования с инструментами совместной работы на базе ИИ, чтобы расширить возможности новаторов без ущерба для конфиденциальности."
    },
    ja: {
      "features.heading": "プライバシー重視のイノベーションインフラ",
      "features.subheading": "私たちのプラットフォームは、プライバシーを損なうことなく変革者に力を与えるために、安全な暗号化技術とAI駆動の共同作業ツールを組み合わせています。"
    },
    zh: {
      "features.heading": "以隐私为中心的创新基础设施",
      "features.subheading": "我们的平台结合了安全的加密技术和人工智能驱动的协作工具，在不影响隐私的情况下赋能变革者。"
    },
    pt: {
      "features.heading": "Infraestrutura Focada em Privacidade para Inovação",
      "features.subheading": "Nossa plataforma combina tecnologia de criptografia segura com ferramentas de colaboração baseadas em IA para capacitar inovadores sem comprometer a privacidade."
    },
    bn: {
      "features.heading": "উদ্ভাবনের জন্য গোপনীয়তা-কেন্দ্রিক অবকাঠামো",
      "features.subheading": "আমাদের প্ল্যাটফর্ম নিরাপদ এনক্রিপশন প্রযুক্তি এবং AI-চালিত সহযোগিতা সরঞ্জামগুলিকে একত্রিত করে যাতে গোপনীয়তার সাথে আপস না করে পরিবর্তনকারীদের ক্ষমতায়ন করা যায়।"
    },
    hi: {
      "features.heading": "नवाचार के लिए गोपनीयता-केंद्रित बुनियादी ढांचा",
      "features.subheading": "हमारा प्लेटफॉर्म सुरक्षित एन्क्रिप्शन तकनीक को AI-संचालित सहयोग उपकरणों के साथ जोड़ता है ताकि गोपनीयता से समझौता किए बिना परिवर्तनकर्ताओं को सशक्त बनाया जा सके।"
    }
  };

  // Add translations for each language
  languages.forEach(language => {
    if (translations[language]) {
      addTranslations(language, 'common', translations[language]);
    }
  });
};

export default Features;
