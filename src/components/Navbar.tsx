
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { NavLinks } from "./navbar/NavLinks";
import { NavUserMenu } from "./navbar/NavUserMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { loggedInMainNav, loggedOutMainNav } from "./navbar/NavConfig";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/contexts/translation/TranslationContext";
import { useAuth } from "@/contexts/auth";
import { Button } from "./ui/button";

export function Navbar() {
  const { user } = useAuth();
  const { t } = useTranslation(["common", "auth", "navigation"]);
  
  // Show different navigation items based on authentication state
  const navItems = user ? loggedInMainNav : loggedOutMainNav;

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {t("appName", { ns: "common" })}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ModeToggle />
            {user ? (
              <NavUserMenu />
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/sign-in">{t("signIn", { ns: "auth" })}</Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector variant="minimal" />
          <ModeToggle />
          {user ? (
            <NavUserMenu />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/sign-in">{t("signIn", { ns: "auth" })}</Link>
            </Button>
          )}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
