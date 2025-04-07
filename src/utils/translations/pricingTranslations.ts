
// English translations
const en = {
  pricing: {
    title: "Simple, Transparent Pricing",
    description: "Choose the plan that's right for your organization",
    tabMonthly: "Monthly",
    tabAnnually: "Annually (Save 20%)",
    plans: {
      starter: {
        title: "Starter",
        price: "$29",
        priceAnnual: "$23",
        description: "For small teams and projects",
        annualBilling: "Billed annually ($276)"
      },
      professional: {
        title: "Professional",
        price: "$99",
        priceAnnual: "$79",
        description: "For growing organizations",
        annualBilling: "Billed annually ($948)",
        popular: "Most Popular"
      },
      enterprise: {
        title: "Enterprise",
        price: "Custom",
        description: "For large organizations with custom needs"
      }
    },
    features: {
      starter: ["Up to 5 team members", "10 GB secure storage", "Basic encryption", "Community access", "Email support"],
      professional: ["Up to 20 team members", "50 GB secure storage", "Advanced encryption", "Governance features", "Verification tools", "Priority support", "API access"],
      enterprise: ["Unlimited team members", "Custom storage limits", "Advanced security features", "Custom integrations", "On-premise deployment options", "24/7 dedicated support", "Compliance assistance"]
    },
    cta: {
      getStarted: "Get Started",
      contactSales: "Contact Sales"
    },
    faq: {
      title: "Frequently Asked Questions",
      description: "Got questions? We've got answers.",
      questions: [
        {
          question: "Can I switch plans later?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, all paid plans include a 14-day free trial so you can test the features before committing."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. We use end-to-end encryption and follow industry best practices for data security and privacy."
        }
      ]
    }
  }
};

// German translations
const de = {
  pricing: {
    title: "Einfache, transparente Preisgestaltung",
    description: "Wählen Sie den Plan, der für Ihre Organisation richtig ist",
    tabMonthly: "Monatlich",
    tabAnnually: "Jährlich (20% sparen)",
    plans: {
      starter: {
        title: "Starter",
        price: "29 €",
        priceAnnual: "23 €",
        description: "Für kleine Teams und Projekte",
        annualBilling: "Jährlich abgerechnet (276 €)"
      },
      professional: {
        title: "Professional",
        price: "99 €",
        priceAnnual: "79 €",
        description: "Für wachsende Organisationen",
        annualBilling: "Jährlich abgerechnet (948 €)",
        popular: "Am beliebtesten"
      },
      enterprise: {
        title: "Enterprise",
        price: "Individuell",
        description: "Für große Organisationen mit individuellen Anforderungen"
      }
    },
    features: {
      starter: ["Bis zu 5 Teammitglieder", "10 GB sicherer Speicher", "Grundlegende Verschlüsselung", "Community-Zugang", "E-Mail-Support"],
      professional: ["Bis zu 20 Teammitglieder", "50 GB sicherer Speicher", "Erweiterte Verschlüsselung", "Governance-Funktionen", "Verifizierungstools", "Prioritäts-Support", "API-Zugang"],
      enterprise: ["Unbegrenzte Teammitglieder", "Individuelle Speicherlimits", "Erweiterte Sicherheitsfunktionen", "Individuelle Integrationen", "On-Premise-Bereitstellungsoptionen", "24/7-Support", "Compliance-Unterstützung"]
    },
    cta: {
      getStarted: "Jetzt starten",
      contactSales: "Vertrieb kontaktieren"
    },
    faq: {
      title: "Häufig gestellte Fragen",
      description: "Fragen? Wir haben Antworten.",
      questions: [
        {
          question: "Kann ich später den Plan wechseln?",
          answer: "Ja, Sie können Ihren Plan jederzeit upgraden oder downgraden. Änderungen werden zu Beginn Ihres nächsten Abrechnungszeitraums wirksam."
        },
        {
          question: "Gibt es eine kostenlose Testversion?",
          answer: "Ja, alle kostenpflichtigen Pläne beinhalten eine 14-tägige kostenlose Testversion, damit Sie die Funktionen vor dem Kauf testen können."
        },
        {
          question: "Welche Zahlungsmethoden akzeptieren Sie?",
          answer: "Wir akzeptieren alle gängigen Kreditkarten, PayPal und Banküberweisungen für Jahrespläne."
        },
        {
          question: "Sind meine Daten sicher?",
          answer: "Auf jeden Fall. Wir verwenden Ende-zu-Ende-Verschlüsselung und folgen den Best Practices der Branche für Datensicherheit und Datenschutz."
        }
      ]
    }
  }
};

