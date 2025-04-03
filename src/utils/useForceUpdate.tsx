
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A hook that ensures components re-render when language changes
 * Returns the current language code which can be used as a dependency or key
 */
export function useForceLanguageUpdate() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
  useEffect(() => {
    console.log('[useForceLanguageUpdate] Initializing with language:', i18n.language);
    
    // Function to update our local state when language changes
    const handleLanguageChange = (lng: string) => {
      console.log(`[useForceLanguageUpdate] Language changed to: ${lng}`);
      console.log(`[useForceLanguageUpdate] Current resources:`, i18n.store?.data);
      setCurrentLanguage(lng);
    };
    
    // Set initial language
    setCurrentLanguage(i18n.language);
    
    // Add event listener for language changes
    i18n.on('languageChanged', handleLanguageChange);
    
    // Debug info about component using this hook
    const componentStack = new Error().stack?.split('\n').slice(2, 4).join(' → ');
    console.log(`[useForceLanguageUpdate] Component ${componentStack} is tracking language:`, i18n.language);
    
    return () => {
      // Clean up event listener
      console.log('[useForceLanguageUpdate] Cleaning up language change listener');
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  return currentLanguage; // Return current language code for keys/dependencies
}

export default useForceLanguageUpdate;
