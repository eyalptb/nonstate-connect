
import { Button } from "@/components/ui/button";
import { Shield, Globe, Network } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-hero -z-10"></div>
      <div className="absolute inset-0 grid-pattern opacity-20 -z-10"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Secure, Decentralized Collaboration
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Empowering <span className="text-primary">Nonstate Actors</span> to Solve Global Challenges
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              A blockchain-based platform where NGOs, activists, and communities collaborate securely on global issues like climate action and anti-corruption.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="font-semibold">
                Join the Network
              </Button>
              <Button size="lg" variant="outline" className="font-semibold">
                Explore Projects
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-background"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/70">
                <span className="font-semibold">1,200+</span> organizations already collaborating
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] hexagon bg-gradient-to-br from-primary to-secondary opacity-20 animate-pulse-slow"></div>
              
              <div className="absolute top-1/4 left-1/4 w-16 h-16 hexagon bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-float">
                <Globe className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute top-1/3 right-1/4 w-20 h-20 hexagon bg-secondary/80 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <Network className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute bottom-1/4 left-1/3 w-24 h-24 hexagon bg-accent/80 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-[-1]" viewBox="0 0 400 400">
                <path 
                  d="M100,100 L200,150 L260,130 L180,240" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  className="text-primary/40"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
