"use client"
import useGatewayBalance from '@/lib/balanceService'
import { formatEther } from 'viem'

export const Footer = () => {
    const gateWayBalance = useGatewayBalance();
    return (
        <footer className="my-4 min-w-full justify-center gap-4">
            <div className="text-center mb-8">
                <p className="text-gray-400">{"This is a free, open source project. It is funded entirely by donatations 💚"}</p>
                <p className="text-gray-400">{`The gateway currently has ${formatEther(0n)} ETH remaining`}</p>
                <p className="text-gray-400">Please consider <span className="text-green-400 hover:text-green-200 font-semibold">donating</span> or <span className="text-green-400 hover:text-green-200 font-semibold">staking LPT</span> to support this service</p>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <div className="text-2xl text-center text-gray-500 text-center">powered by</div> <img src="/livepeer.svg" alt="Livepeer" width={100} height={100} />
            </div>
        </footer>
    )
}