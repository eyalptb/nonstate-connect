
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Fingerprint, Layers, Sparkles, FileCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { addTranslations } from "@/utils/translationLoader";

const Features = () => {
  const { t, i18n } = useTranslation(['common']);

  // Add translations for the feature section heading and description
  useEffect(() => {
    // Define translations for all supported languages
    const featureHeadingTranslations: Record<string, Record<string, string>> = {
      en: {
        "features.heading": "Privacy-Focused Infrastructure for Innovation",
        "features.description": "Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy."
      },
      fr: {
        "features.heading": "Infrastructure axée sur la confidentialité pour l'innovation",
        "features.description": "Notre plateforme combine une technologie de cryptage sécurisée avec des outils de collaboration alimentés par l'IA pour permettre aux innovateurs sans compromettre la confidentialité."
      },
      de: {
        "features.heading": "Datenschutzorientierte Infrastruktur für Innovation",
        "features.description": "Unsere Plattform kombiniert sichere Verschlüsselungstechnologie mit KI-gestützten Kollaborationstools, um Innovatoren zu stärken, ohne den Datenschutz zu gefährden."
      },
      ru: {
        "features.heading": "Инфраструктура для инноваций, ориентированная на конфиденциальность",
        "features.description": "Наша платформа сочетает технологию безопасного шифрования с инструментами совместной работы на базе ИИ, чтобы дать возможность новаторам, не ставя под угрозу конфиденциальность."
      },
      ja: {
        "features.heading": "プライバシー重視のイノベーション基盤",
        "features.description": "当プラットフォームは、安全な暗号化技術とAI搭載のコラボレーションツールを組み合わせ、プライバシーを損なうことなく変革者を支援します。"
      },
      zh: {
        "features.heading": "注重隐私的创新基础设施",
        "features.description": "我们的平台将安全加密技术与人工智能驱动的协作工具相结合，在不影响隐私的情况下赋能变革者。"
      },
      ar: {
        "features.heading": "بنية تحتية تركز على الخصوصية للابتكار",
        "features.description": "تجمع منصتنا بين تقنية التشفير الآمنة وأدوات التعاون المدعومة بالذكاء الاصطناعي لتمكين صناع التغيير دون المساس بالخصوصية."
      },
      he: {
        "features.heading": "תשתית ממוקדת פרטיות לחדשנות",
        "features.description": "הפלטפורמה שלנו משלבת טכנולוגיית הצפנה מאובטחת עם כלי שיתוף פעולה מבוססי בינה מלאכותית כדי להעצים יוצרי שינוי מבלי לפגוע בפרטיות."
      },
      hi: {
        "features.heading": "नवाचार के लिए गोपनीयता-केंद्रित इंफ्रास्ट्रक्चर",
        "features.description": "हमारा प्लेटफॉर्म सुरक्षित एन्क्रिप्शन तकनीक को AI-संचालित सहयोग उपकरणों के साथ जोड़ता है ताकि गोपनीयता से समझौता किए बिना परिवर्तनकर्ताओं को सशक्त बनाया जा सके।"
      },
      bn: {
        "features.heading": "উদ্ভাবনের জন্য গোপনীয়তা-কেন্দ্রিক অবকাঠামো",
        "features.description": "আমাদের প্ল্যাটফর্ম নিরাপদ এনক্রিপশন প্রযুক্তি এবং AI-চালিত সহযোগিতা সরঞ্জামগুলিকে একত্রিত করে যাতে গোপনীয়তা বিনা আপস না করে পরিবর্তনকারীদের ক্ষমতায়ন করা যায়।"
      },
      pt: {
        "features.heading": "Infraestrutura Focada em Privacidade para Inovação",
        "features.description": "Nossa plataforma combina tecnologia de criptografia segura com ferramentas de colaboração potenciadas por IA para capacitar agentes de mudança sem comprometer a privacidade."
      }
    };

    // Get current language or fallback to English
    const currentLang = i18n.language || 'en';
    
    // Get translations for current language or fallback to English
    const translations = featureHeadingTranslations[currentLang] || featureHeadingTranslations.en;
    
    // Add translations to i18n instance
    addTranslations(currentLang, 'common', translations);
  }, [i18n.language]);

  // Define features with translation keys
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "End-to-End Privacy",
      description: "Complete encryption ensures your sensitive data remains private throughout the collaboration process."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "AI Collaboration Agents",
      description: "AI assistants that enhance your team's work without access to sensitive content."
    },
    {
      icon: <Layers className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Contribution Zones",
      description: "Compartmentalized project spaces that keep sensitive data separate while enabling seamless collaboration."
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Privacy Dashboard",
      description: "Complete transparency and control over your data and who can access it."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Impact Simulator",
      description: "Predict the outcomes of your projects, from environmental impact to social change."
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Evolving Blueprints",
      description: "Scale and adapt successful project templates while maintaining security and privacy."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50" key={`features-${i18n.language}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("features.heading", "Privacy-Focused Infrastructure for Innovation")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("features.description", "Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={`${index}-${i18n.language}`} className="border bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
