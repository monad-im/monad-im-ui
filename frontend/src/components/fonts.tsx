import { cn } from "@/utils/cn";
import { FC, PropsWithChildren } from "react";

type FontProps = PropsWithChildren & {
  className?: string;
};

export const H2: FC<FontProps> = ({ children, className = "" }) => (
  <h2 className={cn("text-6xl text-white font-bold font-inter", className)}>
    {children}
  </h2>
);

export const FontLarge: FC<FontProps> = ({ children, className = "" }) => (
  <p
    className={cn(
      "text-2xl sm:text-3xl text-white font-semi-bold font-inter",
      className
    )}
  >
    {children}
  </p>
);

export const FontMedium: FC<FontProps> = ({ children, className = "" }) => (
  <p className={cn("text-2xl text-white font-medium font-inter", className)}>
    {children}
  </p>
);

export const FontSmall: FC<FontProps> = ({ children, className = "" }) => (
  <p className={cn("text-xl text-font-80 font-normal font-inter", className)}>
    {children}
  </p>
);