// French translations
const fr = {
  pricing: {
    title: "Tarification simple et transparente",
    description: "Choisissez le forfait adapté à votre organisation",
    tabMonthly: "Mensuel",
    tabAnnually: "Annuel (Économisez 20%)",
    plans: {
      starter: {
        title: "Débutant",
        price: "29 €",
        priceAnnual: "23 €",
        description: "Pour les petites équipes et projets",
        annualBilling: "Facturé annuellement (276 €)"
      },
      professional: {
        title: "Professionnel",
        price: "99 €",
        priceAnnual: "79 €",
        description: "Pour les organisations en croissance",
        annualBilling: "Facturé annuellement (948 €)",
        popular: "Le plus populaire"
      },
      enterprise: {
        title: "Entreprise",
        price: "Personnalisé",
        description: "Pour les grandes organisations avec des besoins personnalisés"
      }
    },
    features: {
      starter: ["Jusqu'à 5 membres d'équipe", "10 Go de stockage sécurisé", "Chiffrement de base", "Accès à la communauté", "Support par e-mail"],
      professional: ["Jusqu'à 20 membres d'équipe", "50 Go de stockage sécurisé", "Chiffrement avancé", "Fonctionnalités de gouvernance", "Outils de vérification", "Support prioritaire", "Accès API"],
      enterprise: ["Membres d'équipe illimités", "Limites de stockage personnalisées", "Fonctionnalités de sécurité avancées", "Intégrations personnalisées", "Options de déploiement sur site", "Support dédié 24/7", "Assistance à la conformité"]
    },
    cta: {
      getStarted: "Commencer",
      contactSales: "Contacter les ventes"
    },
    faq: {
      title: "Questions fréquemment posées",
      description: "Des questions ? Nous avons des réponses.",
      questions: [
        {
          question: "Puis-je changer de forfait plus tard ?",
          answer: "Oui, vous pouvez passer à un forfait supérieur ou inférieur à tout moment. Les modifications prendront effet au début de votre prochain cycle de facturation."
        },
        {
          question: "Y a-t-il un essai gratuit disponible ?",
          answer: "Oui, tous les forfaits payants comprennent un essai gratuit de 14 jours pour que vous puissiez tester les fonctionnalités avant de vous engager."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons toutes les principales cartes de crédit, PayPal et les virements bancaires pour les forfaits annuels."
        },
        {
          question: "Mes données sont-elles sécurisées ?",
          answer: "Absolument. Nous utilisons le chiffrement de bout en bout et suivons les meilleures pratiques de l'industrie pour la sécurité et la confidentialité des données."
        }
      ]
    }
  }
};

