'use client';
import { useRouter } from "next/navigation";


const Success = () => {
    const router = useRouter();
    
    setTimeout(() => {
        router.push("/");
    }, 4000);

    return (
        <div className="flex text-center justify-center items-center w-full ">
            <h1 className="text-4xl font-bold">Cadastro realizado com sucesso! Aproveite nossos benefícios.</h1>
        </div>
    )
}

export default Success