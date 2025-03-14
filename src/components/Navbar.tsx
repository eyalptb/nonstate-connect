
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Network, Menu, X, User, Coins, LogOut, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
    scrolled || mobileMenuOpen ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }`;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Funding', path: '/funding' },
    { name: 'Messages', path: '/messages' },
  ];

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">CollabNet</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm hover:text-primary transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary font-medium'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email?.split('@')[0] || 'Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="cursor-pointer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Coins className="mr-2 h-4 w-4" />
                      CollabCoins
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                {!isMobile && (
                  <Button asChild variant="outline">
                    <Link to="/sign-in">Sign in</Link>
                  </Button>
                )}
                <Button asChild>
                  <Link to="/sign-up">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 px-3 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-muted font-medium'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/sign-in"
                  className="py-2 px-3 rounded-md hover:bg-muted/50"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
