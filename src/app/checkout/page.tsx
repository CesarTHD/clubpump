'use client';
import CustomerForm from "@/components/CustomerForm";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Checkout = () => {
    const router = useRouter();
    
    const onSubmit = () => {
        
    }
    
    return (
        <div>
            <div className="flex justify-center mt-6">
                <CustomerForm onSubmit={onSubmit} />
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