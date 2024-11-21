"use client";
import Image from "next/image";
import pump from '../../public/assets/pump-small.png'
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { useAuthContext } from "@/context/useAuth";

const Header = () => {
    const router = useRouter();
    const path = usePathname();
    const { user, setUser }: any = useContext(useAuthContext);
    const [isMounted, setIsMounted] = useState(false);


    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("club.userId");
            localStorage.removeItem("club.user");
        }
        setUser(null);
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <header className="md:max-w-[80rem] mx-auto">
            <table className="w-full">
                <thead></thead>
                <tbody>
                    <tr className="flex flex-col md:flex-row items-center justify-between">
                        <td>
                            <h1 className="text-xl">Área do cliente</h1>
                        </td>
                        <td>
                            <button onClick={() => {
                                        if (path !== "/checkout") {
                                            router.push("/home")
                                        } else {
                                            router.push("/");
                                        }
                                    }}
                            // disabled={!user?.email}
                            >
                                <Image src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} alt="Logo Club Pump" width={200} height={100} />
                            </button>
                        </td>
                        {isMounted &&
                        
                            <td className="-mt-16 md:mt-0">
                                {user?.email ? (
                                    <button onClick={() => { logout() }} className="text-blue-400">Fazer logout</button>
                                ) : (
                                    <div className="w-44"></div>
                                )}
                            </td>
                        }
                    </tr>
                </tbody>
            </table>
        </header>
    )
}

export default Header