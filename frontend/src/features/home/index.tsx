"use client";
import { useTxs } from "@/api/useTradesFetch";
import { addressFormatter, formatEthers, formatNumber } from "@/utils/format";
import Image from "next/image";
import { useAccount } from "wagmi";

export const HomePage = () => {
  const { address } = useAccount();
  const { data, isLoading, isError, error } = useTxs(address as string);
  const percentage = 50;
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
        <div className="flex w-full mb-10">
          <Image
            src="/lvl.png"
            alt="Level 1"
            className="rounded-2xl object-cover"
            width={400}
            height={400}
          />
          <div className="w-full flex flex-col ml-10">
            <div className="flex w-full flex-col h-[130px]">
              <h2 className="text-3xl font-bold">
                {addressFormatter(address as string)}
              </h2>
              <div className="flex w-full gap-4 mt-5 mb-5">
                <button className="bg-[#836EF9] h-[40px] px-4 py-2 rounded-lg">
                  Upgrade NFT
                </button>
                <button className="bg-white/10 h-[40px] px-4 py-2 rounded-lg">
                  Mint NFT
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 rounded-2xl mb-7">
              <div className="h-[130px] col-span-1 bg-white/10 rounded-2xl">
                <div className="flex items-center justify-center flex-col w-full h-full">
                  <h1 className="text-4xl font-bold text-center">60/100</h1>
                  <p className="text-sm text-white/50 text-center mt-3">
                    Current Grade
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
                <h1 className="text-4xl font-bold">Level 1</h1>
                <p className="text-sm text-white/50">
                  This is the first level.
                </p>
              </div>
              <div className="flex text-white flex-col">
                <h1 className="text-4xl font-bold text-end">Level 2</h1>
                <p className="text-sm text-white/50 text-end">
                  This is the second level.
                </p>
              </div>
            </div>
            <div className="h-5 w-full rounded-full bg-white/10 relative mt-6">
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {isError && <p>Error: {(error as Error)?.message}</p>}
          {data?.length > 0 && (
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th>Hash</th>
                    <th>From</th>
                    <th>To</th>
                    <th className="text-end">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 15).map((tx: any) => (
                    <tr key={tx.hash} className="border-b border-white/10">
                      <td className="p-2">{addressFormatter(tx.hash)}</td>
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
