import { League } from "@/hooks/useContract";
import { LEAGUES } from "../../constant";

type Props = {
  activeLeague: League | "ALL";
  setActiveLeague: (league: League | "ALL") => void;
};

export const HoldersFilter = ({ activeLeague, setActiveLeague }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <button
        onClick={() => setActiveLeague("ALL")}
        className={`px-3 py-1 rounded-full text-sm font-bold ${
          activeLeague === "ALL"
            ? "bg-[#836EF9] text-white"
            : "bg-gray text-white"
        }`}
      >
        All
      </button>

      {(Object.keys(LEAGUES) as League[]).map((league) => (
        <button
          key={league}
          onClick={() => setActiveLeague(league)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeLeague === league
              ? "text-white"
              : "text-gray-700 hover:bg-gray-300"
          }`}
          style={{
            backgroundColor:
              activeLeague === league
                ? LEAGUES[league].color
                : "rgb(229, 231, 235)",
            color:
              league === "A" && activeLeague === league
                ? "black"
                : activeLeague === league
                ? "white"
                : "black",
          }}
        >
          {LEAGUES[league].name}
        </button>
      ))}
    </div>
  );
};
