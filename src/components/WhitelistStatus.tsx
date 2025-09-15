import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Shield, CheckCircle2 } from "lucide-react";

export function WhitelistStatus() {
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(247);
  const [totalSpots] = useState(500);
  const [status] = useState<"pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent text-accent-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "rejected":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
          <Shield className="h-8 w-8 text-secondary" />
        </div>
        <CardTitle className="text-xl font-bold text-cyber-glow">Whitelist Status</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your position in the encrypted queue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Badge className={`${getStatusColor(status)} px-3 py-1`}>
            {getStatusIcon(status)}
            <span className="ml-2 capitalize">{status}</span>
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Queue Position</span>
            <span className="font-mono text-primary">#{position}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border/50 bg-muted/10 p-3 text-center">
            <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="text-lg font-bold font-mono">{totalSpots - position}</p>
            <p className="text-xs text-muted-foreground">Spots Available</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/10 p-3 text-center">
            <Clock className="mx-auto mb-2 h-5 w-5 text-secondary" />
            <p className="text-lg font-bold font-mono">~2h</p>
            <p className="text-xs text-muted-foreground">Est. Wait Time</p>
          </div>
        </div>

        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Security Notice</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your data is encrypted using AES-256 encryption. Only verified wallet addresses
            will receive mint access tokens.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}