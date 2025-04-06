
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
import i18n from "@/i18n";

interface LanguageSelectorProps {
  variant?: "default" | "minimal";
}

export function LanguageSelector({ variant = "default" }: LanguageSelectorProps) {
  const { t } = useTranslation();

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
    // Only change language if it's different from current
    if (langCode !== i18n.language) {
      // Change language without any toast notification - notification is ONLY handled in TranslationContext
      await i18n.changeLanguage(langCode);
    }
  };

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
        >
          {t("language", "Language")}: {i18n.language}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
