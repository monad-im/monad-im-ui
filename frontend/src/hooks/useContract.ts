import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contract";
import { LEAGUES } from "@/features/mint/constant";
import { monadTestnet } from "@/lib/wagmi/config";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export type League = "A" | "B" | "C" | "D" | "E";

export interface LeagueInfo {
  name: string;
  percentageRange: [number, number];
  description: string;
  color: string;
}

export interface PlayerRankInfo {
  address: string;
  points: bigint;
  rank: number;
  percentile: number;
  league: League;
  leagueInfo: LeagueInfo;
  leagueImageIndex: number;
}

type ContractReturn = {
  mintFee: bigint | undefined;
  holders: string[] | undefined;
  leaderboard: PlayerRankInfo[] | undefined;
  holderInfo: PlayerRankInfo | undefined;

  mintNFT: (e: any) => Promise<void>;
  upgrade: () => Promise<void>;
  hasNFT: (address?: string) => Promise<boolean>;
  getPoints: (address?: string) => Promise<bigint | undefined>;
  getRank: (toAddress?: string) => Promise<bigint | undefined>;
  getRankImage: (rank: bigint) => Promise<string | undefined>;
  getLeagueImage: (address: string) => string | undefined;
  refreshRankings: () => Promise<void>;
  calculateLeaderboard: () => Promise<void>;

  isMinting: boolean;
  isUpgrading: boolean;
  isTxConfirming: boolean;
  isTxConfirmed: boolean;
  isLoadingLeaderboard: boolean;
  lastUpdated: Date | undefined;
  userMinted: boolean | undefined;
  hash: `0x${string}` | undefined;
  isTxError: boolean;
};

function getLeagueImageIndex(percentileInLeague: number): number {
  return Math.max(1, Math.min(18, Math.floor(percentileInLeague * 18) + 1));
}

function getLeagueFromPercentile(percentile: number): League {
  if (percentile <= 5) return "A";
  if (percentile <= 20) return "B";
  if (percentile <= 50) return "C";
  if (percentile <= 80) return "D";
  return "E";
}

function getPercentileInLeague(percentile: number, league: League): number {
  const [min, max] = LEAGUES[league].percentageRange;
  const leagueSize = max - min;

  return leagueSize > 0 ? (percentile - min) / leagueSize : 0;
}

