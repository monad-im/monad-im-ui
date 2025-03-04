"use client";
import { useTxs } from "@/api/useTradesFetch";
import { useContract } from "@/hooks/useContract";
import { addressFormatter, formatEthers, formatNumber } from "@/utils/format";
import Image from "next/image";
import { useAccount } from "wagmi";

const RANKS = [
  {
    name: "Level 1",
    description: "This is the first level.",
    image: "/ranks/iron.webp",
    rank: 1,
  },
  {
    name: "Level 2",
    description: "This is the second level.",
    image: "/ranks/bronze.webp",
    rank: 2,
  },
  {
    name: "Level 3",
    description: "This is the third level.",
    image: "/ranks/silver.webp",
    rank: 3,
  },
  {
    name: "Level 4",
    description: "This is the fourth level.",
    image: "/ranks/gold.webp",
    rank: 4,
  },
  {
    name: "Level 5",
    description: "This is the fifth level.",
    image: "/ranks/platinum.webp",
    rank: 5,
  },
  {
    name: "Level 6",
    description: "This is the sixth level.",
    image: "/ranks/diamond.webp",
    rank: 6,
  },
  {
    name: "Level 7",
    description: "This is the seventh level.",
    image: "/ranks/master.webp",
    rank: 7,
  },
  {
    name: "Level 8",
    description: "This is the eighth level.",
    image: "/ranks/grand-master.webp",
    rank: 8,
  },
  {
    name: "Level 9",
    description: "This is the ninth level.",
    image: "/ranks/challenger.webp",
    rank: 9,
  },
];

export const MintPage = () => {
  const { address } = useAccount();
  const { data, isLoading, isError, error } = useTxs(address as string);
  const percentage = 50;
  const {
    mintFee,
    holders,
    mintNFT,
    isMinting,
    isTxConfirming,
    isTxConfirmed,
  } = useContract();
  console.log(isMinting, isTxConfirming, isTxConfirmed, holders, mintFee);
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-16 w-full"
      style={{
        backgroundImage: `url('/layer-3.svg'),url('/layer-4.svg')`,
        backgroundPosition: "center left, 0 0",
        backgroundSize: "30%, 100%",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundBlendMode: "overlay, overlay",
      }}
    >
      <div className="max-w-7xl w-[90%] mx-auto text-white">
        <div className="flex w-full">
          <Image
            src="/assets/NFT.png"
            alt="Level 1"
            className="rounded-2xl object-cover"
            width={400}
            height={400}
          />
          <div className="w-full flex flex-col ml-10">
            <div className="w-full flex items-start justify-between">
              <div className="flex w-full flex-col h-[130px]">
                <h2 className="text-3xl font-bold">
                  {addressFormatter(address as string)}
                </h2>
                <div className="flex w-full gap-4 mt-5 mb-5">
                  <button className="bg-[#836EF9] h-[40px] px-4 py-2 rounded-lg">
                    Upgrade NFT
                  </button>
                  <button
                    className="bg-white/10 h-[40px] px-4 py-2 rounded-lg"
                    onClick={mintNFT}
                  >
                    Mint NFT
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h2 className="text-5xl font-bold whitespace-nowrap mb-3">
                  {formatNumber(Number(mintFee) / 10 ** 18)} MON
                </h2>
                <p className="text-2xl font-bold whitespace-nowrap">
                  Current Mint Price
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 rounded-2xl mb-7">
              <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                <div className="flex items-center justify-center flex-col w-full h-full">
                  <h1 className="text-4xl font-bold text-center">#45,594</h1>
                  <p className="text-sm text-white/50 text-center mt-3">
                    Globad Rank
                  </p>
                </div>
              </div>
              <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                <div className="flex items-center justify-center flex-col w-full h-full">
                  <h1 className="text-4xl font-bold text-center">178,939</h1>
                  <p className="text-sm text-white/50 text-center mt-3">
                    Tx Count
                  </p>
                </div>
              </div>
              <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                <div className="flex items-center justify-center flex-col w-full h-full">
                  <h1 className="text-4xl font-bold text-center">123</h1>
                  <p className="text-sm text-white/50 text-center mt-3">
                    NFT Hold
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex text-white flex-col">
                <img
                  src="/ranks/grand-master.webp"
                  alt="Rank"
                  className="w-[70px]"
                />
                <h1 className="text-3xl font-bold">Grand Master</h1>
              </div>
              <div className="flex text-white flex-col">
                <img
                  src="/ranks/challenger.webp"
                  alt="Rank"
                  className="w-[70px] ml-auto"
                />
                <h1 className="text-3xl font-bold">Challenger</h1>
              </div>
            </div>
            <div className="h-5 w-full rounded-full bg-white/10 relative mt-3">
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[rgba(255,255,255,0.05)] -mt-5 rounded-2xl px-9 py-5">
          <div className="flex items-center">
            <Image
              src="/ranks/grand-master.webp"
              alt="Level 1"
              className="rounded-2xl object-cover"
              width={55}
              height={55}
            />
            <h2 className="text-3xl font-bold mb-5 ml-5 mt-3">Leaderboard</h2>
          </div>

          {isError && <p>Error: {(error as Error)?.message}</p>}
          {data?.length > 0 && (
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3">Hash</th>
                    <th className="text-left">From</th>
                    <th className="text-left">To</th>
                    <th className="text-end">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 15).map((tx: any) => (
                    <tr key={tx.hash} className="border-b border-white/10">
                      <td className="p-2 py-6">{addressFormatter(tx.hash)}</td>
                      <td>{addressFormatter(tx.from)}</td>
                      <td>{addressFormatter(tx.to)}</td>
                      <td className="text-end">
                        {formatNumber(Number(formatEthers(tx.value)))} ETH
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {data && data.status === "0" && (
            <p>No transactions found or error code: {data.message}</p>
          )}
        </div>
      </div>
    </main>
  );
};
