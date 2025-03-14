import { Rocket } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ParaCollab</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              A collaborative platform for parachute game enthusiasts and communities to work together on global challenges.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-3 text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Token</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Governance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-3 text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            &copy; {currentYear} ParaCollab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
