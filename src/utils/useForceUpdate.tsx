
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that forces a component to re-render when the language changes
 * This implementation uses multiple strategies to ensure components update
 */
export function useForceLanguageUpdate() {
  const { i18n } = useTranslation();
  const [, setTick] = useState(0);
  
  useEffect(() => {
    // Force initial render with correct language
    setTick(tick => tick + 1);
    
    const handleLanguageChanged = () => {
      console.log('Language change detected in hook, forcing re-render');
      setTick(tick => tick + 1);
    };
    
    // Listen to all possible language change events
    i18n.on('languageChanged', handleLanguageChanged);
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    // Create an interval to check for language changes as a fallback
    const intervalId = setInterval(() => {
      const htmlLang = document.documentElement.lang;
      const i18nLang = i18n.language;
      
      if (htmlLang !== i18nLang) {
        console.log('Language mismatch detected, syncing...');
        document.documentElement.lang = i18nLang;
        handleLanguageChanged();
      }
    }, 300);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      window.removeEventListener('languageChanged', handleLanguageChanged);
      clearInterval(intervalId);
    };
  }, [i18n]);
  
  // Return the current language as a dependency to force re-renders
  return i18n.language;
}

export default useForceLanguageUpdate;
