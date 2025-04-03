
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that forces a component to re-render when the language changes
 */
export function useForceLanguageUpdate() {
  const { i18n } = useTranslation();
  const [, setTick] = useState(0);
  
  useEffect(() => {
    const handleLanguageChanged = () => {
      // Force re-render
      setTick(tick => tick + 1);
    };
    
    // Listen for language change events
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Also listen for a custom event that we can trigger manually
    window.addEventListener('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      window.removeEventListener('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
}

export default useForceLanguageUpdate;
