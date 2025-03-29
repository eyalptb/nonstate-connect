import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Avatar, 
  AvatarFallback 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, Shield } from "lucide-react";

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
  const { user, isAdmin, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    
    if (user.username) {
      return user.username.substring(0, 1).toUpperCase();
    }
    
    if (user.name) {
      return user.name.substring(0, 1).toUpperCase();
    }
    
    if (user.email) {
      return user.email.substring(0, 1).toUpperCase();
    }
    
    return "U";
  };

  const handleSignOut = async () => {
    console.log("Sign out clicked");
    await signOut();
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
          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username || user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Admin</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={handleSignOut} variant="default" size="sm" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleSignOut} variant="default" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}
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
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
