
import { useState } from 'react';
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

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function LanguageSelector({ variant = 'default', className }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const currentLang = languages[i18n.language as keyof typeof languages] || languages.en;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-2", className)}
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
              i18n.language === code && "font-bold bg-primary/10"
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
