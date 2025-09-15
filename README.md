# Secure Mint Vault

A secure, privacy-preserving whitelist and minting platform built with FHE (Fully Homomorphic Encryption) technology.

## Features

- **Privacy-First Design**: All sensitive data is encrypted using FHE technology
- **Secure Whitelist**: Encrypted whitelist entries with verification system
- **Wallet Integration**: Seamless connection with popular Web3 wallets via RainbowKit
- **Mint Management**: Secure token minting with encrypted request processing
- **Reputation System**: User reputation tracking with encrypted scoring
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption) via Zama
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BlocknetLabs/secure-mint-vault.git
cd secure-mint-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_VERIFIER_ADDRESS=YOUR_VERIFIER_ADDRESS
NEXT_PUBLIC_TREASURY_ADDRESS=YOUR_TREASURY_ADDRESS
```

## Smart Contract

The project includes a Solidity smart contract (`contracts/SecureMintVault.sol`) that implements:

- Encrypted whitelist management
- Secure mint request processing
- User reputation system
- Treasury management
- Emergency controls

### Contract Features

- **FHE Integration**: All sensitive data is encrypted using Zama's FHE technology
- **Access Control**: Role-based permissions for owner, verifier, and users
- **Privacy Preservation**: User data remains encrypted on-chain
- **Gas Optimization**: Efficient storage and computation patterns

## Usage

1. **Connect Wallet**: Use the wallet connector to link your Web3 wallet
2. **Submit Whitelist Application**: Fill out the encrypted whitelist form
3. **Wait for Verification**: Your application will be reviewed by verifiers
4. **Create Mint Request**: Once verified, you can request token minting
5. **Process Minting**: Approved requests are processed by the contract

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── WalletConnector.tsx
│   ├── WhitelistForm.tsx
│   └── WhitelistStatus.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Page components
└── App.tsx             # Main application component
```

## Security

This project implements multiple security layers:

- **FHE Encryption**: All sensitive data is encrypted using fully homomorphic encryption
- **Access Controls**: Smart contract implements role-based access control
- **Input Validation**: Comprehensive validation on both frontend and smart contract
- **Secure Communication**: All blockchain interactions are properly secured

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in this repository
- Contact the development team
- Check the documentation for common solutions

## Acknowledgments

- [Zama](https://zama.ai/) for FHE technology
- [RainbowKit](https://rainbowkit.com/) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Vite](https://vitejs.dev/) for build tooling
