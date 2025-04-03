
import { useState, useEffect } from 'react';
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
  
  // Helper function to normalize language codes
  function getNormalizedLanguageCode(code: string): string {
    if (!code) return 'en';
    const simpleCode = code.split('-')[0];
    return Object.keys(languages).includes(simpleCode) ? simpleCode : 'en';
  }

  // Update current language code when i18n.language changes
  useEffect(() => {
    const normalized = getNormalizedLanguageCode(i18n.language);
    setCurrentLangCode(normalized);
    console.log(`Language code in component updated to: ${normalized} (from ${i18n.language})`);
  }, [i18n.language]);
  
  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log(`Language changed event detected: ${lng}`);
      setCurrentLangCode(getNormalizedLanguageCode(lng));
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = async (language: string) => {
    try {
      console.log(`Attempting to change language to: ${language}`);
      await i18n.changeLanguage(language);
      console.log(`Language successfully changed to: ${i18n.language}`);
      setIsOpen(false);
      // Show a toast confirmation
      toast(`Language changed to ${languages[language as keyof typeof languages]?.name || language}`);
    } catch (error) {
      console.error('Failed to change language:', error);
      toast.error(`Failed to change language. Please try again.`);
    }
  };
  
  const currentLang = languages[currentLangCode as keyof typeof languages] || languages.en;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-2", className)}
          aria-label={`Change language. Current: ${currentLang.name}`}
        >
          <Globe className="h-4 w-4" />
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
          >
            {language.nativeName} ({language.name})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