// Spanish translations
const es = {
  pricing: {
    title: "Precios simples y transparentes",
    description: "Elija el plan adecuado para su organización",
    tabMonthly: "Mensual",
    tabAnnually: "Anual (Ahorre 20%)",
    plans: {
      starter: {
        title: "Inicial",
        price: "29 €",
        priceAnnual: "23 €",
        description: "Para equipos y proyectos pequeños",
        annualBilling: "Facturado anualmente (276 €)"
      },
      professional: {
        title: "Profesional",
        price: "99 €",
        priceAnnual: "79 €",
        description: "Para organizaciones en crecimiento",
        annualBilling: "Facturado anualmente (948 €)",
        popular: "Más popular"
      },
      enterprise: {
        title: "Empresarial",
        price: "Personalizado",
        description: "Para grandes organizaciones con necesidades personalizadas"
      }
    },
    features: {
      starter: ["Hasta 5 miembros del equipo", "10 GB de almacenamiento seguro", "Cifrado básico", "Acceso a la comunidad", "Soporte por correo electrónico"],
      professional: ["Hasta 20 miembros del equipo", "50 GB de almacenamiento seguro", "Cifrado avanzado", "Funciones de gobernanza", "Herramientas de verificación", "Soporte prioritario", "Acceso a API"],
      enterprise: ["Miembros del equipo ilimitados", "Límites de almacenamiento personalizados", "Funciones de seguridad avanzadas", "Integraciones personalizadas", "Opciones de implementación local", "Soporte dedicado 24/7", "Asistencia de cumplimiento"]
    },
    cta: {
      getStarted: "Comenzar",
      contactSales: "Contactar con ventas"
    },
    faq: {
      title: "Preguntas frecuentes",
      description: "¿Tienes preguntas? Tenemos respuestas.",
      questions: [
        {
          question: "¿Puedo cambiar de plan más adelante?",
          answer: "Sí, puede actualizar o reducir su plan en cualquier momento. Los cambios entrarán en vigor al comienzo de su próximo ciclo de facturación."
        },
        {
          question: "¿Hay una prueba gratuita disponible?",
          answer: "Sí, todos los planes de pago incluyen una prueba gratuita de 14 días para que pueda probar las funciones antes de comprometerse."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos todas las principales tarjetas de crédito, PayPal y transferencias bancarias para planes anuales."
        },
        {
          question: "¿Están seguros mis datos?",
          answer: "Absolutamente. Utilizamos cifrado de extremo a extremo y seguimos las mejores prácticas de la industria para la seguridad y privacidad de los datos."
        }
      ]
    }
  }
};

// Arabic translations
const ar = {
  pricing: {
    title: "تسعير بسيط وشفاف",
    description: "اختر الخطة المناسبة لمؤسستك",
    tabMonthly: "شهري",
    tabAnnually: "سنوي (وفر 20٪)",
    plans: {
      starter: {
        title: "مبتدئ",
        price: "29 دولار",
        priceAnnual: "23 دولار",
        description: "للفرق والمشاريع الصغيرة",
        annualBilling: "فواتير سنوية (276 دولار)"
      },
      professional: {
        title: "محترف",
        price: "99 دولار",
        priceAnnual: "79 دولار",
        description: "للمؤسسات النامية",
        annualBilling: "فواتير سنوية (948 دولار)",
        popular: "الأكثر شعبية"
      },
      enterprise: {
        title: "مؤسسة",
        price: "مخصص",
        description: "للمؤسسات الكبيرة ذات الاحتياجات المخصصة"
      }
    },
    features: {
      starter: ["حتى 5 أعضاء في الفريق", "10 جيجابايت تخزين آمن", "تشفير أساسي", "وصول المجتمع", "دعم البريد الإلكتروني"],
      professional: ["حتى 20 عضوًا في الفريق", "50 جيجابايت تخزين آمن", "تشفير متقدم", "ميزات الحوكمة", "أدوات التحقق", "دعم ذو أولوية", "وصول API"],
      enterprise: ["أعضاء فريق غير محدودين", "حدود تخزين مخصصة", "ميزات أمان متقدمة", "تكاملات مخصصة", "خيارات نشر محلية", "دعم مخصص على مدار الساعة", "مساعدة في الامتثال"]
    },
    cta: {
      getStarted: "ابدأ الآن",
      contactSales: "اتصل بالمبيعات"
    },
    faq: {
      title: "الأسئلة المتداولة",
      description: "لديك أسئلة؟ لدينا إجابات.",
      questions: [
        {
          question: "هل يمكنني تبديل الخطط لاحقًا؟",
          answer: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. ستسري التغييرات في بداية دورة الفوترة التالية."
        },
        {
          question: "هل تتوفر نسخة تجريبية مجانية؟",
          answer: "نعم، تتضمن جميع الخطط المدفوعة نسخة تجريبية مجانية لمدة 14 يومًا حتى تتمكن من اختبار الميزات قبل الالتزام."
        },
        {
          question: "ما هي طرق الدفع التي تقبلونها؟",
          answer: "نقبل جميع بطاقات الائتمان الرئيسية، و PayPal، والتحويلات المصرفية للخطط السنوية."
        },
        {
          question: "هل بياناتي آمنة؟",
          answer: "بالتأكيد. نستخدم التشفير من طرف إلى طرف ونتبع أفضل ممارسات الصناعة لأمان وخصوصية البيانات."
        }
      ]
    }
  }
};

