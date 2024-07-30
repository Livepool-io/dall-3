"use client"

import { useState } from 'react'
import { ResponsiveDrawer } from '@/components/ui/ResponsiveDrawer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Loader2, Send } from 'lucide-react'
import { GATEWAY_ADDRESS } from '@/lib/balanceService'

export function DonationDrawer() {
    const [amount, setAmount] = useState('')
    const { address } = useAccount()

    const { sendTransaction, data: hash } = useSendTransaction()

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const handleDonate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount) return
        sendTransaction({
            to: GATEWAY_ADDRESS,
            value: parseEther(amount),
        })
    }

    return (
        <ResponsiveDrawer
            trigger={
                <span className="text-green-400 hover:text-green-200 font-semibold">donating</span>
            }
        >
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-green-400">Donate ETH</h2>
                <p className="text-gray-300">Support our project by donating ETH. Every contribution helps!</p>

                <form onSubmit={handleDonate} className="space-y-4">
                    <div className="relative">
                        <Input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-12 bg-gray-700 border-gray-600 text-white h-16 rounded-xl text-lg"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <img src="/eth-logo.png" alt="ETH" className="h-6 w-6" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-400 hover:bg-green-200 transition-all duration-200 rounded-xl py-6 text-lg font-semibold" disabled={!amount || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Confirming...
                            </>
                        ) : (
                            <>
                                {"Donate 🖤"}
                            </>
                        )}
                    </Button>
                </form>

                {isSuccess && (
                    <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-md p-4">
                        <p className="text-green-400">Thank you for your donation!</p>
                    </div>
                )}

                {!address && (
                    <p className="text-yellow-500">Please connect your wallet to donate.</p>
                )}
            </div>
        </ResponsiveDrawer >
    )
}

export default DonationDrawer