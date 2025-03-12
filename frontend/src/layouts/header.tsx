import { WalletConnection } from "@/components/wallet-connector";
import Image from "next/image";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <Image
          src="/kingnadslogo.png"
          alt="KingNads"
          width={160}
          height={120}
          className="w-[120px] lg:w-[160px] h-auto"
        />
        <div className="flex items-center gap-7 text-lg">
          <Link
            href="https://testnet.monadexplorer.com/token/0xd4F3ACBf68c078101E4E3a771697b2c21f5568E9"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:block"
          >
            Explorer <LuExternalLink className="inline-block" />
          </Link>
          <WalletConnection />
        </div>
      </div>
    </header>
  );
};
