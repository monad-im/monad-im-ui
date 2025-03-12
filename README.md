
# KingNad NFT Leaderboard

## Introduction

KingNad NFT Leaderboard is a decentralized application (dApp) that allows users to view and interact with a leaderboard based on NFTs on the Monad Testnet blockchain. This application offers features such as minting and upgrading NFTs, as well as dynamically displaying rankings.

## Features

- **Dynamic Leaderboard**: Displays user rankings based on their points and interactions with the platform.
- **NFT Minting**: Allows users to create new NFTs by paying a minting fee.
- **NFT Upgrading**: Users can upgrade their existing NFTs to increase their rank.
- **League Visualization**: Classifies users into different leagues (Challenger, Diamond, etc.) based on their performance.

## Installation and Configuration

### Prerequisites

- Node.js (version 18.18.0 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monad-im/monad-im-ui.git
   cd monad-im-ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Ensure all necessary environment variables (such as API keys) are properly configured.

4. **Start the application:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application:**

   Open your browser and go to `http://localhost:3000`.

## Usage

- **Mint NFT**: Go to the mint page, connect your wallet, and click "Mint NFT".
- **Upgrade NFT**: Upgrade your existing NFT to increase your rank.
- **View Leaderboard**: Check the leaderboard to see user ranks and points.

## Code Structure

- **`src/hooks`**: Contains React hooks for managing application logic.
- **`src/components`**: React components for the user interface.
- **`src/features`**: Specific features of the application.
- **`src/utils`**: Utility functions for formatting and other tasks.
- **`src/contract`**: Contains smart contract addresses and ABIs.
- **`src/lib`**: Configuration and integration of external libraries.
- **`src/store`**: Global state management with Zustand.

## Contributing

1. **Fork the project.**
2. **Create a branch for your feature:**

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add a feature'
   ```

4. **Push your branch:**

   ```bash
   git push origin feature/my-feature
   ```

5. **Open a Pull Request.**

## FAQ

**Q: How can I mint an NFT?**  
A: Go to the mint page, connect your wallet, and click "Mint NFT".

**Q: What should I do if a transaction fails?**  
A: Check your network connection and ensure you have enough funds to cover transaction fees.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
