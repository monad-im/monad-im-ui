import { League, LeagueInfo } from "@/hooks/useContract";

export type League = "A" | "B" | "C" | "D" | "E";

export interface LeagueInfo {
  name: string;
  percentageRange: [number, number];
  description: string;
  color: string;
  image: string;
}

export const LEAGUES: Record<League, LeagueInfo> = {
  A: {
    name: "Challenger",
    percentageRange: [0, 20],
    description: "Top 20% des holders KingNad",
    color: "#00FF00",
    image: "/ranks/A.png",
  },
  B: {
    name: "Diamond",
    percentageRange: [21, 40],
    description: "Top 21-40% des holders KingNad",
    color: "#FF0000",
    image: "/ranks/B.png",
  },
  C: {
    name: "Gold",
    percentageRange: [41, 60],
    description: "Top 41-60% des holders KingNad",
    color: "#E5E4E2",
    image: "/ranks/C.png",
  },
  D: {
    name: "Silver",
    percentageRange: [61, 80],
    description: "Top 61-80% des holders KingNad",
    color: "#FFC300",
    image: "/ranks/D.png",
  },
  E: {
    name: "Bronze",
    percentageRange: [81, 100],
    description: "Top 81-100% des holders KingNad",
    color: "#C0C0C0",
    image: "/ranks/E.png",
  },
};
