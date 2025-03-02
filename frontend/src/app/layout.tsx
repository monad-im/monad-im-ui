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
  title: "Monad Tiles",
  description: "Monad tiles is a web3 game aiming to stress the Monad testnet.",
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
