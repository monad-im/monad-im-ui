import { FontLarge, FontSmall } from "@/components/fonts";
import Image from "next/image";
import { FC } from "react";

type BoxInsightType = {
  title: string;
  description: string;
  icon: string;
  index: number;
};

export const BoxInsight: FC<BoxInsightType> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-secondary border border-borderColor-DARK rounded-2xl h-fit p-6 sm:p-8 md:p-10 flex flex-col items-center w-full">
      <Image
        height={80}
        width={80}
        src={icon}
        alt={`${title} icon`}
        className="object-cover min-h-[80px] w-auto max-h-[80px]"
      />
      <FontLarge className="font-semibold mt-6 mb-4 text-center">{title}</FontLarge>
      <FontSmall className="font-normal text-center text-sm sm:text-base line-clamp-3">
        {description}
      </FontSmall>
    </div>
  );
};
