import { Header } from "@/layouts/header";
import ContextProvider from "@/lib/wagmi/provider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const poppins = Montserrat({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Monad Impress",
  description:
    "Discover a revolutionary NFT experience that evolves with you. Every NFT is uniquely crafted to reflect your personal journey, growing and leveling up as you engage with our platform. Ready to redefine the digital frontier?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ContextProvider cookies={cookies}>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
