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
    return (
        <div>
            <div className="md:max-w-[80rem] mx-auto">
                <VerificationSubscription email={user?.email} />
                    {/* <div>
                        <Invoices />
                        <div className="h-12">

                        </div>
                        <Subscriptions />
                    </div> */}
                    <div className="mt-24 pl-12">
                    <h3 className="text-xl">Opções:</h3>
                    <ul className="mt-2 list-disc pl-8">
                        <li>
                            <button onClick={() => { router.push("/cliente/update-card") }} className="text-blue-400">
                                Trocar cartão de crédito
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home