
import { useState, useEffect } from 'react';
import i18n from '@/i18n';

/**
 * Hook to check if i18n is initialized and ready to use
 * @returns boolean indicating if i18n is ready
 */
export function useI18nInit() {
  const [isI18nReady, setIsI18nReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsI18nReady(true);
      return;
    }

    const handleInitialized = () => {
      console.log('i18n initialized in hook');
      setIsI18nReady(true);
    };

    i18n.on('initialized', handleInitialized);

    // Set a timeout as fallback
    const timeoutId = setTimeout(() => {
      console.warn('i18n initialization timed out in hook, assuming ready');
      setIsI18nReady(true);
    }, 2000);

    return () => {
      i18n.off('initialized', handleInitialized);
      clearTimeout(timeoutId);
    };
  }, []);

  return isI18nReady;
}

export default useI18nInit;
