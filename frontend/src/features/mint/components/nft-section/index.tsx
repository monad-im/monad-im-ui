"use client";
import { PlayerInfo } from "@/hooks/useLeaderboard";
import { formatNumber } from "@/utils/format";
import { useEffect } from "react";

interface NFTCardProps {
  player: PlayerInfo | undefined;
  onLoad?: () => void;
}

const NFTCard = ({ player, onLoad }: NFTCardProps) => {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="w-full rounded-xl overflow-hidden h-[460px] lg:min-w-[350px] bg-black/20">
          <img
            src={player?.nftImage || "/hackathon.png"}
            alt={player?.leagueInfo?.name || "NFT"}
            className="w-full h-[460px] object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {player?.rank && Number(player?.rank) > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              {player?.leagueInfo?.image && (
                <img
                  src={`/ranks/${player?.league}.png`}
                  alt={player?.leagueInfo?.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-sm font-bold">
                Rank {player?.rank.toString()}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-xl">
          <div className="mt-4">
            <div
              className="grid grid-cols-2 gap-2 opacity-0 animate-fadeIn"
              style={{
                animationDelay: "300ms",
                animationFillMode: "forwards",
              }}
            >
              <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                <p className="text-xs text-white/50">Rank</p>
                <p className="font-medium">
                  {player?.leagueInfo?.name || "Unknown"}
                </p>
              </div>
              <div className="bg-white/10 p-3 bg-red rounded-lg hover:bg-white/15 transition-colors duration-200">
                <p className="text-xs text-white/50">Points</p>
                <p className="font-medium">
                  {formatNumber(Number(player?.points || 0) / 10 ** 18) || "0"}
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                <p className="text-xs text-white/50">Token ID</p>
                <p className="font-medium">
                  {player?.rank ? Number(player?.rank) - 1 : "0"}
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                <p className="text-xs text-white/50">Collection</p>
                <p className="font-medium">KingNad</p>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {player?.leagueInfo?.name ||
              `KingNad #${Number(player?.rank || 0)}`}
          </h3>
          <p className="text-white/70 mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {`A ${
              player?.leagueInfo?.name || ""
            } rank NFT in the KingNad collection`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
