
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '@/i18n';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function LanguageSelector({ variant = 'default', className }: LanguageSelectorProps) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState(getNormalizedLanguageCode(i18n.language));
  const [isLoading, setIsLoading] = useState(false);
  
  // Helper function to normalize language codes
  function getNormalizedLanguageCode(code: string): string {
    if (!code) return 'en';
    const simpleCode = code.split('-')[0];
    return Object.keys(languages).includes(simpleCode) ? simpleCode : 'en';
  }

  // Update current language when i18n.language changes
  useEffect(() => {
    const normalized = getNormalizedLanguageCode(i18n.language);
    setCurrentLangCode(normalized);
    console.log(`Language code in selector updated to: ${normalized} (from ${i18n.language})`);
  }, [i18n.language]);
  
  // Strong change language implementation
  const changeLanguage = useCallback(async (language: string) => {
    try {
      console.log(`Attempting to change language to: ${language}`);
      
      // Check if we're already using this language
      if (currentLangCode === language) {
        console.log('Already using this language, no change needed');
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      
      // Show toast notification that we're changing language
      const targetLang = languages[language as keyof typeof languages];
      toast.loading(`Changing language to ${targetLang?.name || language}...`);

      // Set HTML lang attribute immediately
      document.documentElement.lang = language;
      document.documentElement.dir = ['ar', 'he'].includes(language) ? 'rtl' : 'ltr';
      
      // Add URL parameter as a persistent language indicator
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.replaceState({}, '', url);
      
      // First load resources to ensure they're available
      await i18n.reloadResources([language]);
      
      // Then change the language
      await i18n.changeLanguage(language);
      
      console.log(`Language successfully changed to: ${i18n.language}`);
      
      // Store in localStorage for persistence
      localStorage.setItem('i18nextLng', language);
      
      // Force full application re-render
      setTimeout(() => {
        window.dispatchEvent(new Event('languageChanged'));
        
        // Show confirmation toast
        const displayName = languages[language as keyof typeof languages]?.name || language;
        toast.success(`Language changed to ${displayName}`);
        
        setIsLoading(false);
        setIsOpen(false);
      }, 100);
      
    } catch (error) {
      console.error('Failed to change language:', error);
      toast.error(`Failed to change language. Please try again.`);
      setIsLoading(false);
    }
  }, [currentLangCode, i18n]);

  const currentLang = languages[currentLangCode as keyof typeof languages] || languages.en;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-2", className)}
          aria-label={`Change language. Current: ${currentLang.name}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Globe className="h-4 w-4" />
          )}
          {variant === 'default' && (
            <span className="hidden sm:inline-block">
              {currentLang.nativeName}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, language]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={cn(
              "cursor-pointer",
              currentLangCode === code && "font-bold bg-primary/10"
            )}
            disabled={isLoading}
          >
            {language.nativeName} ({language.name})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