// Bengali translations
const bn = {
  pricing: {
    title: "সহজ, স্বচ্ছ মূল্য নির্ধারণ",
    description: "আপনার সংস্থার জন্য সঠিক প্ল্যান বেছে নিন",
    tabMonthly: "মাসিক",
    tabAnnually: "বার্ষিক (20% সাশ্রয় করুন)",
    plans: {
      starter: {
        title: "শুরুকারী",
        price: "৩৯ টাকা",
        priceAnnual: "২৩ টাকা",
        description: "ছোট দল এবং প্রকল্পের জন্য",
        annualBilling: "বার্ষিক বিলিং (২৭৬ টাকা)"
      },
      professional: {
        title: "পেশাদার",
        price: "৯৯ টাকা",
        priceAnnual: "৭৯ টাকা",
        description: "বর্ধমান সংস্থাগুলির জন্য",
        annualBilling: "বার্ষিক বিলিং (৯৪৮ টাকা)",
        popular: "সবচেয়ে জনপ্রিয়"
      },
      enterprise: {
        title: "এন্টারপ্রাইজ",
        price: "কাস্টম",
        description: "বড় সংস্থাগুলির জন্য কাস্টম প্রয়োজনীয়তা সহ"
      }
    },
    features: {
      starter: ["৫ জন পর্যন্ত দলের সদস্য", "১০ জিবি সুরক্ষিত স্টোরেজ", "মৌলিক এনক্রিপশন", "কমিউনিটি অ্যাক্সেস", "ইমেল সাপোর্ট"],
      professional: ["২০ জন পর্যন্ত দলের সদস্য", "৫০ জিবি সুরক্ষিত স্টোরেজ", "উন্নত এনক্রিপশন", "গভর্নেন্স ফিচার", "যাচাইকরণ টুল", "অগ্রাধিকার সাপোর্ট", "এপিআই অ্যাক্সেস"],
      enterprise: ["অসীমিত দলের সদস্য", "কাস্টম স্টোরেজ সীমা", "উন্নত সুরক্ষা বৈশিষ্ট্য", "কাস্টম ইন্টিগ্রেশন", "অন-প্রিমাইস ডেপ্লয়মেন্ট অপশন", "২৪/৭ ডেডিকেটেড সাপোর্ট", "কমপ্লায়েন্স সহায়তা"]
    },
    cta: {
      getStarted: "শুরু করুন",
      contactSales: "বিক্রয় যোগাযোগ করুন"
    },
    faq: {
      title: "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",
      description: "প্রশ্ন আছে? আমাদের উত্তর আছে।",
      questions: [
        {
          question: "আমি কি পরে প্ল্যান পরিবর্তন করতে পারি?",
          answer: "হ্যাঁ, আপনি যেকোনো সময় আপনার প্ল্যান আপগ্রেড বা ডাউনগ্রেড করতে পারেন। পরিবর্তনগুলি আপনার পরবর্তী বিলিং চক্রের শুরুতে কার্যকর হবে।"
        },
        {
          question: "কি বিনামূল্যে ট্রায়াল উপলব্ধ আছে?",
          answer: "হ্যাঁ, সমস্ত পেইড প্ল্যানে ১৪ দিনের বিনামূল্যে ট্রায়াল অন্তর্ভুক্ত রয়েছে যাতে আপনি প্রতিশ্রুতিবদ্ধ হওয়ার আগে বৈশিষ্ট্যগুলি পরীক্ষা করতে পারেন।"
        },
        {
          question: "আপনি কি কি পেমেন্ট পদ্ধতি গ্রহণ করেন?",
          answer: "আমরা সমস্ত প্রধান ক্রেডিট কার্ড, পেপাল এবং বার্ষিক প্ল্যানের জন্য ব্যাংক ট্রান্সফার গ্রহণ করি।"
        },
        {
          question: "আমার ডেটা কি সুরক্ষিত?",
          answer: "একদম। আমরা এন্ড-টু-এন্ড এনক্রিপশন ব্যবহার করি এবং ডেটা সুরক্ষা ও গোপনীয়তার জন্য শিল্পের সেরা অনুশীলন অনুসরণ করি।"
        }
      ]
    }
  }
};

