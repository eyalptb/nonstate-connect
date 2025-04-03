
import { useState } from "react";
import { Icons } from "@/components/icons";
import { NavLinks, MainNavItem } from "./NavLinks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  navItems: MainNavItem[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation(["common", "auth", "navigation"]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
        {isMenuOpen ? (
          <Icons.close className="h-6 w-6" />
        ) : (
          <Icons.menu className="h-6 w-6" />
        )}
      </button>
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsMenuOpen(false)}>
                <Icons.logo className="h-6 w-6" />
                {t("appName", { ns: "common" })}
              </Link>
              <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                <Icons.close className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              <NavLinks items={navItems} isMobile={true} onClick={() => setIsMenuOpen(false)} />
            </div>
            
            <div className="mt-auto pt-4">
              {!user && (
                <Button asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/sign-in">{t("signIn", { ns: "auth" })}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
