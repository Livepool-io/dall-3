"use client"
import useGatewayBalance from '@/lib/balanceService'
import { formatEther } from 'viem'
import { ResponsiveDrawer } from './ui/ResponsiveDrawer'
import DonationDrawer from './Donations'
export const Footer = () => {
    const gateWayBalance = useGatewayBalance();
    return (
        <footer className="my-4 min-w-full justify-center gap-4">
            <div className="text-center mb-8">
                <p className="text-gray-400">{"This is a free, open source project. It is funded entirely by donatations 💚"}</p>
                <p className="text-gray-400">{`The gateway currently has ${formatEther(0n)} ETH remaining`}</p>
                <p className="text-gray-400">Please consider
                    &nbsp;<DonationDrawer />&nbsp;
                    or
                    &nbsp;<a href="https://explorer.livepeer.org/accounts/0xf4e8ef0763bcb2b1af693f5970a00050a6ac7e1b/orchestrating" target="_blank">
                        <span className="text-green-400 hover:text-green-200 font-semibold">staking LPT</span>
                    </a>&nbsp;
                    to support this service</p>
                <br />
                <p className="text-green-300 text-sm">Running in off-chain mode on Livepool</p>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <div className="text-2xl text-center text-gray-500 text-center">powered by</div> <img src="/livepeer.svg" alt="Livepeer" width={100} height={100} />
            </div>
        </footer>
    )
}