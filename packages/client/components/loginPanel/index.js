import { AccountContext } from "@/contexts/account"
import { useContext } from "react"


const LoginPanel = () => {

    const { isConnected, redirectToAuthUrl, logout } = useContext(AccountContext)

    return (
        <div className="my-0.5">

            {!isConnected && (
                <button onClick={() => {
                    redirectToAuthUrl()
                }} className={`inline-flex  justify-center gap-x-1.5 rounded-full bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}>
                    Login
                </button>
            )}

            {isConnected && (
                <button onClick={() => logout()}
                    className={`inline-flex  justify-center gap-x-1.5 rounded-full bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}>
                    Logout
                </button>
            )}

        </div>
    )
}

export default LoginPanel