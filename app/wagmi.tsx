"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const wagmiConfig = createConfig(
    getDefaultConfig({
        ssr: true,
        // Your dApps chains
        chains: [arbitrum],
        transports: {
            // RPC URL for each chain
            [arbitrum.id]: http(
                `http://127.0.0.1:8545`,
            ),
        },

        // Required API Keys
        walletConnectProjectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`,

        // Required App Info
        appName: "Dall-3",

        // Optional App Info
        appDescription: "",
        appUrl: "https://dall-3.xyz", // your app's url
        appIcon: "https://dall-3.xyz/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};