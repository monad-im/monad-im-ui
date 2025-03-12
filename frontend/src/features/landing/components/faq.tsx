import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { H2 } from "@/components/fonts";

export const FAQSection = () => (
  <div
    id="faq"
    className="w-full flex flex-col items-center py-[40px] sm:py-[60px] lg:py-[100px]"
  >
    <div className="w-[90%] max-w-[1200px] mx-auto">
      <H2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-[40px] sm:mb-[100px] text-white text-center">
        Frequently <span className="text-base_color">Asked</span> Questions
      </H2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            What is Monad Impress?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Monad Impress is an evolving NFT ecosystem where each NFT adapts and
            grows based on your experience on the platform. As you interact,
            your NFT advances through different tiers—much like Bronze, Silver,
            Gold, etc.—reflecting your progress and achievements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            How does the minting mechanism work?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Our minting process is continuous, with a dynamic pricing model.
            Every time an NFT is minted, the price increases by 1% compared to
            the previous mint. This rewards early adopters with lower costs and
            gradually increases the overall value of the collection.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            What is the NFT stealing mechanic?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Our system is all about dynamic competition. Each user&apos;s NFT is
            ranked based on their performance—think of it as a leaderboard
            measured by transactions (TX). For instance, if User 1 has 1000 TX
            and User 2 has 990 TX, User 1 holds the higher position. However,
            once User 2 boosts their TX count to 1100, they overtake User 1 and
            claim the higher-ranked NFT. The displaced NFT then moves down the
            rankings. This mechanic ensures that every improvement directly
            impacts your NFT’s position, keeping the competition active and
            engaging for all participants.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            How does my NFT evolve?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Your on-chain activity directly impacts your ranking within our
            ecosystem. By engaging in transactions, purchasing NFTs, and
            participating in other on-chain activities, you earn rank points
            that reflect your overall engagement. As your rank improves,
            you&apos;ll unlock the ability to upgrade your NFT—allowing you to
            climb the leaderboard and secure a superior digital asset. This
            dynamic system rewards active participation and ensures that every
            action contributes to your journey toward a higher-tier NFT.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            What are the benefits of being an early adopter?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Minting early allows you to secure a lower entry price before the
            cost begins to climb. Additionally, early participants can access
            exclusive rewards and enjoy the potential for greater appreciation
            as the project grows.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            Can I mint NFTs at any time?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            Yes, minting is always open. However, remember that with each new
            mint, the price will increase by 1%, so the entry cost will
            gradually rise over time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-lg sm:text-xl text-base_color">
            Where can I get help or ask questions?
          </AccordionTrigger>
          <AccordionContent className="text-base sm:text-lg text-white">
            If you need assistance or have any questions, join our community on
            Discord, follow us on Twitter for the latest updates, or visit our
            help center for more detailed information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);
