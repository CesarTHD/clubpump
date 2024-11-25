'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import axios from 'axios';
import CustomerForm from '@/components/CustomerForm';
import CardForm from '@/components/CardForm';
import Success from '@/components/Success';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 1 segundo de loading

        return () => clearTimeout(timer); // Cleanup no unmount
    }, []);

    useEffect(() => {
        if (userId) {
            setStep(2);
        }
    }, [userId]);

    if (isLoading) {
        return (
            <div className='w-full h-96 flex justify-center items-center'>
                <Image
                    src={loadingIcon}
                    width={50}
                    height={50}
                    style={{ animation: "rotate 0.7s linear infinite" }}
                    alt="Loading"
                />
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-center mt-6">
                <div className='flex flex-col md:flex-row justify-center w-full px-4 md:px-16 gap-8 bg-white text-neutral-800 md:py-20'>
                    <div className="flex justify-center w-full md:w-1/2 max-w-[580px] min-h-80">
                        {step === 1 && (
                            <CustomerForm setUserId={setUserId} />
                        )}
                        {step === 2 && (
                            <CardForm userId={userId} setStep={setStep} />
                        )}
                        {step === 3 && (
                            <Success />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex w-full justify-center py-20">
                    <Image src={"https://clubpump.com.br/wp-content/uploads/2019/03/logo-club-pump.jpg"} width={220} height={100} alt="Club Pump" />
                </div>
                <div className="flex w-full justify-center">
                    <Image src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} width={250} height={100} alt="Club Pump" />
                </div>
            </div>
        </div>
    )
}
export default Checkout