// Hebrew translations
const he = {
  pricing: {
    title: "תמחור פשוט ושקוף",
    description: "בחר את התוכנית המתאימה לארגון שלך",
    tabMonthly: "חודשי",
    tabAnnually: "שנתי (חיסכון של 20%)",
    plans: {
      starter: {
        title: "מתחילים",
        price: "29 ₪",
        priceAnnual: "23 ₪",
        description: "לצוותים ופרויקטים קטנים",
        annualBilling: "חיוב שנתי (276 ₪)"
      },
      professional: {
        title: "מקצועי",
        price: "99 ₪",
        priceAnnual: "79 ₪",
        description: "לארגונים צומחים",
        annualBilling: "חיוב שנתי (948 ₪)",
        popular: "הפופולרי ביותר"
      },
      enterprise: {
        title: "ארגוני",
        price: "מותאם אישית",
        description: "לארגונים גדולים עם צרכים מותאמים אישית"
      }
    },
    features: {
      starter: ["עד 5 חברי צוות", "10 GB אחסון מאובטח", "הצפנה בסיסית", "גישה לקהילה", "תמיכה בדוא\"ל"],
      professional: ["עד 20 חברי צוות", "50 GB אחסון מאובטח", "הצפנה מתקדמת", "תכונות ממשל", "כלי אימות", "תמיכה בעדיפות", "גישה ל-API"],
      enterprise: ["חברי צוות ללא הגבלה", "מגבלות אחסון מותאמות אישית", "תכונות אבטחה מתקדמות", "אינטגרציות מותאמות אישית", "אפשרויות פריסה באתר", "תמיכה ייעודית 24/7", "סיוע בהתאמה לתקנות"]
    },
    cta: {
      getStarted: "התחל עכשיו",
      contactSales: "צור קשר עם המכירות"
    },
    faq: {
      title: "שאלות נפוצות",
      description: "יש לך שאלות? יש לנו תשובות.",
      questions: [
        {
          question: "האם אוכל להחליף תוכניות מאוחר יותר?",
          answer: "כן, תוכל לשדרג או להוריד את התוכנית שלך בכל עת. השינויים ייכנסו לתוקף בתחילת מחזור החיוב הבא שלך."
        },
        {
          question: "האם יש ניסיון חינם?",
          answer: "כן, כל התוכניות בתשלום כוללות ניסיון חינם ל-14 יום כדי שתוכל לבדוק את התכונות לפני ההתחייבות."
        },
        {
          question: "אילו אמצעי תשלום אתם מקבלים?",
          answer: "אנו מקבלים את כל כרטיסי האשראי העיקריים, PayPal והעברות בנקאיות עבור תוכניות שנתיות."
        },
        {
          question: "האם הנתונים שלי מאובטחים?",
          answer: "בהחלט. אנו משתמשים בהצפנה מקצה לקצה ופועלים לפי הנהלים המיטביים בתעשייה לאבטחת נתונים ופרטיות."
        }
      ]
    }
  }
};

