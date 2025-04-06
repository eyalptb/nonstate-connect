
import i18n from '@/i18n';
import { addComponentTranslations, loadAllComponentTranslations } from './translationCore';
import { learnTranslations } from './learnTranslations';

// Component-specific translations add functions
export const addWalletTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'wallet', namespace);

export const addFeatureTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'feature', namespace);

export const addJoinCtaTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'joinCta', namespace);

export const addProjectTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'project', namespace);

export const addFooterTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'footer', namespace);

export const addBackendTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'backend', namespace);

export const addFeaturePageTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'featurePage', namespace);

export const addUseCasesTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'useCases', namespace);

export const addLearnTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'learn', namespace);

// Component-specific load all translations functions
export const loadAllWalletTranslations = () => loadAllComponentTranslations('wallet');
export const loadAllFeatureTranslations = () => loadAllComponentTranslations('feature');
export const loadAllJoinCtaTranslations = () => loadAllComponentTranslations('joinCta');
export const loadAllProjectTranslations = () => loadAllComponentTranslations('project');
export const loadAllFooterTranslations = () => loadAllComponentTranslations('footer');
export const loadAllBackendTranslations = () => loadAllComponentTranslations('backend');
export const loadAllFeaturePageTranslations = () => loadAllComponentTranslations('featurePage');
export const loadAllUseCasesTranslations = () => loadAllComponentTranslations('useCases');

// Special handling for learn translations due to structure differences
export const loadAllLearnTranslations = async () => {
  // First load using the standard approach
  loadAllComponentTranslations('learn');
  
  // Then ensure translations are directly added for ALL supported languages
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  const realLanguages = supportedLanguages.filter(lang => 
    lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
  
  // Process each language
  realLanguages.forEach(lang => {
    if (learnTranslations[lang]) {
      console.log(`Adding learn translations for ${lang}`);
      i18n.addResourceBundle(
        lang, 
        'common', 
        { learn: learnTranslations[lang].learn }, 
        true, // override existing
        true  // deep merge
      );
      console.log(`Successfully loaded learn translations for ${lang}`);
    } else if (lang !== 'en') {
      // For languages without translations, add English as fallback
      console.log(`No translations found for ${lang}, adding English as fallback`);
      i18n.addResourceBundle(
        lang, 
        'common', 
        { learn: learnTranslations.en.learn }, 
        true, 
        false // don't deep merge for fallbacks
      );
    }
  });
  
  // Force refresh
  document.dispatchEvent(new Event('i18n-resources-loaded'));
  
  // Get the current language and check if Russian is special-cased
  const currentLang = i18n.language;
  if (currentLang === 'ru') {
    console.log("Explicitly added learn translations for ru");
    // Double-check Russian translations
    if (learnTranslations.ru) {
      i18n.addResourceBundle('ru', 'common', { learn: learnTranslations.ru.learn }, true, true);
    } else {
      // If Russian translations don't exist, create minimal ones
      const minimalRuTranslations = {
        learn: {
          title: "Учебные ресурсы",
          description: "Расширяйте свои знания с помощью руководств, учебных пособий и лучших практик",
          tabs: {
            guides: "Руководства",
            videos: "Видео",
            articles: "Статьи"
          },
          newsletter: {
            title: "Подпишитесь на нашу рассылку",
            description: "Получайте последние обновления и ресурсы на свою почту",
            cta: "Подписаться сейчас"
          }
        }
      };
      i18n.addResourceBundle('ru', 'common', minimalRuTranslations, true, true);
    }
  }
  
  return true;
};
