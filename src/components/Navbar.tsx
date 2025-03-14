
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Network,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Network className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">NonStateConnect</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#projects" className="text-foreground/80 hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.first_name || 'User'}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-base font-medium text-primary">
                        {(profile?.first_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/sign-in')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/sign-up')}>
                Join Network
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="block md:hidden p-2 text-foreground" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-background border-b border-border md:hidden z-40">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#projects" 
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Projects
            </a>
            <a 
              href="#about" 
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              About
            </a>
            
            {user ? (
              <>
                <Button 
                  className="w-full"
                  onClick={() => {
                    navigate('/dashboard');
                    toggleMenu();
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigate('/sign-in');
                    toggleMenu();
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    navigate('/sign-up');
                    toggleMenu();
                  }}
                >
                  Join Network
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