export const useContract = (): ContractReturn => {
  const { isConnected, address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PlayerRankInfo[]>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [cachedPointsData, setCachedPointsData] = useState<Map<string, bigint>>(
    new Map()
  );
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { data: hash, writeContractAsync } = useWriteContract();

  const {
    isLoading: isTxConfirming,
    isSuccess: isTxConfirmed,
    isError: isTxError,
  } = useWaitForTransactionReceipt({
    hash,
  });

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

  const { data: userMinted } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "hasNFT",
    args: [address],
  });

  const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
  });

  const mintNFT = async (e: any) => {
    e.preventDefault();

    if (!isConnected) {
      console.log("Veuillez connecter votre portefeuille d'abord !");
      return;
    }

    try {
      setIsMinting(true);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "requestMint",
        value: mintFee as bigint,
        account: address,
        chain: monadTestnet,
      });

      setShouldRefresh(true);
    } catch (error: any) {
      console.error("Error while minting NFT:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const upgrade = async () => {
    if (!isConnected) return;

    try {
      setIsUpgrading(true);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "upgrade",
        account: address,
        chain: monadTestnet,
      });

      setShouldRefresh(true);
    } catch (error: any) {
    } finally {
      setIsUpgrading(false);
    }
  };

  const hasNFT = async (toAddress?: string) => {
    const result = await readContract(publicClient, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "hasNFT",
      args: [toAddress || address],
    });
    return !!result;
  };

  const getPoints = async (toAddress?: string): Promise<bigint | undefined> => {
    const targetAddress = toAddress || address;
    if (!targetAddress) return undefined;

    if (cachedPointsData.has(targetAddress)) {
      return cachedPointsData.get(targetAddress);
    }

    try {
      const points = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "getPoints",
        args: [targetAddress],
      });

      setCachedPointsData((prevCache) => {
        const newCache = new Map(prevCache);
        newCache.set(targetAddress, points as bigint);
        return newCache;
      });

      return points as bigint;
    } catch (error) {
      return undefined;
    }
  };

  const getRank = async (toAddress?: string) => {
    try {
      const rank = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "getRank",
        args: [toAddress || address],
      });
      return rank as bigint;
    } catch (error) {
      return undefined;
    }
  };

  const getRankImage = async (rank: bigint) => {
    try {
      const result = await readContract(publicClient, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "getRankImage",
        args: [rank],
      });
      return result as string;
    } catch (error) {
      return undefined;
    }
  };

  const calculateLeaderboard = async () => {
    if (!holders || (holders as [])?.length === 0) return;

    setIsLoadingLeaderboard(true);

    try {
      setCachedPointsData(new Map());

      const rankings = [];

      for (const holder of holders as string[]) {
        const points = await getPoints(holder);
        const rank = await getRank(holder);
        rankings.push({
          address: holder,
          points: points || BigInt(0),
          rank: Number(rank || 0),
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      rankings.sort((a, b) => (b.points > a.points ? 1 : -1));

      const totalPlayers = rankings.length;
      const detailedRankings: PlayerRankInfo[] = rankings.map((item, index) => {
        const percentile = (index / totalPlayers) * 100;
        const league = getLeagueFromPercentile(percentile);
        const percentileInLeague = getPercentileInLeague(percentile, league);
        const leagueImageIndex = getLeagueImageIndex(percentileInLeague);

        return {
          ...item,
          rank: index + 1,
          percentile,
          league,
          leagueInfo: LEAGUES[league],
          leagueImageIndex,
        };
      });

      setLeaderboard(detailedRankings);
      setLastUpdated(new Date());
    } catch (error) {
    } finally {
      setIsLoadingLeaderboard(false);
      setShouldRefresh(false);
    }
  };

  const refreshRankings = async () => {
    if (lastUpdated && new Date().getTime() - lastUpdated.getTime() < 10000)
      return;

    setShouldRefresh(true);
  };

  const holderInfo = useMemo(() => {
    if (!address || !leaderboard) return undefined;
    return leaderboard.find(
      (player) => player.address.toLowerCase() === address.toLowerCase()
    );
  }, [address, leaderboard]);

  const getLeagueImage = (playerAddress: string): string | undefined => {
    if (!leaderboard) return undefined;

    const player = leaderboard.find(
      (p) => p.address.toLowerCase() === playerAddress.toLowerCase()
    );

    if (!player) return undefined;

    if (player.rank && player.rank > 0 && player.rank <= 8) {
      return `/ranks/${player.rank}.webp`;
    }

    return `/images/rankings/RANK${player.league}/KINGNADS_${player.league}_${player.leagueImageIndex}.png`;
  };

  useEffect(() => {
    if (
      (holders && (holders as []).length > 0 && !leaderboard) ||
      shouldRefresh
    ) {
      calculateLeaderboard();
    }
  }, [holders, shouldRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchMintFee();
      refetchHolders();
      if (
        lastUpdated &&
        new Date().getTime() - lastUpdated.getTime() > 5 * 60 * 1000
      ) {
        setShouldRefresh(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [refetchMintFee, refetchHolders, lastUpdated]);

  useEffect(() => {
    if (isTxConfirmed && address) {
      axios
        .post<{ success: boolean; hash: string }>(`${backendUrl}/api/mint`, {
          address,
        })
        .then((result) => {
          if (result.data.success) {
            setTimeout(() => {
              refetchHolders();
              setShouldRefresh(true);
            }, 2000);
          }
        })
        .catch((error) => {});
    }
  }, [isTxConfirmed]);

  return {
    // Data
    mintFee: mintFee as bigint,
    holders: holders as string[],
    leaderboard,
    holderInfo,
    lastUpdated,

    // Fonctions
    mintNFT,
    upgrade,
    hasNFT,
    getPoints,
    getRank,
    getRankImage,
    getLeagueImage,
    refreshRankings,
    calculateLeaderboard,

    // States
    isMinting,
    isUpgrading,
    isTxConfirming,
    isTxConfirmed,
    isLoadingLeaderboard,
    userMinted: userMinted as boolean | undefined,
    hash,
    isTxError,
  };
};
