import { FontSmall, H2 } from "@/components/fonts";
import { FC } from "react";

type StatBoxType = {
  value: number | string;
  tag: string;
  description: string;
};

export const BoxStat: FC<StatBoxType> = ({ value, tag, description }) => {
  return (
    <div className="w-1/2">
      <div className="relative w-fit mb-6">
        <H2 className="font-semibold w-fit mt-6 mb-4">{value}</H2>
        <FontSmall className="absolute -top-2 left-[110%] font-semibold text-white">
          ({tag})
        </FontSmall>
      </div>
      <FontSmall className="font-normal max-w-[80%]">{description}</FontSmall>
    </div>
  );
};