// Japanese translations
const ja = {
  pricing: {
    title: "シンプルで透明な料金設定",
    description: "組織に最適なプランを選択してください",
    tabMonthly: "月額",
    tabAnnually: "年額（20％割引）",
    plans: {
      starter: {
        title: "スターター",
        price: "3,900円",
        priceAnnual: "3,100円",
        description: "小規模チームやプロジェクト向け",
        annualBilling: "年間請求（37,200円）"
      },
      professional: {
        title: "プロフェッショナル",
        price: "12,900円",
        priceAnnual: "10,300円",
        description: "成長中の組織向け",
        annualBilling: "年間請求（123,600円）",
        popular: "最も人気"
      },
      enterprise: {
        title: "エンタープライズ",
        price: "カスタム",
        description: "カスタムニーズを持つ大規模組織向け"
      }
    },
    features: {
      starter: ["チームメンバー最大5名", "10GBの安全なストレージ", "基本的な暗号化", "コミュニティアクセス", "メールサポート"],
      professional: ["チームメンバー最大20名", "50GBの安全なストレージ", "高度な暗号化", "ガバナンス機能", "検証ツール", "優先サポート", "APIアクセス"],
      enterprise: ["無制限のチームメンバー", "カスタムストレージ制限", "高度なセキュリティ機能", "カスタム統合", "オンプレミス展開オプション", "24/7専用サポート", "コンプライアンス支援"]
    },
    cta: {
      getStarted: "始める",
      contactSales: "営業に問い合わせる"
    },
    faq: {
      title: "よくある質問",
      description: "質問がありますか？私たちには答えがあります。",
      questions: [
        {
          question: "後でプランを切り替えることはできますか？",
          answer: "はい、いつでもプランをアップグレードまたはダウングレードできます。変更は次の請求サイクルの開始時に有効になります。"
        },
        {
          question: "無料トライアルはありますか？",
          answer: "はい、すべての有料プランには14日間の無料トライアルが含まれており、コミットする前に機能をテストできます。"
        },
        {
          question: "どの支払い方法を受け付けていますか？",
          answer: "主要なクレジットカード、PayPal、および年間プランの銀行振込をすべて受け付けています。"
        },
        {
          question: "私のデータは安全ですか？",
          answer: "もちろんです。エンドツーエンドの暗号化を使用し、データセキュリティとプライバシーに関する業界のベストプラクティスに従っています。"
        }
      ]
    }
  }
};

// Hindi translations
const hi = {
  pricing: {
    title: "सरल, पारदर्शी मूल्य निर्धारण",
    description: "अपने संगठन के लिए सही योजना चुनें",
    tabMonthly: "मासिक",
    tabAnnually: "वार्षिक (20% बचाएं)",
    plans: {
      starter: {
        title: "स्टार्टर",
        price: "₹2,100",
        priceAnnual: "₹1,680",
        description: "छोटी टीमों और परियोजनाओं के लिए",
        annualBilling: "वार्षिक बिलिंग (₹20,160)"
      },
      professional: {
        title: "प्रोफेशनल",
        price: "₹7,300",
        priceAnnual: "₹5,840",
        description: "बढ़ते संगठनों के लिए",
        annualBilling: "वार्षिक बिलिंग (₹70,080)",
        popular: "सबसे लोकप्रिय"
      },
      enterprise: {
        title: "एंटरप्राइज",
        price: "कस्टम",
        description: "विशेष आवश्यकताओं वाले बड़े संगठनों के लिए"
      }
    },
    features: {
      starter: ["5 टीम सदस्यों तक", "10 GB सुरक्षित स्टोरेज", "बेसिक एन्क्रिप्शन", "कम्युनिटी एक्सेस", "ईमेल सपोर्ट"],
      professional: ["20 टीम सदस्यों तक", "50 GB सुरक्षित स्टोरेज", "उन्नत एन्क्रिप्शन", "गवर्नेंस फीचर्स", "वेरिफिकेशन टूल्स", "प्राथमिकता सपोर्ट", "API एक्सेस"],
      enterprise: ["असीमित टीम सदस्य", "कस्टम स्टोरेज सीमाएं", "उन्नत सुरक्षा विशेषताएं", "कस्टम इंटीग्रेशन", "ऑन-प्रिमाइस डिप्लॉयमेंट विकल्प", "24/7 समर्पित सपोर्ट", "अनुपालन सहायता"]
    },
    cta: {
      getStarted: "शुरू करें",
      contactSales: "सेल्स से संपर्क करें"
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      description: "सवाल हैं? हमारे पास जवाब हैं।",
      questions: [
        {
          question: "क्या मैं बाद में प्लान बदल सकता हूं?",
          answer: "हां, आप किसी भी समय अपने प्लान को अपग्रेड या डाउनग्रेड कर सकते हैं। परिवर्तन आपके अगले बिलिंग चक्र की शुरुआत में प्रभावी होंगे।"
        },
        {
          question: "क्या कोई फ्री ट्रायल उपलब्ध है?",
          answer: "हां, सभी पेड प्लान्स में 14-दिन का फ्री ट्रायल शामिल है ताकि आप प्रतिबद्ध होने से पहले फीचर्स का परीक्षण कर सकें।"
        },
        {
          question: "आप किन भुगतान विधियों को स्वीकार करते हैं?",
          answer: "हम सभी प्रमुख क्रेडिट कार्ड, PayPal, और वार्षिक योजनाओं के लिए बैंक ट्रांसफर स्वीकार करते हैं।"
        },
        {
          question: "क्या मेरा डेटा सुरक्षित है?",
          answer: "बिल्कुल। हम एंड-टू-एंड एन्क्रिप्शन का उपयोग करते हैं और डेटा सुरक्षा और गोपनीयता के लिए उद्योग के सर्वोत्तम प्रथाओं का पालन करते हैं।"
        }
      ]
    }
  }
};

