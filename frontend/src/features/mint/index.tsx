"use client";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useNFTCard } from "@/hooks/useNFTCard";
import { formatNumber } from "@/utils/format";
import { useAccount } from "wagmi";
import Leaderboard from "./components/leaderboard";
import { Leagues } from "./components/leagues";
import NFTCard from "./components/nft-section";

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
  } = useNFTCard();
  const { leaderboard } = useLeaderboard();

  const user = leaderboard.find((player) => player.address === address);

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-2xl px-9 py-5">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-fit">
              <NFTCard
                player={user}
                onLoad={() => console.log("NFT Card loaded")}
              />
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
                  disabled={isTxConfirming || hasNFT === true || isTxConfirming}
                  className={`flex-1 ${
                    hasNFT === true ? "bg-white/10" : "bg-purple"
                  } py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isTxConfirming ? (
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
                  disabled={!hasNFT || isTxConfirming || isTxConfirming}
                  className={`flex-1 ${
                    hasNFT ? "bg-purple" : "bg-white/10"
                  } py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isTxConfirming ? (
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
                    <p className="text-sm text-yellow-400">Tx pending...</p>
                  )}
                  {isTxConfirmed && (
                    <p className="text-sm text-green-400">Tx confirmed</p>
                  )}
                  {isTxError && (
                    <p className="text-sm text-red-400">Tx failed</p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:w-full">
              <h2 className="text-4xl font-bold mb-5">Statistics</h2>
              {isLoadingStats ? (
                <StatisticsSkeleton />
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-[130px] col-span-1 bg-gradient-to-r p-4 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded-lg">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        #{user?.rank?.toString() || "N/A"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Rank
                      </p>
                    </div>
                  </div>
                  <div className="h-[130px] col-span-1 bg-gradient-to-r p-4 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded-lg">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        {formatNumber(Number(user?.points || 0) / 10 ** 18) ||
                          "0"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Points
                      </p>
                    </div>
                  </div>
                  <div className="h-[130px] col-span-1 bg-gradient-to-r p-4 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded-lg">
                    <div className="flex items-center justify-center flex-col w-full h-full">
                      <h1 className="text-4xl font-bold text-center">
                        {leaderboard?.length || "0"}
                      </h1>
                      <p className="text-sm text-white/50 text-center mt-3">
                        Holders
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <Leagues />
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
