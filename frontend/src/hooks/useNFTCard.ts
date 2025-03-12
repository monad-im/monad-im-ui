import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contract";
import { monadTestnet } from "@/lib/wagmi/config";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const RPC_URLS = [
  "https://testnet-rpc.monad.xyz/",
  "https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6",
  "https://cold-alien-pine.monad-testnet.quiknode.pro/bd2bdf09752a1d1519c98a1b8baa6467eaa50cb8/",
  "https://monad-testnet.drpc.org/",
];

const randomDelay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000) + 500)
  );

export const useNFTCard = () => {
  const { address } = useAccount();
  const [userNFT, setUserNFT] = useState<string>("/hackathon.png");
  const [rank, setRank] = useState<bigint | undefined>();
  const [points, setPoints] = useState<bigint | undefined>();
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
  });

  const { data: hash, writeContractAsync } = useWriteContract();
  const {
    isLoading: isTxConfirming,
    isSuccess: isTxConfirmed,
    isError: isTxError,
  } = useWaitForTransactionReceipt({ hash });

  const retryContractCall = async (
    operation: () => Promise<any>,
    maxRetries = 3
  ) => {
    let lastError;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      for (let rpcIndex = 0; rpcIndex < RPC_URLS.length; rpcIndex++) {
        try {
          const client = createPublicClient({
            chain: monadTestnet,
            transport: http(RPC_URLS[rpcIndex]),
          });
          const result = await operation();
          return result;
        } catch (error: any) {
          lastError = error;
          if (
            error?.message?.includes("429") ||
            error?.message?.includes("timeout")
          ) {
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * (attempt + 1))
            );
            continue;
          }
          throw error;
        }
      }
    }
    throw lastError;
  };

  const { data: mintFee } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getCurrentMintFee",
  });

  const { data: hasNFT } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "hasNFT",
    args: [address],
  });

  console.log(mintFee);
  useEffect(() => {
    const loadUserData = async () => {
      if (!address) return;

      setIsLoadingStats(true);
      try {
        const hasNFTResult = await retryContractCall(async () => {
          return readContract(publicClient, {
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "hasNFT",
            args: [address],
          });
        });

        if (hasNFTResult) {
          const [userRank, userPoints] = await Promise.all([
            retryContractCall(async () => {
              return readContract(publicClient, {
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "getRank",
                args: [address],
              });
            }),
            retryContractCall(async () => {
              return readContract(publicClient, {
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "getPoints",
                args: [address],
              });
            }),
          ]);

          setRank(userRank as bigint);
          setPoints(userPoints as bigint);

          if (userRank) {
            try {
              const result = await retryContractCall(async () => {
                return readContract(publicClient, {
                  address: CONTRACT_ADDRESS,
                  abi: CONTRACT_ABI,
                  functionName: "getRankImage",
                  args: [userRank as bigint],
                });
              });
              setUserNFT((result as string) || "/hackathon.png");
            } catch {
              setUserNFT("/hackathon.png");
            }
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données utilisateur:",
          error
        );
      } finally {
        setIsLoadingStats(false);
      }
    };

    loadUserData();
  }, [address]);

  const handleMintNFT = async () => {
    if (!mintFee) return;
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "requestMint",
        value: mintFee,
      });
    } catch (error) {
      console.error("Erreur lors du mint:", error);
    }
  };

  const handleUpgrade = async () => {
    try {
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "upgrade",
      });
    } catch (error) {
      console.error("Erreur lors de l'upgrade:", error);
    }
  };

  return {
    currentRank: rank,
    userPoints: points,
    mintFee,
    userNFT,
    hasNFT,
    isLoadingStats,
    isTxConfirming,
    isTxConfirmed,
    isTxError,
    hash,
    handleMintNFT,
    handleUpgrade,
  };
};
