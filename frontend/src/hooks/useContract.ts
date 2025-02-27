import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/contract";
import { useAccount, useReadContract } from "wagmi";

type ContractReturn = {
  nftInfo: any;
  isNFTLoading: boolean;
};

export const useContract = (): ContractReturn => {
  const { address } = useAccount();

  const { data: nftInfo, isLoading: isNFTLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "players",
    args: address ? [address] : undefined,
  });

  return {
    nftInfo,
    isNFTLoading,
  };
};
