import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield } from "lucide-react";
import { useAccount } from 'wagmi';

export function WalletConnector() {
  const { address, isConnected } = useAccount();

  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold text-glow">Wallet Connection</CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect your wallet to access the private whitelist
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="neon-button w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="w-full px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                          <p className="text-sm font-mono text-cyber-cyan">Connected:</p>
                          <p className="text-xs font-mono text-muted-foreground break-all">
                            {account.displayName}
                          </p>
                        </div>
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="w-full px-4 py-2 rounded-lg border border-destructive/50 text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          Disconnect Wallet
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </CardContent>
    </Card>
  );
}