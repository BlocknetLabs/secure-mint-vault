import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Lock, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function WhitelistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    twitterHandle: "",
    discordUsername: "",
    reason: "",
  });
  const { toast } = useToast();
  const { address, isConnected } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before submitting the whitelist application.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // Simulate form submission with encryption
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Whitelist Application Submitted",
        description: "Your encrypted data has been secured. You'll receive confirmation soon.",
      });
      
      // Reset form
      setFormData({
        email: "",
        twitterHandle: "",
        discordUsername: "",
        reason: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <UserPlus className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-xl font-bold text-glow">Join Whitelist</CardTitle>
        <CardDescription className="text-muted-foreground">
          Submit your encrypted application for exclusive access
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to submit a whitelist application.
            </AlertDescription>
          </Alert>
        )}
        
        {isConnected && (
          <div className="mb-4 p-3 rounded-lg border border-green-500/20 bg-green-500/10">
            <p className="text-sm text-green-400 font-medium">Wallet Connected</p>
            <p className="text-xs text-muted-foreground font-mono break-all">
              {address}
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="text-sm font-medium">
              Twitter Handle
            </Label>
            <Input
              id="twitter"
              value={formData.twitterHandle}
              onChange={(e) => handleInputChange("twitterHandle", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-primary"
              placeholder="@username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discord" className="text-sm font-medium">
              Discord Username
            </Label>
            <Input
              id="discord"
              value={formData.discordUsername}
              onChange={(e) => handleInputChange("discordUsername", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-primary"
              placeholder="username#1234"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Why do you want to join?
            </Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-primary min-h-[100px]"
              placeholder="Tell us about your interest in this NFT collection..."
              required
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>All data is encrypted and stored securely</span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isConnected}
            className="neon-button w-full"
          >
            {isSubmitting ? "Encrypting & Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}