// Portuguese translations
const pt = {
  pricing: {
    title: "Preços simples e transparentes",
    description: "Escolha o plano certo para sua organização",
    tabMonthly: "Mensal",
    tabAnnually: "Anual (Economize 20%)",
    plans: {
      starter: {
        title: "Iniciante",
        price: "R$149",
        priceAnnual: "R$119",
        description: "Para pequenas equipes e projetos",
        annualBilling: "Cobrança anual (R$1.428)"
      },
      professional: {
        title: "Profissional",
        price: "R$499",
        priceAnnual: "R$399",
        description: "Para organizações em crescimento",
        annualBilling: "Cobrança anual (R$4.788)",
        popular: "Mais Popular"
      },
      enterprise: {
        title: "Empresarial",
        price: "Personalizado",
        description: "Para grandes organizações com necessidades personalizadas"
      }
    },
    features: {
      starter: ["Até 5 membros da equipe", "10 GB de armazenamento seguro", "Criptografia básica", "Acesso à comunidade", "Suporte por e-mail"],
      professional: ["Até 20 membros da equipe", "50 GB de armazenamento seguro", "Criptografia avançada", "Recursos de governança", "Ferramentas de verificação", "Suporte prioritário", "Acesso à API"],
      enterprise: ["Membros da equipe ilimitados", "Limites de armazenamento personalizados", "Recursos de segurança avançados", "Integrações personalizadas", "Opções de implantação local", "Suporte dedicado 24/7", "Assistência de conformidade"]
    },
    cta: {
      getStarted: "Começar",
      contactSales: "Contatar Vendas"
    },
    faq: {
      title: "Perguntas Frequentes",
      description: "Tem perguntas? Nós temos respostas.",
      questions: [
        {
          question: "Posso mudar de plano mais tarde?",
          answer: "Sim, você pode atualizar ou reduzir seu plano a qualquer momento. As alterações entrarão em vigor no início do seu próximo ciclo de faturamento."
        },
        {
          question: "Há um período de teste gratuito disponível?",
          answer: "Sim, todos os planos pagos incluem um teste gratuito de 14 dias para que você possa testar os recursos antes de se comprometer."
        },
        {
          question: "Quais métodos de pagamento vocês aceitam?",
          answer: "Aceitamos todos os principais cartões de crédito, PayPal e transferências bancárias para planos anuais."
        },
        {
          question: "Meus dados estão seguros?",
          answer: "Absolutamente. Usamos criptografia de ponta a ponta e seguimos as melhores práticas do setor para segurança e privacidade de dados."
        }
      ]
    }
  }
};

