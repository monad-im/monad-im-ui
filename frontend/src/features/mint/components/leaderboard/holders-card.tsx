import { PlayerRankInfo, useContract } from "@/hooks/useContract";
import { addressFormatter, formatNumber } from "@/utils/format";
import Image from "next/image";

type Props = {
  holder: PlayerRankInfo;
  highlight?: boolean;
};

export const HoldersCard = ({ holder, highlight = false }: Props) => {
  const { getLeagueImage } = useContract();
  const imageUrl = getLeagueImage(holder.address);
  console.log("holder", holder);
  return (
    <div
      className={`flex items-center p-4 rounded-lg mb-2 ${
        highlight
          ? "bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] shadow-lg"
          : "bg-[rgba(255,255,255,0.05)] shadow"
      } border border-[rgba(255,255,255,0.05)]`}
    >
      <div className="flex-shrink-0 mr-4 relative">
        <div className="h-16 w-16 overflow-hidden bg-gray-200 dark:bg-gray-700">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Rank ${holder.rank}`}
              width={64}
              height={64}
              className="object-cover"
            />
          )}
        </div>
        <div
          className="absolute -top-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-base"
          style={{ backgroundColor: holder?.leagueInfo?.color }}
        >
          {Number(holder.rank)}
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-sm text-white/70">
            {addressFormatter(holder.address)}
          </h3>
          <span className="text-xl text-white">
            Rank #{Number(holder.rank)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-2xl">
            <span className="font-bold mr-1">
              {formatNumber(Number((holder?.points as BigInt) || 0) / 10 ** 18)}
            </span>
            <span className="text-white/50 text-xs">points</span>
          </div>

          <div
            className="text-base px-4 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: holder.leagueInfo?.color,
              //   color: holder.league === "A" ? "black" : "white",
              color: "black",
            }}
          >
            {holder.leagueInfo?.name}
          </div>
        </div>
      </div>
    </div>
  );
};
