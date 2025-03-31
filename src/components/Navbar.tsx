
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { NavLinks } from "./navbar/NavLinks";
import { NavUserMenu } from "./navbar/NavUserMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { defaultMainNav } from "./navbar/NavConfig";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  mainNav?: typeof defaultMainNav;
}

export function Navbar({ mainNav: propMainNav }: NavbarProps) {
  const navItems = propMainNav || defaultMainNav;
  const { t } = useTranslation("common");

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {t("appName")}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ModeToggle />
            <NavUserMenu />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector variant="minimal" />
          <ModeToggle />
          <NavUserMenu />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