// Russian translations
const ru = {
  pricing: {
    title: "Простое и прозрачное ценообразование",
    description: "Выберите план, который подходит для вашей организации",
    tabMonthly: "Ежемесячно",
    tabAnnually: "Ежегодно (Экономия 20%)",
    plans: {
      starter: {
        title: "Начальный",
        price: "2 100 ₽",
        priceAnnual: "1 680 ₽",
        description: "Для небольших команд и проектов",
        annualBilling: "Ежегодный платеж (20 160 ₽)"
      },
      professional: {
        title: "Профессиональный",
        price: "7 400 ₽",
        priceAnnual: "5 920 ₽",
        description: "Для растущих организаций",
        annualBilling: "Ежегодный платеж (71 040 ₽)",
        popular: "Самый популярный"
      },
      enterprise: {
        title: "Корпоративный",
        price: "Индивидуально",
        description: "Для крупных организаций с индивидуальными потребностями"
      }
    },
    features: {
      starter: ["До 5 членов команды", "10 ГБ безопасного хранилища", "Базовое шифрование", "Доступ к сообществу", "Поддержка по электронной почте"],
      professional: ["До 20 членов команды", "50 ГБ безопасного хранилища", "Расширенное шифрование", "Функции управления", "Инструменты проверки", "Приоритетная поддержка", "Доступ к API"],
      enterprise: ["Неограниченное количество членов команды", "Индивидуальные лимиты хранилища", "Расширенные функции безопасности", "Индивидуальные интеграции", "Варианты локального развертывания", "Выделенная поддержка 24/7", "Помощь в соблюдении нормативных требований"]
    },
    cta: {
      getStarted: "Начать",
      contactSales: "Связаться с отделом продаж"
    },
    faq: {
      title: "Часто задаваемые вопросы",
      description: "Есть вопросы? У нас есть ответы.",
      questions: [
        {
          question: "Могу ли я изменить план позже?",
          answer: "Да, вы можете повысить или понизить свой план в любое время. Изменения вступят в силу в начале вашего следующего расчетного периода."
        },
        {
          question: "Доступен ли бесплатный пробный период?",
          answer: "Да, все платные планы включают 14-дневный бесплатный пробный период, чтобы вы могли протестировать функции перед принятием обязательств."
        },
        {
          question: "Какие способы оплаты вы принимаете?",
          answer: "Мы принимаем все основные кредитные карты, PayPal и банковские переводы для годовых планов."
        },
        {
          question: "Мои данные в безопасности?",
          answer: "Абсолютно. Мы используем сквозное шифрование и следуем лучшим отраслевым практикам для обеспечения безопасности и конфиденциальности данных."
        }
      ]
    }
  }
};

// Chinese translations
const zh = {
  pricing: {
    title: "简单透明的定价",
    description: "选择适合您组织的计划",
    tabMonthly: "月付",
    tabAnnually: "年付（节省20%）",
    plans: {
      starter: {
        title: "入门版",
        price: "¥199",
        priceAnnual: "¥159",
        description: "适合小型团队和项目",
        annualBilling: "年度账单 (¥1,908)"
      },
      professional: {
        title: "专业版",
        price: "¥699",
        priceAnnual: "¥559",
        description: "适合成长中的组织",
        annualBilling: "年度账单 (¥6,708)",
        popular: "最受欢迎"
      },
      enterprise: {
        title: "企业版",
        price: "定制",
        description: "适合有定制需求的大型组织"
      }
    },
    features: {
      starter: ["最多5名团队成员", "10 GB安全存储", "基本加密", "社区访问", "电子邮件支持"],
      professional: ["最多20名团队成员", "50 GB安全存储", "高级加密", "治理功能", "验证工具", "优先支持", "API访问"],
      enterprise: ["无限团队成员", "自定义存储限制", "高级安全功能", "自定义集成", "本地部署选项", "24/7专属支持", "合规性协助"]
    },
    cta: {
      getStarted: "开始使用",
      contactSales: "联系销售"
    },
    faq: {
      title: "常见问题",
      description: "有问题？我们有答案。",
      questions: [
        {
          question: "我可以稍后更改计划吗？",
          answer: "是的，您可以随时升级或降级您的计划。更改将在您下一个计费周期开始时生效。"
        },
        {
          question: "有免费试用吗？",
          answer: "是的，所有付费计划都包含14天免费试用，以便您在承诺前测试功能。"
        },
        {
          question: "您接受哪些付款方式？",
          answer: "我们接受所有主要信用卡、支付宝和年度计划的银行转账。"
        },
        {
          question: "我的数据安全吗？",
          answer: "绝对安全。我们使用端到端加密，并遵循行业最佳实践来保护数据安全和隐私。"
        }
      ]
    }
  }
};

export const pricingTranslations = {
  en, 
  de, 
  fr, 
  es, 
  ar, 
  bn, 
  he, 
  ja, 
  hi, 
  pt, 
  ru, 
  zh
};

export default pricingTranslations;
