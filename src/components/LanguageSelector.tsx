
import React from "react";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { reloadTranslations } from "@/i18n";
import { toast } from "sonner";

interface LanguageSelectorProps {
  variant?: "default" | "minimal";
}

export function LanguageSelector({ variant = "default" }: LanguageSelectorProps) {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
    { code: "ar", name: "العربية" },
    { code: "hi", name: "हिन्दी" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ru", name: "Русский" },
    { code: "he", name: "עברית" },
  ];

  const handleLanguageChange = async (langCode: string) => {
    console.log(`[LanguageSelector] Changing language to: ${langCode}`);
    console.log(`[LanguageSelector] Current language before change: ${i18n.language}`);
    console.log(`[LanguageSelector] Available languages: ${i18n.languages}`);
    
    try {
      // Show toast to indicate change
      toast.info(`Changing language to ${languages.find(l => l.code === langCode)?.name || langCode}...`);
      
      // Change the language
      await i18n.changeLanguage(langCode);
      console.log(`[LanguageSelector] Language change call completed to: ${langCode}`);
      console.log(`[LanguageSelector] New language after change: ${i18n.language}`);
      
      // Store the selected language in localStorage
      localStorage.setItem("i18nextLng", langCode);
      console.log(`[LanguageSelector] Saved language to localStorage: ${langCode}`);
      
      // Update HTML lang attribute
      document.documentElement.lang = langCode;
      
      // Manually reload translations if needed
      const reloadSuccess = await reloadTranslations(langCode);
      console.log(`[LanguageSelector] Manual reload ${reloadSuccess ? 'succeeded' : 'failed'}`);
      
      // Show success toast
      toast.success(`Language changed to ${languages.find(l => l.code === langCode)?.name || langCode}`);
      
      // For debugging, check what namespaces are available
      console.log(`[LanguageSelector] Used namespaces:`, i18n.reportNamespaces.getUsedNamespaces());

    } catch (error) {
      console.error(`[LanguageSelector] Error changing language to ${langCode}:`, error);
      toast.error(`Failed to change language: ${error.message}`);
    }
  };

  // Log when this component renders
  React.useEffect(() => {
    console.log('[LanguageSelector] Component mounted/updated, current language:', i18n.language);
    return () => {
      console.log('[LanguageSelector] Component unmounting');
    };
  }, [i18n.language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "minimal" ? (
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <GlobeIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" className="flex items-center gap-2 px-3">
            <GlobeIcon className="h-4 w-4" />
            <span>{languages.find(lang => lang.code === i18n.language)?.name || "Language"}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className="flex items-center justify-between"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span>{lang.name}</span>
            {i18n.language === lang.code && (
              <CheckIcon className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-xs text-muted-foreground"
          onClick={() => {
            console.log("[LanguageSelector] Debug info:", {
              currentLanguage: i18n.language,
              availableLanguages: i18n.languages,
              store: i18n.store.data,
              namespaces: i18n.reportNamespaces?.getUsedNamespaces() || []
            });
            toast.info(`Current language: ${i18n.language}`);
          }}
        >
          {i18n.language ? t("language", "Language") : "Language"}: {i18n.language}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
