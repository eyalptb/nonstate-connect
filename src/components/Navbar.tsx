
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface MainNavItem {
  title: string;
  href: string;
  disabled?: boolean;
  adminOnly?: boolean;
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
  {
    title: "Admin",
    href: "/admin",
    adminOnly: true,
  },
];

export function Navbar({ mainNav: propMainNav }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = propMainNav || mainNav;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => !item.adminOnly || (item.adminOnly && isAdmin));

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {filteredNavItems?.length ? (
              filteredNavItems.map(
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border-2 border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url || `https://avatar.vercel.sh/${user?.email}.png`} alt={user?.email || "Avatar"} />
                    <AvatarFallback>{profile?.first_name?.[0] || profile?.last_name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem>
                    <Link to="/admin" className="w-full">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/sign-in">
                Sign In
              </Link>
            </Button>
          )}
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
            {filteredNavItems?.length ? (
              filteredNavItems.map((item, i) => (
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
              {user ? (
                <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button asChild variant="default" size="sm">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
            {user && (
              <div className="space-y-2 mt-2 border-t pt-2">
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link to="/dashboard">Dashboard</Link>
                {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
