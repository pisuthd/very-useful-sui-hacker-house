'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import LoginPanel from "../loginPanel"


const Header = () => {

    const path = usePathname()

    return (
        <div className="h-[40px] flex flex-row w-full py-2">
            <div className="flex-1">

            </div>
            <div className="flex-1 flex flex-row">
                <div className="mx-auto space-x-[40px] py-2">
                    <Link href="/" className={`  ${path === "/" ? "font-semibold" : "opacity-60 hover:opacity-100"} `}>
                        Dashboard
                    </Link>
                    <Link href="/workbench" className={`  ${path === "/workbench" ? "font-semibold" : "opacity-60 hover:opacity-100"} `}>
                        Workbench
                    </Link>
                    <Link href="/account" className={`  ${path === "/account" ? "font-semibold" : " opacity-60 hover:opacity-100"} `}>
                        Settings
                    </Link>
                </div>
            </div>
            <div className="flex-1 flex justify-center">
                <LoginPanel/> 
            </div>
        </div>
    )
}

export default Header