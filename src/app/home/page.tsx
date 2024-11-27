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
    const [subscriptions, setSubscriptions]: any = useState([]);
    const [firstName, setFirstName]: any = useState("");
    const [lastName, setLastName]: any = useState("");


    useEffect(() => {
        setIsMounted(true);
        if (user?.name) {
            const name = user?.name.split(" ");
            setFirstName(name[0]);
            setLastName(name[1]);
        }
    }, []);

    if(!firstName){
        return (
            <div className="flex w-full justify-center items-center ">
                <p className="text-3xl font-bold">Carregando...</p>
            </div>
        )
    } else {
        return (
            <div>
                <div className="md:max-w-[80rem] mx-auto">
                    {lastName ? (
                        <h1 className="text-center  mt-16 text-4xl font-semibold">Olá, {firstName} {lastName}.</h1>
                    ) : (
                        <h1 className="text-center  mt-16 text-4xl font-semibold">Olá, {firstName}.</h1>
                    )}
                    {subscriptions.length > 0 && subscriptions[0]?.custom_variables?.[0]?.name && (
                        <div>
                            <p className="text-center text-lg">
                                Consultor: <span>{subscriptions[0].custom_variables[0].name}</span>
                            </p>
                        </div>
                    )}
    
                    <VerificationSubscription email={user?.email} userId={user?.id} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                </div>
            </div>
        )
    }
}

export default Home