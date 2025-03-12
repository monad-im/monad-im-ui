import { League, LEAGUES } from "@/features/mint/constant";
import Image from "next/image";

export const Leagues = () => {
  return (
    <div className="rounded-lg shadow mt-5 sm:mt-10 min-w-[300px] md:min-w-[400px]">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3 lg:mb-5">
        Leagues
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {(Object.keys(LEAGUES) as League[]).map((league) => {
          const info = LEAGUES[league];
          return (
            <div
              key={info.image}
              className="rounded-lg shadow bg-gradient-to-r p-3 lg:p-4 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center mb-2 gap-2">
                <h3 className="font-bold text-xl sm:text-2xl">{info.name} </h3>
                <Image
                  src={info.image}
                  alt={info.name}
                  width={40}
                  height={40}
                  className="object-cover h-8 w-8 lg:h-10 lg:w-10"
                />
              </div>
              <p className="text-base text-white/70 mb-1">{info.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
