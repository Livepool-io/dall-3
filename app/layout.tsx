import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./wagmi";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DALL-3",
  description: "Decentralised, open source AI models on the Livepeer network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
