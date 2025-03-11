"use client";
import { League, useContract } from "@/hooks/useContract";
import { formatNumber } from "@/utils/format";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Leaderboard from "./components/leaderboard";
import { LEAGUES, RANKS } from "./constant";

const StatisticsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={`stat-skeleton-${index}`}
          className="h-[130px] col-span-1 bg-white/10 rounded-2xl"
        >
          <div className="flex items-center justify-center flex-col w-full h-full">
            <div className="h-10 w-20 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-white/20 rounded animate-pulse mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const MintPage = () => {
  const { address } = useAccount();
  const {
    mintFee,
    holders,
    mintNFT,
    upgrade,
    hasNFT,
    isMinting,
    isUpgrading,
    isTxConfirming,
    getPoints,
    getRank,
    isTxConfirmed,
    hash,
    userMinted,
    isTxError,
    getRankMetadata,
    getRankImage,
    userPoints: points,
    userRank: rank,
  } = useContract();

  const [userRank, setUserRank] = useState<bigint | undefined>(undefined);
  const [userPoints, setUserPoints] = useState<bigint | undefined>(undefined);
  const [nftImageUrl, setNftImageUrl] = useState<string>("");
  const [nftMetadata, setNftMetadata] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<
    Array<{ address: string; points: bigint; rank: unknown }>
  >([]);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);

  const generateLeaderboard = useCallback(async () => {
    if (holders && holders.length > 0) {
      try {
        const leaderboardData = [];
        const addressesToProcess = holders.slice(0, 20);

        for (const holderAddress of addressesToProcess) {
          const points = await getPoints(holderAddress);
          const rank = await getRank(holderAddress);

          if (points !== undefined && rank !== undefined) {
            leaderboardData.push({
              address: holderAddress,
              points: points || BigInt(0),
              rank: rank || BigInt(0),
            });
          }
        }

        if (
          address &&
          userPoints &&
          userRank &&
          !leaderboardData.some(
            (holder) => holder.address.toLowerCase() === address.toLowerCase()
          )
        ) {
          leaderboardData.push({
            address: address as string,
            points: userPoints,
            rank: userRank,
          });
        }

        leaderboardData.sort((a, b) => (b.points > a.points ? 1 : -1));

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Erreur lors de la génération du leaderboard:", error);
      } finally {
      }
    }
  }, [holders, getPoints, getRank, address, userPoints, userRank]);

  const refreshAllData = useCallback(async () => {
    setIsLoadingStats(true);

    try {
      if (address) {
        const hasNFTResult = await hasNFT(address);

        if (hasNFTResult) {
          const [userRankResult, userPointsResult] = await Promise.all([
            getRank(address),
            getPoints(address),
          ]);

          setUserRank(userRankResult as bigint | undefined);
          setUserPoints(userPointsResult);

          if (userPointsResult && userRankResult) {
            const nextRankPoints = BigInt(100) * BigInt(10 ** 18);
            const currentPoints = userPointsResult;
            const progressPercentage = Number(
              (currentPoints * BigInt(100)) / nextRankPoints
            );
            setPercentage(Math.min(progressPercentage, 100));
          }
        }
      }

      await generateLeaderboard();
    } catch (error) {
    } finally {
      setIsLoadingStats(false);
    }
  }, [address, hasNFT, getRank, getPoints, generateLeaderboard]);

  useEffect(() => {
    if (address) {
      refreshAllData();
    }
  }, [address]);

  useEffect(() => {
    if (isTxConfirmed) {
      setTimeout(() => {
        refreshAllData();
      }, 3000);
    }
  }, [isTxConfirmed, refreshAllData]);

  useEffect(() => {
    if (userMinted !== undefined) {
      refreshAllData();
    }
  }, [userMinted, refreshAllData]);

  const currentRank =
    userRank && userRank > 0 && userRank <= BigInt(RANKS.length)
      ? RANKS[Number(userRank) - 1]
      : RANKS[0];

  const handleMintNFT = async (e: any) => {
    try {
      await mintNFT(e);
    } catch (error) {
      console.error("Erreur lors du mint:", error);
    }
  };

  const handleUpgrade = async () => {
    try {
      await upgrade();
    } catch (error) {
      console.error("Erreur lors de l'upgrade:", error);
    }
  };

  useEffect(() => {
    const test = async () => {
      try {
        // const a = await getRankImage(rank);
        // console.log("abbbbb", a);
        const b = await getRankImage(1);
        console.log("abbbbb", b);
      } catch (e) {
        console.log("NOOOOOOOOO");
      }
    };
    test();
  }, [rank, address]);

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-2xl px-9 py-5">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-fit">
              <div className="relative group">
                <div className="w-full rounded-xl overflow-hidden h-[460px] min-w-[350px]">
                  <img
                    src={nftImageUrl || "/hackathon.png"}
                    alt="NFT"
                    className="w-full h-[460px] object-contain transition-transform duration-500 group-hover:scale-105"
                    onLoad={() => console.log("NFT image loaded")}
                    loading="lazy"
                  />
                </div>

                {userRank && userRank > 0 && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <img
                        src={currentRank.image}
                        alt={currentRank.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-bold">
                        Rank {rank?.toString() || 0}
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-xl">
                  <div className="mt-4">
                    {nftMetadata && nftMetadata.attributes ? (
                      <div
                        className="grid grid-cols-2 gap-2 opacity-0 animate-fadeIn"
                        style={{
                          animationDelay: "300ms",
                          animationFillMode: "forwards",
                        }}
                      >
                        {nftMetadata.attributes.map(
                          (attr: any, index: number) => (
                            <div
                              key={index}
                              className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200"
                            >
                              <p className="text-xs text-white/50">
                                {attr.trait_type}
                              </p>
                              <p className="font-medium">{attr.value}</p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      userRank &&
                      userRank > 0 && (
                        <div
                          className="grid grid-cols-2 gap-2 opacity-0 animate-fadeIn"
                          style={{
                            animationDelay: "300ms",
                            animationFillMode: "forwards",
                          }}
                        >
                          <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                            <p className="text-xs text-white/50">Rank</p>
                            <p className="font-medium">{currentRank.name}</p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                            <p className="text-xs text-white/50">Points</p>
                            <p className="font-medium">
                              {points?.toString() || "0"}
                            </p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                            <p className="text-xs text-white/50">Token ID</p>
                            <p className="font-medium">0</p>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                            <p className="text-xs text-white/50">Collection</p>
                            <p className="font-medium">KingNad</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <h3 className="text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {nftMetadata?.name || `KingNad #${0?.toString() || "0"}`}
                  </h3>
                  <p className="text-white/70 mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {nftMetadata?.description ||
                      `A ${currentRank.name} rank NFT in the KingNad collection`}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-base text-white/70 font-medium">
                  Current Mint Price:
                </p>
                <p className="text-2xl text-white font-bold">
                  {mintFee ? Number(mintFee) / 10 ** 18 : "0"} MON
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleMintNFT}
                  disabled={isMinting || userMinted === true || isTxConfirming}
                  className={`flex-1 ${
                    userMinted === true ? "bg-white/10" : "bg-purple"
                  } py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isMinting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Minting...
                    </>
                  ) : (
                    "Mint NFT"
                  )}
                </button>
                <button
                  onClick={handleUpgrade}
                  disabled={!userMinted || isUpgrading || isTxConfirming}
                  className={`flex-1 ${
                    userMinted ? "bg-purple" : "bg-white/10"
                  } py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isUpgrading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Upgrading...
                    </>
                  ) : (
                    "Upgrade"
                  )}
                </button>
              </div>
              {hash && (
                <div className="mt-4 p-3 bg-white/10 rounded-lg">
                  <p className="text-sm">
                    Transaction: {hash.substring(0, 10)}...
                    {hash.substring(hash.length - 8)}
                  </p>
                  {isTxConfirming && (
                    <p className="text-sm text-yellow-400">
                      Confirmation en cours...
                    </p>
                  )}
                  {isTxConfirmed && (
                    <p className="text-sm text-green-400">
                      Transaction confirmée!
                    </p>
                  )}
                  {isTxError && (
                    <p className="text-sm text-red-400">
                      Erreur de transaction
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:w-full ">
              <h2 className="text-4xl font-bold mb-5">Statistics</h2>
              {isLoadingStats ? (
                <StatisticsSkeleton />
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        #{rank?.toString() || "N/A"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Rank
                      </p>
                    </div>
                  </div>
                  <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        {formatNumber(Number(points || 0) / 10 ** 18) || "0"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Points
                      </p>
                    </div>
                  </div>
                  <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        {holders?.length || "0"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Holders
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="flex w-full justify-between mt-6">
                <div className="flex text-white flex-col">
                  <img
                    src={currentRank.image}
                    alt={currentRank.name}
                    className="w-[70px]"
                  />
                  <h1 className="text-3xl font-bold">{currentRank.name}</h1>
                </div>
                <div className="flex text-white flex-col">
                  <img
                    src={nextRank.image}
                    alt={nextRank.name}
                    className="w-[70px] ml-auto"
                  />
                  <h1 className="text-3xl font-bold">{nextRank.name}</h1>
                </div>
              </div>
              <div className="h-5 w-full rounded-full bg-white/10 relative mt-3">
                <div
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div> */}
              <div className="bg-[rgba(255,255,)] rounded-lg shadow mt-10">
                <h2 className="text-3xl font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-base mb-2 text-gray-500 dark:text-gray-400">
                      Total Holders
                    </p>
                    <p className="text-3xl font-bold">
                      {leaderboard?.length || 0}
                    </p>
                  </div>

                  {(Object.keys(LEAGUES) as League[]).map((league) => (
                    <div
                      key={league}
                      className="p-3 rounded-lg h-[95px]"
                      style={{ backgroundColor: `${LEAGUES[league].color}20` }}
                    >
                      <p className="text-base mb-2 text-gray-500 dark:text-gray-400">
                        {LEAGUES[league].name}
                      </p>
                      <p className="text-3xl font-bold">
                        {leaderboard?.filter(
                          (p) =>
                            (p as unknown as { league: League })?.league ===
                            league
                        ).length || 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-2xl">
          <Leaderboard />
        </div>
      </div>
    </main>
  );
};
