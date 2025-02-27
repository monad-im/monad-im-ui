import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";

export const monadTestnet = {
  id: 10143,
  name: "Monad Testnet",
  network: "Monad Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "TMON",
    symbol: "TMON",
  },
  rpcUrls: {
    default: {
      http: [
        "https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6",
      ],
    },
    public: {
      http: [
        "https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "MonadScan",
      url: "https://scan.monad.com",
    },
  },
};

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const networks = [monadTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }) as unknown as any,
  ssr: true,
  networks,
  projectId,
});

export const config = wagmiAdapter.wagmiConfig;
