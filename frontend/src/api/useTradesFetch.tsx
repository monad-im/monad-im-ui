"use client";

import { useQuery } from "@tanstack/react-query";

export type EtherscanTx = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

async function fetchTxs(address: string) {
  const res = await fetch(`/api/tx?address=${address}`);
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const data = await res.json();
  return data.result as EtherscanTx[];
}

export function useTxs(address: string) {
  return useQuery({
    queryKey: ["txs", address],
    queryFn: () => fetchTxs(address),
    enabled: !!address,
  });
}
