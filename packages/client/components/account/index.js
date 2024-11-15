"use client"

import { AccountContext } from "@/contexts/account"
import { useContext, useEffect, useState } from "react"


const AccountContainer = () => {

    const [balance, setBalance ] = useState(0)

    const { isConnected, address, user, getBalance } = useContext(AccountContext)

    useEffect(() => {
        isConnected && getBalance().then(setBalance)
    },[isConnected])

    return (
        <>
            <div className="w-full max-w-lg mx-auto bg-neutral-800 rounded-lg p-4 py-8 mt-[20px] min-h-[250px] flex flex-col">
 
                {!isConnected && (
                    <div className="m-auto text-center">
                        You are not logged in. Please log in and try again.
                    </div>
                )}

                {isConnected && (
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col">
                            <h2 className="text-sm mb-2 text-neutral-400">Email address</h2>
                            <input disabled value={user && user.email} className="h-[40px] px-2 rounded bg-neutral-700 "/>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-sm mb-2 text-neutral-400">Wallet address</h2>
                            <input disabled value={address || "0x0"} className="h-[40px] px-2 rounded bg-neutral-700 "/>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-sm mb-2 text-neutral-400">Network</h2>
                            <input disabled value={"SUI Testnet"} className="h-[40px] px-2 rounded bg-neutral-700 "/>
                        </div>
                         <div className="text-xs text-neutral-400 mt-2">
                            Balance: {(balance).toLocaleString()} SUI 
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default AccountContainer