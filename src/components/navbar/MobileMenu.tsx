
import { useState } from "react";
import { Icons } from "@/components/icons";
import { NavLinks, MainNavItem } from "./NavLinks";

interface MobileMenuProps {
  navItems: MainNavItem[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="md:hidden p-4">
          <NavLinks items={navItems} isMobile={true} />
        </div>
      )}
    </>
  );
}
