
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that forces a component to re-render when the language changes
 */
export function useForceLanguageUpdate() {
  const { i18n } = useTranslation();
  const [, setTick] = useState(0);
  
  useEffect(() => {
    console.log('useForceLanguageUpdate registered for language:', i18n.language);
    
    const handleLanguageChanged = () => {
      console.log('Language change detected, forcing re-render');
      // Force re-render
      setTick(tick => tick + 1);
    };
    
    // Listen directly for i18n's languageChanged event
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Also listen for a custom event that we can trigger manually
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    // Initial trigger to force first render with correct language
    setTick(tick => tick + 1);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      window.removeEventListener('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
}

export default useForceLanguageUpdate;
