
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

interface MainNavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

interface NavbarProps {
  mainNav?: MainNavItem[];
}

const mainNav: MainNavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Impact",
    href: "/impact",
  },
  {
    title: "Funding",
    href: "/funding",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Messaging",
    href: "/messaging",
  },
  {
    title: "Integration Hub",
    href: "/integration-hub",
  },
  {
    title: "Governance",
    href: "/governance",
  },
];

export function Navbar({ mainNav: propMainNav }: NavbarProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = propMainNav || mainNav;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems?.length ? (
              navItems.map(
                (item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      item.disabled && "pointer-events-none opacity-50",
                      location.pathname === item.href && "text-primary font-semibold"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              )
            ) : null}
          </nav>
          <ModeToggle />
          {/* Sign In button is still present but will just show the SignIn component */}
          <Button asChild variant="default" size="sm">
            <Link to="/sign-in">
              Sign In
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            {isMenuOpen ? (
              <Icons.close className="h-6 w-6" />
            ) : (
              <Icons.menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navItems?.length ? (
              navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    item.disabled && "pointer-events-none opacity-50",
                    location.pathname === item.href && "text-primary font-semibold"
                  )}
                >
                  {item.title}
                </Link>
              ))
            ) : null}
            <div className="flex justify-between items-center mt-2">
              <ModeToggle />
              <Button asChild variant="default" size="sm">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
