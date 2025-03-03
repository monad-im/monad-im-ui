import { FontLarge, FontSmall, H2 } from "@/components/fonts";

export const MintPriceSection = () => (
  <section
    className="py-[80px] sm:py-[100px] md:py-[120px] relative overflow-hidden border-y border-borderColor-DARK"
    style={{
      backgroundImage: `url('/layer-3.svg'),url('/layer-4.svg')`,
      backgroundPosition: "center left, right center",
      backgroundSize: "40%, 70%",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundBlendMode: "overlay, overlay",
    }}
  >
    <div className="max-w-[1500px] w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:justify-between mb-10">
        <div className="rounded-2xl w-full lg:w-[550px] border border-borderColor-DARK">
          <img
            src="/pfp-veeno.png"
            className="object-cover h-full w-full rounded-2xl"
            alt="Test Academy"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <H2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white text-center lg:text-left">
            Mint Price Evolution: Dynamic Value Growth
          </H2>
          <FontSmall className="text-base sm:text-lg lg:text-xl text-center lg:text-left">
            Our integrated minting process features a progressive pricing model
            where every new NFT minted increases the cost by 1%. This system
            rewards early adopters while reflecting the growing value of our
            community with every transaction.
          </FontSmall>

          <div className="flex flex-col sm:flex-row gap-10 mt-[30px] sm:mt-[50px]">
            <div className="w-full sm:w-1/2 border-t-2 py-5 border-borderColor">
              <FontLarge className="font-bold mb-3 text-white text-center sm:text-left">
                Accessible
              </FontLarge>
              <FontSmall className="text-base sm:text-lg text-center sm:text-left">
                Our transparent, incremental pricing is designed for
                everyone—from newcomers to seasoned collectors—making it easy to
                see how each mint contributes to the collection&apos;s value.
              </FontSmall>
            </div>
            <div className="w-full sm:w-1/2 border-t-2 py-5 border-borderColor">
              <FontLarge className="font-bold mb-3 text-white text-center sm:text-left">
                Rewarding
              </FontLarge>
              <FontSmall className="text-base sm:text-lg text-center sm:text-left">
                Minting remains open at all times, but early participants
                benefit from lower costs and rewards. Every mint not only boosts
                the overall value but also unlocks new benefits as price
                evolves.
              </FontSmall>
            </div>
          </div>

          <div className="w-full border-t-2 py-5 mt-8 border-borderColor">
            <FontLarge className="font-bold mb-3 text-white text-center lg:text-left">
              Community-Driven
            </FontLarge>
            <FontSmall className="text-base sm:text-lg text-center lg:text-left">
              Watch our ecosystem thrive as each mint adds value to the entire
              community. Engage with fellow collectors, track the mint progress,
              and celebrate the dynamic growth of our shared digital asset
              universe.
            </FontSmall>
          </div>
        </div>
      </div>
    </div>
  </section>
);
