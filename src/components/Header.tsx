"use client";
import Image from "next/image";
import pump from '../../public/assets/pump-small.png'
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useAuthContext } from "@/context/useAuth";

const Header = () => {
    const router = useRouter();
    const { user, setUser }: any = useContext(useAuthContext);


    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("club.userId");
            localStorage.removeItem("club.user");
        }
        setUser(null);
        // router.push("/");
    }

    return (
        <header className="md:max-w-[80rem] mx-auto">
            <table className="w-full">
                <tbody>
                    <tr className="flex flex-col md:flex-row items-center justify-between">
                        <td>
                            <h1 className="text-xl">Portal do cliente</h1>
                        </td>
                        <td>
                            <button 
                                onClick={() => router.push("/cliente/home")}
                                disabled={!user?.email}
                            >
                                <Image src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} alt="Logo Club Pump" width={200} height={100} />
                            </button>
                        </td>
                        <td className="-mt-16 md:mt-0">
                            {user?.email ? <button onClick={() => { logout() }} className="text-blue-400">Fazer logout</button> : <div className="w-44"></div>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </header>
    )
}

export default Header