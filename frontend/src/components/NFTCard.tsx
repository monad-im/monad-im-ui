"use client";
import { useNFT } from "@/hooks/useNFT";
import { formatNumber } from "@/utils/format";
import { useEffect } from "react";

interface NFTCardProps {
  address: string;
  currentRank?: {
    name: string;
    image: string;
  };
  onLoad?: () => void;
}

const NFTCard = ({ address, currentRank, onLoad }: NFTCardProps) => {
  const { nftData, refreshNFTData } = useNFT(address);
  const { hasNFT, rank, points, imageUrl, metadata, isLoading } = nftData;

  useEffect(() => {
    if (!isLoading && onLoad) {
      onLoad();
    }
  }, [isLoading, onLoad]);

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="w-full rounded-xl overflow-hidden h-[460px] min-w-[350px] bg-black/20">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-white"
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
            </div>
          ) : (
            <img
              src={imageUrl || "/hackathon.png"}
              alt={metadata?.name || "NFT"}
              className="w-full h-[460px] object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {hasNFT && rank && Number(rank) > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              {currentRank?.image && (
                <img
                  src={currentRank.image}
                  alt={currentRank.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-sm font-bold">
                Rank {rank?.toString() || 0}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-xl">
          <div className="mt-4">
            {metadata && metadata.attributes ? (
              <div
                className="grid grid-cols-2 gap-2 opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "forwards",
                }}
              >
                {metadata.attributes.map((attr: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200"
                  >
                    <p className="text-xs text-white/50">{attr.trait_type}</p>
                    <p className="font-medium">{attr.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              hasNFT &&
              rank &&
              Number(rank) > 0 && (
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
                      {currentRank?.name || "Unknown"}
                    </p>
                  </div>
                  <div className="bg-white/10 p-3 bg-red rounded-lg hover:bg-white/15 transition-colors duration-200">
                    <p className="text-xs text-white/50">Points</p>
                    <p className="font-medium">
                      {formatNumber(Number(points || 0) / 10 ** 18) || "0"}
                    </p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors duration-200">
                    <p className="text-xs text-white/50">Token ID</p>
                    <p className="font-medium">
                      {rank ? Number(rank) - 1 : "0"}
                    </p>
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
            {metadata?.name ||
              (hasNFT
                ? `KingNad #${Number(rank || 0)}`
                : "Mint your KingNad NFT")}
          </h3>
          <p className="text-white/70 mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {metadata?.description ||
              (hasNFT
                ? `A ${
                    currentRank?.name || ""
                  } rank NFT in the KingNad collection`
                : "Mint your NFT to join the leaderboard and earn rewards")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
