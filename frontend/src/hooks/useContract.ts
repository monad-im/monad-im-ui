import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contract";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

type ContractReturn = {
  mintFee: bigint | undefined;
  holders: string[] | undefined;
  mintNFT: (e: any) => Promise<void>;
  isMinting: boolean;
  isTxConfirming: boolean;
  isTxConfirmed: boolean;
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const useContract = (): ContractReturn => {
  const { isConnected, address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  const {
    data: hash,
    isPending: isPendingWrite,
    writeContractAsync,
  } = useWriteContract();

  const {
    isLoading: isTxConfirming,
    isSuccess: isTxConfirmed,
    isError: isTxError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mintNFT = async (e: any) => {
    e.preventDefault();

    if (!isConnected) {
      // toast.error('Please connect your wallet first!');
      return;
    }

    try {
      setIsMinting(true);
      try {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "requestMint",
          account: address,
          value: mintFee,
          chain: {
            id: 10143,
            name: "Monad Testnet",
            nativeCurrency: {
              name: "Monad",
              symbol: "MON",
              decimals: 18,
            },
          },
        });
      } catch (error: any) {
        console.error("Error minting NFT:", error);
        // toast.error('Failed to mint NFT');
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      // toast.error('Failed to mint NFT');
    } finally {
      setIsMinting(false);
    }
  };

  const { data: mintFee, refetch: refetchMintFee } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getCurrentMintFee",
  });

  const { data: holders, refetch: refetchHolders } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getHolders",
  });

  // Refresh contract data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchMintFee();
      refetchHolders();
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [refetchMintFee, refetchHolders]);

  useEffect(() => {
    if (isTxConfirmed && address) {
      axios
        .post<{ success: boolean; hash: string }>(`${backendUrl}/api/mint`, {
          address,
        })
        .then((result) => {
          if (result.data.success) {
            const mintedHash = result.data.hash;
            // toast.success(`NFT minted successfully: ${mintedHash}`);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTxConfirmed]);

  return {
    mintFee,
    holders,
    mintNFT,
    isMinting,
    isTxConfirming,
    isTxConfirmed,
  };
};
