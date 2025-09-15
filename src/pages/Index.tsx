import { HeroSection } from "@/components/HeroSection";
import { WalletConnector } from "@/components/WalletConnector";
import { WhitelistForm } from "@/components/WhitelistForm";
import { WhitelistStatus } from "@/components/WhitelistStatus";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Whitelist Section */}
      <section id="whitelist-section" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              Secure Your Spot
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet and submit your encrypted application to join our exclusive whitelist
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 1: Connect Wallet */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Link your Web3 wallet to verify your identity
                </p>
              </div>
              <WalletConnector />
            </div>
            
            {/* Step 2: Submit Application */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20 text-secondary font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Application</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out your encrypted whitelist application
                </p>
              </div>
              <WhitelistForm />
            </div>
            
            {/* Step 3: Track Status */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Status</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Monitor your position in the encrypted queue
                </p>
              </div>
              <WhitelistStatus />
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features Section */}
      <section className="py-20 px-4 bg-muted/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cyber-glow">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">End-to-End Encryption</h3>
              <p className="text-muted-foreground">Your personal data is encrypted using military-grade AES-256 encryption before storage.</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Distribution</h3>
              <p className="text-muted-foreground">First-come, first-served system ensures fair access without insider advantages.</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Verification</h3>
              <p className="text-muted-foreground">Automated wallet verification and instant status updates via blockchain integration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
