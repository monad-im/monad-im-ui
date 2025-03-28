"use client";
import { FontMedium, H2 } from "@/components/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { LuExternalLink } from "react-icons/lu";
import { ChallengeSection } from "./components/challenge";
import { FAQSection } from "./components/faq";
import { MintPriceSection } from "./components/mint-price";

const LandingPage: FC = () => {
  const router = useRouter();
  return (
    <main>
      <section
        className="py-[60px] sm:py-[180px] w-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('/layer-3.svg'),url('/layer-4.svg')`,
          backgroundPosition: "center left, 0 0",
          backgroundSize: "30%, 100%",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundBlendMode: "overlay, overlay",
        }}
      >
        <div className="flex max-w-[1500px] w-[90%] items-center justify-between mx-auto z-[100]">
          <div className="w-full flex flex-col items-center">
            <H2 className="text-4xl sm:text-6xl leading-tight text-center font-bold sm:max-w-[1050px]">
              Evolve, Compete, Conquer: Your Unique Monad NFT Journey Begins
              Here
            </H2>
            <FontMedium className="text-font-70 text-base sm:text-xl text-center mt-5 sm:mt-10 max-w-[90%] sm:max-w-[750px] leading-normal">
              Discover a revolutionary NFT experience that evolves with you.
              Every NFT is uniquely crafted to reflect your personal journey,
              growing and leveling up as you engage with our platform. Ready to
              redefine the digital frontier?
            </FontMedium>
            <div className="flex sm:flex-row flex-col items-center gap-4">
              <button
                onClick={() => router.push("/mint")}
                className="mt-7 lg:mt-[50px] h-[40px] sm:h-[45px] md:h-[50px] px-2 sm:px-3 lg:px-4 rounded-lg
              hover:bg-[#52449a] hover:scale-[103%] transition-all duration-300 mx-auto text-white font-bold text-sm sm:text-lg cursor-pointer bg-[#29224e]"
              >
                <div className="flex items-center justify-center w-full text-sm sm:text-sm lg:text-lg h-full px-3 sm:px-4 lg:px-5 py-1 sm:py-2 lg:py-2.5">
                  Mint NFT
                </div>
              </button>
              <button
                className="sm:mt-7 lg:mt-[50px] h-[40px] min-w-[100px] sm:h-[45px] md:h-[50px] px-2 sm:px-3 lg:px-4 rounded-lg
              hover:bg-[#52449a] hover:scale-[103%] transition-all duration-300 mx-auto text-white font-bold text-sm sm:text-lg cursor-pointer bg-[#29224e]"
              >
                <Link
                  href="https://testnet.monadexplorer.com/token/0xd4F3ACBf68c078101E4E3a771697b2c21f5568E9"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block"
                >
                  Explorer <LuExternalLink className="inline-block" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="relative overflow-x-hidden">
        <ChallengeSection />
        <img
          src="/layers/test-4.png"
          className="absolute scale-x-[-1] -rotate-45 h-[250vh] -top-[80vh] object-contain -left-[20%]"
        />
        <MintPriceSection />
        <FAQSection />
      </div>
    </main>
  );
};

export default LandingPage;
