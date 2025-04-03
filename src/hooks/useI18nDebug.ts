
import { useState, useEffect } from 'react';
import i18n from '@/i18n';

/**
 * Hook to track i18n debug information
 * @returns Object with debug information about i18n state
 */
export function useI18nDebug() {
  const [debugInfo, setDebugInfo] = useState({
    isInitialized: i18n.isInitialized,
    currentLanguage: i18n.language,
    availableLanguages: i18n.languages || [],
    loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
    resourceStore: i18n.store?.data || {}
  });

  useEffect(() => {
    console.log('[useI18nDebug] Initial debug info:', debugInfo);
    
    const updateDebugInfo = () => {
      const newInfo = {
        isInitialized: i18n.isInitialized,
        currentLanguage: i18n.language,
        availableLanguages: i18n.languages || [],
        loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
        resourceStore: i18n.store?.data || {}
      };
      setDebugInfo(newInfo);
      console.log('[useI18nDebug] Updated debug info:', newInfo);
    };
    
    // Update on various events
    i18n.on('initialized', updateDebugInfo);
    i18n.on('loaded', updateDebugInfo);
    i18n.on('languageChanged', updateDebugInfo);
    
    // Update every few seconds for monitoring
    const intervalId = setInterval(updateDebugInfo, 3000);
    
    return () => {
      i18n.off('initialized', updateDebugInfo);
      i18n.off('loaded', updateDebugInfo);
      i18n.off('languageChanged', updateDebugInfo);
      clearInterval(intervalId);
    };
  }, []);
  
  return debugInfo;
}

export default useI18nDebug;
