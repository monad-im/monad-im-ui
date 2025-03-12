import { FontLarge, FontMedium, FontSmall, H2 } from "@/components/fonts";

export const ChallengeSection = () => (
  <section className="py-[100px] sm:py-[150px] relative overflow-hidden">
    <div className="max-w-[1500px] w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-[50px] lg:mb-[0px]">
        <div className="mb-10 lg:mb-[200px] max-w-full lg:max-w-[880px] lg:text-left">
          <H2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[65px] leading-tight font-bold">
            Challenge & Conquer: Ascend the Leaderboard on Monad, From Every
            Transaction to NFT Supremacy
          </H2>
          <FontMedium className="text-base sm:text-lg lg:text-font-70 mt-6 sm:mt-8 lg:mt-10 max-w-full lg:max-w-[600px] leading-normal">
            Engage in dynamic on-chain activities on Monad that boost your rank
            with every transaction. Whether you&apos;re minting, trading, or
            taking on exclusive challenges, each move propels you higher. As you
            climb the leaderboard, unlock powerful upgrades and secure a digital
            legacy that sets you apart.
          </FontMedium>
        </div>
        <img
          src="/kingnadsticker2.png"
          className="w-[300px] sm:w-[400px] lg:w-[500px] lg:mr-[100px] rotate-3d"
          alt="King Card"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-[40px] text-center lg:text-left">
        <div className="w-full lg:w-[500px] bg-secondary border border-borderColor-DARK rounded-2xl lg:h-[330px] p-6 sm:p-8 md:p-10 ">
          <FontLarge className="font-bold mb-3 lg:mb-5 text-white pb-3 lg:pb-5 border-b-2 border-borderColor">
            Dynamic Evolution
          </FontLarge>
          <FontSmall className="text-base sm:text-lg">
            Your NFT transforms as you engage in various on-chain activities on
            Monad, unlocking new levels and exclusive traits over time.
          </FontSmall>
        </div>
        <div className="w-full lg:w-[500px] bg-secondary border border-borderColor-DARK rounded-2xl lg:h-[330px] p-6 sm:p-8 md:p-10 ">
          <FontLarge className="font-bold mb-3 lg:mb-5 text-white pb-3 lg:pb-5 border-b-2 border-borderColor">
            Competitive Leagues
          </FontLarge>
          <FontSmall className="text-base sm:text-lg">
            Climb the ranks by leveling up your NFT through meaningful
            interactions. Each league—from Bronze to higher tiers—reflects your
            growing prowess in Monad ecosystem.
          </FontSmall>
        </div>
        <div className="w-full lg:w-[500px] bg-secondary border border-borderColor-DARK rounded-2xl lg:h-[330px] p-6 sm:p-8 md:p-10 ">
          <FontLarge className="font-bold mb-3 lg:mb-5 text-white pb-3 lg:pb-5 border-b-2 border-borderColor">
            NFT Stealing Mechanic
          </FontLarge>
          <FontSmall className="text-base sm:text-lg">
            Challenge the competition by maximizing your on-chain activity on
            Monad. Every transaction and interaction boosts your rank, allowing
            you to overtake rivals and upgrade your NFT.
          </FontSmall>
        </div>
      </div>
    </div>
  </section>
);
