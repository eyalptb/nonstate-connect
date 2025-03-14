
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Globe, 
  Shield, 
  Key,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
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
          <Button>Join Network</Button>
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
            <Button className="w-full">Join Network</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
