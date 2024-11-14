'use client';
import Header from "@/components/Header";
import Invoices from "@/components/Invoices";
import Subscriptions from "@/components/Subscriptions";
import VerificationSubscription from "@/components/VerificationSubscription";
import { useAuthContext } from "@/context/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Home = () => {
    const router = useRouter();
    const { user }: any = useContext(useAuthContext);
    const [isMounted, setIsMounted] = useState(false);
    const [consultant, setConsultant] = useState("");
    const [subscriptions, setSubscriptions]: any = useState([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div>
            <div className="md:max-w-[80rem] mx-auto">
                {isMounted && <h1 className="text-center  mt-16 text-4xl font-semibold">Olá, {user?.name}.</h1>}
                {subscriptions[0]?.custom_variables[0]?.name && (
                    <div className="">
                        <p className="text-center text-lg">Consultor: <span>{subscriptions[0].custom_variables[0].name}</span></p>
                    </div>
                )}
                <VerificationSubscription email={user?.email} setConsultant={setConsultant} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                <div className="my-36 pl-12">
                    <div>
                        <h3 className="text-xl">Opções:</h3>
                        <ul className="mt-2 list-disc pl-8">
                            <li>
                                <button onClick={() => { router.push("/update-card") }} className="text-blue-400">
                                    Trocar cartão de crédito
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home