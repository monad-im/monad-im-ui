import { PlayerInfo, useLeaderboard } from "@/hooks/useLeaderboard";
import { addressFormatter, formatNumber } from "@/utils/format";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { League, LEAGUES } from "../../constant";

const LeaderboardSkeleton = () => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10">
          <th className="text-left py-3">Rank</th>
          <th className="text-left">Address</th>
          <th className="text-right">Points</th>
          <th className="text-right">League</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr
            key={`leaderboard-skeleton-${index}`}
            className="border-b border-white/10"
          >
            <td className="p-2">
              <div className="flex items-center gap-3">
                <div className="h-5 w-6 bg-white/20 rounded-full animate-pulse"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </td>
            <td>
              <div className="h-5 w-32 bg-white/20 rounded-full animate-pulse"></div>
            </td>
            <td className="text-right">
              <div className="h-5 w-20 bg-white/20 rounded-full animate-pulse ml-auto"></div>
            </td>
            <td className="text-right">
              <div className="h-5 w-24 bg-white/20 rounded-full animate-pulse ml-auto"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Leaderboard = () => {
  const { address } = useAccount();

  const {
    leaderboard,
    activeLeague,
    isLoading: isLoadingLeaderboard,
    setActiveLeague,
    refreshLeaderboard,
  } = useLeaderboard();

  const [localLeaderboard, setLocalLeaderboard] = useState<PlayerInfo[]>([]);
  const loadedImagesRef = useRef(new Map<number, string>());

  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      setLocalLeaderboard(leaderboard);
    }
  }, [leaderboard]);

  const handleRefresh = () => {
    if (!isLoadingLeaderboard) {
      loadedImagesRef.current.clear();
      refreshLeaderboard();
    }
  };

  return (
    <div className="gap-5 flex flex-col md:flex-row">
      <div className="w-full rounded-2xl p-6 bg-[rgba(255,255,255,0.05)] mt-5">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className="text-4xl font-bold">Leaderboard</h2>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleRefresh}
              disabled={isLoadingLeaderboard}
              className="px-4 py-2 bg-purple rounded-lg text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingLeaderboard ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => setActiveLeague("ALL")}
            className={`px-3 py-1 rounded-full text-base font-semibold transition-colors ${
              activeLeague === "ALL"
                ? "bg-[#836EF9] text-white"
                : "bg-white/20 text-white"
            }`}
          >
            All
          </button>
          {(Object.keys(LEAGUES) as League[]).map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className="px-3 py-1 rounded-full text-base font-semibold transition-colors"
              style={{
                backgroundColor:
                  activeLeague === league
                    ? LEAGUES[league].color
                    : "rgba(255,255,255,0.1)",
                color: "white",
              }}
            >
              {LEAGUES[league].name}
            </button>
          ))}
        </div>
        {isLoadingLeaderboard && !localLeaderboard.length ? (
          <LeaderboardSkeleton />
        ) : !localLeaderboard.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No holders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3">Rank</th>
                  <th className="text-left">Address</th>
                  <th className="text-right">Points</th>
                  <th className="text-right">League</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player) => (
                  <tr
                    key={player.address}
                    className={`border-b border-white/10 ${
                      address &&
                      player.address.toLowerCase() === address.toLowerCase()
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <p>{player.rank}</p>
                        <div className="relative w-16 h-16">
                          <Image
                            src={player?.nftImage}
                            alt={`NFT ${player.rank}`}
                            width={64}
                            height={64}
                            className="object-cover rounded-full"
                            unoptimized
                            priority
                            onError={() => {}}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {address &&
                          player.address.toLowerCase() ===
                            address.toLowerCase() && (
                            <span className="bg-[#836EF9] text-xs px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        {addressFormatter(player.address)}
                      </div>
                    </td>
                    <td className="text-right">
                      {formatNumber(
                        Number(player.points) / 10 ** 18
                      )?.toString() || "0"}
                    </td>
                    <td className="text-right">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: player.leagueInfo.color,
                          color: "white",
                        }}
                      >
                        {player.leagueInfo.name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isLoadingLeaderboard && localLeaderboard.length > 0 && (
          <div className="mt-4 text-center py-2 bg-white/5 rounded">
            <span className="text-sm text-white/70 flex items-center justify-center">
              <svg
                className="animate-spin h-4 w-4 mr-2"
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
              Updating leaderboard...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
