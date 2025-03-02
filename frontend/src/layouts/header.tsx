import { WalletConnection } from "@/components/wallet-connector";

export const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <p className="text-3xl font-bold">Monad Impress</p>
        <WalletConnection />
      </div>
    </header>
  );
};
