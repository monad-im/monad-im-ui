import { League, useContract } from "@/hooks/useContract";
import { addressFormatter, formatNumber } from "@/utils/format";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";
import { LEAGUES } from "../../constant";

const LeagueInfo = ({ league }: { league: League }) => {
  const info = LEAGUES[league];

  return (
    <div className="rounded-lg shadow bg-gradient-to-r p-4 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)]">
      <div className="flex items-center mb-2">
        <div
          className="w-5 h-5 rounded-full mr-2"
          style={{ backgroundColor: info.color }}
        ></div>
        <h3 className="font-bold text-2xl">{info.name} League</h3>
      </div>
      <p className="text-base text-gray-600 dark:text-gray-300 mb-1">
        {info.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Percentiles: {info.percentageRange[0]}% - {info.percentageRange[1]}%
      </p>
    </div>
  );
};

const Leaderboard = () => {
  const { address } = useAccount();
  const {
    leaderboard,
    getLeagueImage,
    isLoadingLeaderboard,
    calculateLeaderboard,
  } = useContract();
  const [activeLeague, setActiveLeague] = useState<League | "ALL">("ALL");

  const filteredLeaderboard = !leaderboard
    ? []
    : activeLeague === "ALL"
    ? leaderboard
    : leaderboard.filter((player) => player.league === activeLeague);

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

  return (
    <div className="gap-5 flex">
      <div className="bg-[rgba(255,255,255,0.05)] rounded-lg shadow p-6 mt-5 min-w-[400px]">
        <h2 className="text-3xl font-bold mb-5">Leagues</h2>
        <div className="space-y-2">
          {(Object.keys(LEAGUES) as League[]).map((league) => (
            <LeagueInfo key={league} league={league} />
          ))}
        </div>
      </div>
      <div className="w-full rounded-2xl p-6 bg-[rgba(255,255,255,0.05)]  mt-5">
        {" "}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <button
            onClick={() => calculateLeaderboard()}
            disabled={isLoadingLeaderboard}
            className="px-4 py-2 bg-purple rounded-lg text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingLeaderboard ? "Loading..." : "Refresh"}
          </button>
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
        {isLoadingLeaderboard ? (
          <LeaderboardSkeleton />
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No holders found</p>
          </div>
        ) : (
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
              {filteredLeaderboard.map((player, index) => (
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
                        {getLeagueImage(player.address) ? (
                          <Image
                            src={getLeagueImage(player.address) || ""}
                            alt={`Rank ${player.rank}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-full"></div>
                        )}
                        <div
                          className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-black text-lg font-bold"
                          style={{ backgroundColor: player.leagueInfo.color }}
                        >
                          {player.league}
                        </div>
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
                        // color: player.league === "A" ? "black" : "white",
                        color: "black",
                      }}
                    >
                      {player.leagueInfo.name}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
