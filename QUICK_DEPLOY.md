# Quick Vercel Deployment Guide

## One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BlocknetLabs/secure-mint-vault)

## Manual Deployment Steps

### 1. Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `BlocknetLabs/secure-mint-vault`
3. Click "Deploy"

### 2. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### 3. Deploy
- Click "Deploy" 
- Wait 2-3 minutes
- Your app will be live at `https://your-project.vercel.app`

## Post-Deployment
1. Update contract addresses in environment variables
2. Test wallet connection
3. Verify all functionality works

## Support
- Full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Issues: [GitHub Issues](https://github.com/BlocknetLabs/secure-mint-vault/issues)
