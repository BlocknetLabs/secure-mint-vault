# Vercel Deployment Guide for Secure Mint Vault

This guide provides step-by-step instructions for deploying the Secure Mint Vault application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, find and select `BlocknetLabs/secure-mint-vault`
2. Click "Import" to proceed

### 3. Configure Project Settings

1. **Project Name**: `secure-mint-vault` (or your preferred name)
2. **Framework Preset**: Select "Vite" from the dropdown
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### 4. Environment Variables Configuration

Click "Environment Variables" and add the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Update with actual addresses after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_VERIFIER_ADDRESS=
NEXT_PUBLIC_TREASURY_ADDRESS=
```

**Important**: 
- Replace empty contract addresses with actual deployed contract addresses
- Ensure all environment variables are marked for "Production", "Preview", and "Development" environments

### 5. Advanced Configuration (Optional)

If needed, you can create a `vercel.json` file in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Vercel will automatically assign a URL like `https://secure-mint-vault-xxx.vercel.app`

### 7. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Update Contract Addresses

After deploying your smart contracts to Sepolia testnet:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update the following variables with actual contract addresses:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_VERIFIER_ADDRESS`
   - `NEXT_PUBLIC_TREASURY_ADDRESS`
3. Redeploy the application

### 2. Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify that the application loads correctly
4. Check browser console for any errors

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are properly installed
   - Verify TypeScript compilation errors
   - Ensure environment variables are correctly set

2. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check that RPC URLs are accessible
   - Ensure chain ID matches your target network

3. **Environment Variables**:
   - Double-check all variable names (case-sensitive)
   - Ensure no trailing spaces or quotes
   - Verify values are correct for your environment

### Build Logs

To view build logs:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check "Build Logs" tab for detailed information

## Continuous Deployment

Vercel automatically deploys when you push to the main branch:

1. Make changes to your code
2. Push to GitHub repository
3. Vercel automatically triggers a new deployment
4. Monitor deployment status in Vercel dashboard

## Performance Optimization

### Recommended Settings

1. **Build Optimization**:
   - Enable "Build Cache" in project settings
   - Use `npm ci` for faster, reliable builds

2. **Edge Functions** (if needed):
   - Consider using Vercel Edge Functions for API routes
   - Optimize for global performance

3. **Analytics**:
   - Enable Vercel Analytics for performance monitoring
   - Set up error tracking

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Regularly rotate API keys

2. **HTTPS**:
   - Vercel automatically provides SSL certificates
   - Ensure all external API calls use HTTPS

3. **CORS**:
   - Configure CORS settings if using external APIs
   - Restrict origins to your domain

## Monitoring and Maintenance

1. **Uptime Monitoring**:
   - Set up uptime monitoring for your application
   - Configure alerts for downtime

2. **Performance Monitoring**:
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Optimize based on performance data

3. **Regular Updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Test deployments in preview environment first

## Support

For deployment issues:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs for specific errors
3. Contact Vercel support if needed
4. Check project GitHub issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)
- [Web3 Deployment Considerations](https://ethereum.org/en/developers/docs/smart-contracts/deploying/)
