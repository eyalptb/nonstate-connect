
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { NavLinks } from "./navbar/NavLinks";
import { NavUserMenu } from "./navbar/NavUserMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { defaultMainNav } from "./navbar/NavConfig";

interface NavbarProps {
  mainNav?: typeof defaultMainNav;
}

export function Navbar({ mainNav: propMainNav }: NavbarProps) {
  const navItems = propMainNav || defaultMainNav;

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {siteConfig.name}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks items={navItems} />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <NavUserMenu />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <NavUserMenu />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
