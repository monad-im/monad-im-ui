import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contract";
import { League } from "@/features/mint/constant";
import { monadTestnet } from "@/lib/wagmi/config";
import { useCallback, useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useReadContract } from "wagmi";

const CACHE_KEY = "leaderboard_image_cache";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 heures

const loadImageCache = () => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return new Map(Object.entries(data));
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement du cache:", error);
  }
  return new Map();
};

const saveImageCache = (cache: Map<string, string>) => {
  try {
    const data = Object.fromEntries(cache.entries());
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du cache:", error);
  }
};

const imageCache = loadImageCache();

const RPC_URLS = [
  "https://10143.rpc.thirdweb.com/",
  "https://testnet-rpc.monad.xyz/",
  "https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6",
  "https://cold-alien-pine.monad-testnet.quiknode.pro/bd2bdf09752a1d1519c98a1b8baa6467eaa50cb8/",
  "https://monad-testnet.drpc.org/",
];

export interface PlayerInfo {
  address: string;
  points: bigint;
  rank: number;
  league: League;
  leagueInfo: {
    name: string;
    color: string;
    image: string;
  };
  nftImage: string;
}

export const useLeaderboard = () => {
  const { address } = useAccount();
  const [leaderboard, setLeaderboard] = useState<PlayerInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLeague, setActiveLeague] = useState<League | "ALL">("ALL");
  const [initialized, setInitialized] = useState(false);

  const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http("https://10143.rpc.thirdweb.com/"),
  });

  const { data: holders } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getHolders",
  });

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
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          throw error;
        }
      }
    }
    throw lastError;
  };

  const getNFTImage = useCallback(async (rank: bigint) => {
    const cacheKey = `rank_${rank.toString()}`;
    if (imageCache.has(cacheKey)) {
      return imageCache.get(cacheKey);
    }

    try {
      const result = await retryContractCall(async () => {
        const client = createPublicClient({
          chain: monadTestnet,
          transport: http(RPC_URLS[0]),
        });
        return readContract(client, {
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "getRankImage",
          args: [rank],
        });
      });

      const imageUrl = (result as string) || "/hackathon.png";
      if (imageUrl !== "/hackathon.png") {
        imageCache.set(cacheKey, imageUrl);
        saveImageCache(imageCache);
      }
      return imageUrl;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image:", error);
      return "/hackathon.png";
    }
  }, []);

  const getLeagueInfo = useCallback((league: League) => {
    const leagueInfoMap = {
      A: {
        name: "Challenger",
        color: "#FF4E50",
        image: "/leagues/challenger.png",
      },
      B: { name: "Diamond", color: "#3498db", image: "/leagues/diamond.png" },
      C: { name: "Gold", color: "#f1c40f", image: "/leagues/gold.png" },
      D: { name: "Silver", color: "#bdc3c7", image: "/leagues/silver.png" },
      E: { name: "Bronze", color: "#cd7f32", image: "/leagues/bronze.png" },
    };
    return leagueInfoMap[league];
  }, []);

  const assignLeagues = useCallback((rankings: any[]) => {
    const totalHolders = rankings.length;
    const result = [];

    if (totalHolders < 100) {
      const quotas = {
        A: Math.min(totalHolders, 20),
        B: Math.min(Math.max(totalHolders - 20, 0), 20),
        C: Math.min(Math.max(totalHolders - 40, 0), 20),
        D: Math.min(Math.max(totalHolders - 60, 0), 20),
        E: Math.max(totalHolders - 80, 0),
      };

      let currentIndex = 0;
      for (const league of ["A", "B", "C", "D", "E"] as League[]) {
        for (let i = 0; i < quotas[league]; i++) {
          if (currentIndex < totalHolders) {
            result.push({
              ...rankings[currentIndex],
              rank: currentIndex + 1,
              league,
            });
            currentIndex++;
          }
        }
      }
    } else {
      rankings.forEach((player, index) => {
        let league: League;
        if (index < totalHolders * 0.2) league = "A";
        else if (index < totalHolders * 0.4) league = "B";
        else if (index < totalHolders * 0.6) league = "C";
        else if (index < totalHolders * 0.8) league = "D";
        else league = "E";

        result.push({
          ...player,
          rank: index + 1,
          league,
        });
      });
    }

    return result;
  }, []);

  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!Array.isArray(holders) || initialized) return;

      setIsLoading(true);
      try {
        const holdersWithPoints: { address: string; points: bigint }[] = [];
        for (const holderAddress of holders as string[]) {
          try {
            const points = await retryContractCall(async () => {
              return readContract(publicClient, {
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "getPoints",
                args: [holderAddress],
              });
            });

            holdersWithPoints.push({
              address: holderAddress,
              points: points as bigint,
            });
          } catch (error) {
            console.error(`Erreur pour ${holderAddress}:`, error);
            holdersWithPoints.push({
              address: holderAddress,
              points: BigInt(0),
            });
          }
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        const sortedHolders = [...holdersWithPoints].sort((a, b) =>
          b.points > a.points ? 1 : b.points < a.points ? -1 : 0
        );

        const rankingsWithLeagues = assignLeagues(sortedHolders);

        const completeLeaderboard = [];
        for (const player of rankingsWithLeagues) {
          const nftImage = await getNFTImage(BigInt(player.rank));
          completeLeaderboard.push({
            ...player,
            nftImage,
            leagueInfo: getLeagueInfo(player.league),
          });
        }
        setLeaderboard(completeLeaderboard);
        setInitialized(true);
      } catch (error) {
        console.error("Erreur lors du chargement du leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [
    holders,
    publicClient,
    assignLeagues,
    getNFTImage,
    getLeagueInfo,
    initialized,
  ]);

  const refreshLeaderboard = useCallback(() => {
    setInitialized(false);
  }, []);

  return {
    leaderboard,
    activeLeague,
    isLoading,
    setActiveLeague,
    refreshLeaderboard,
  };
};
