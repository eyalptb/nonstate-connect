
import React from 'react';
import useDashboardTranslations from '@/hooks/useDashboardTranslations';

interface DashboardTranslationLoaderProps {
  children?: React.ReactNode;
}

/**
 * Component that handles loading dashboard translations before rendering children
 */
const DashboardTranslationLoader: React.FC<DashboardTranslationLoaderProps> = ({ children }) => {
  // Use our custom hook to handle all translation loading logic
  const { isLoaded } = useDashboardTranslations();
  
  // Always render children - the hook handles loading state internally
  return <>{children}</>;
};

export default DashboardTranslationLoader;
