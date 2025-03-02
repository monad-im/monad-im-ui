import { formatEther } from "viem";

export const addressFormatter = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatEthers = (value: bigint) => {
  return formatEther(value);
};

export const formatNumber = (value: number) => {
  return value.toLocaleString();
};
