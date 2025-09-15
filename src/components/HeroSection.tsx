import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const scrollToWhitelist = () => {
    document.getElementById("whitelist-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-in">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="block text-glow">Whitelist Privately,</span>
            <span className="block text-cyber-glow mt-2">Mint Securely</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join the exclusive NFT whitelist with end-to-end encryption. Your data remains private while ensuring fair access to premium drops.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
              <Lock className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Private Data</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Fair Access</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="animate-float">
            <Button 
              onClick={scrollToWhitelist}
              size="lg"
              className="neon-button text-lg px-8 py-6"
            >
              Join Whitelist Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary font-mono">500</div>
              <div className="text-sm text-muted-foreground">Whitelist Spots</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary font-mono">247</div>
              <div className="text-sm text-muted-foreground">Currently Registered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent font-mono">100%</div>
              <div className="text-sm text-muted-foreground">Data Encrypted</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-secondary rounded-full animate-pulse-glow" />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
    </section>
  );
}