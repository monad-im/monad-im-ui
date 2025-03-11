import { League, LeagueInfo } from "@/hooks/useContract";

export const RANKS = [
  {
    name: "Iron",
    description: "This is the first level.",
    image: "/ranks/iron.webp",
    rank: 8,
  },
  {
    name: "Bronze",
    description: "This is the second level.",
    image: "/ranks/bronze.webp",
    rank: 7,
  },

  {
    name: "Gold",
    description: "This is the fourth level.",
    image: "/ranks/gold.webp",
    rank: 6,
  },
  {
    name: "Platinum",
    description: "This is the fifth level.",
    image: "/ranks/platinum.webp",
    rank: 5,
  },
  {
    name: "Diamond",
    description: "This is the sixth level.",
    image: "/ranks/diamond.webp",
    rank: 4,
  },
  {
    name: "Master",
    description: "This is the seventh level.",
    image: "/ranks/master.webp",
    rank: 3,
  },
  {
    name: "Grand Master",
    description: "This is the eighth level.",
    image: "/ranks/grand-master.webp",
    rank: 2,
  },
  {
    name: "Challenger",
    description: "This is the ninth level.",
    image: "/ranks/challenger.webp",
    rank: 1,
  },
];

export const LEAGUES: Record<League, LeagueInfo> = {
  A: {
    name: "Challenger",
    percentageRange: [0, 19],
    description: "Elite KingNad holders",
    color: "#00FF00",
  },
  B: {
    name: "Diamond",
    percentageRange: [20, 39],
    description: "Premium KingNad holders",
    color: "#FF0000",
  },
  C: {
    name: "Gold",
    percentageRange: [40, 59],
    description: "Veteran KingNad holders",
    color: "#E5E4E2",
  },
  D: {
    name: "Silver",
    percentageRange: [60, 79],
    description: "Skilled KingNad holders",
    color: "#FFC300",
  },
  E: {
    name: "Bronze",
    percentageRange: [80, 100],
    description: "Aspiring KingNad holders",
    color: "#C0C0C0",
  },
};
