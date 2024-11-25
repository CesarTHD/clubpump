'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Field, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import { useForm } from "react-hook-form";
import axios from "axios";
import { FormValues } from "@/types/FormValues";


const UpdateCard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cardDisplay, setCardDisplay] = useState("");
    const [expirationDisplay, setExpirationDisplay] = useState("");
    const [success, setSuccess] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();

    const userId = searchParams?.get("userId");
    const invoiceId = searchParams?.get("invoiceId");

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setError("");
        try {
            const cardToken = await axios.get(`/api/tokenizecard?dataCard=${JSON.stringify(data)}`, {
                headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
            });

            try {
                let invoice;
                const methodPay = await axios.get(`/api/newmethodpay?userId=${userId}&cardToken=${cardToken.data.card.id}`, {
                    headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
                })

                if (invoiceId) {
                    invoice = await axios.get(`/api/newinvoice?invoiceId=${invoiceId}`, {
                        headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
                    });
                }

                setSuccess(true);
            } catch (err) {
                setLoading(false);
                setError("Erro ao atualizar método de pagamento, verifique os dados do cartão de crédito.");
            } finally {
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            setError("Erro ao atualizar método de pagamento, verifique os dados do cartão de crédito.");
        } finally {
            setLoading(false);
        }
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

        // Limita a entrada a no máximo 16 dígitos sem espaços
        if (rawValue.length > 16) return;

        // Formata o valor com espaços a cada 4 dígitos
        const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaços a cada 4 dígitos
        setCardDisplay(formattedValue); // Atualiza a exibição formatada do input
    };

    const handleExpirationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

        // Limita a entrada a no máximo 6 dígitos (MMYYYY)
        if (rawValue.length > 6) return;

        // Adiciona a barra automaticamente após o mês (primeiros 2 dígitos)
        if (rawValue.length >= 3) {
            rawValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
        }

        setExpirationDisplay(rawValue); // Atualiza o valor do input formatado
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                router.push("/home");
            }, 5000);
        }
    }, [success]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingScreen(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loadingScreen) {
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
        <div className="pt-16 bg-white text-black">
            {success && (
                <div className='bg-black text-white bg-opacity-80 flex text-center justify-center items-center absolute top-0 w-full h-[100vh] z-50'>
                    <h1 className='text-3xl font-bold'>Assinatura efetivada com sucesso! Aproveite nossos benefícios.</h1>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto">
                <div className='border rounded-lg p-8 mt-8'>
                    <Fieldset>
                        <Legend><p className='text-xl '>Informações de pagamento</p></Legend>
                        <Text>Informe os dados de cartão de crédito para ativar sua assinatura.</Text>
                        <div className='mt-4'>
                            <Field>
                                <Label><p className=''>Número do cartão de crédito:</p></Label>
                                <Input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    {...register('number', {
                                        required: "Número do cartão é obrigatório",
                                        minLength: { value: 19, message: "O cartão deve ter 16 dígitos" },
                                        maxLength: { value: 19, message: "O cartão deve ter 16 dígitos" },
                                        pattern: { value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, message: "Formato inválido" }
                                    })}
                                    value={cardDisplay} // Exibe o valor formatado
                                    onChange={handleCardInputChange}
                                />

                                {errors.number && <p className='text-red-500 text-sm'>*{errors.number.message}</p>}
                            </Field>
                        </div>
                        <div className='mt-4'>
                            <Field>
                                <Label><p className=''>Nome impresso no cartão:</p></Label>
                                <Input {...register('name.firstName', { required: "Nome é obrigatório" })} type='text' />
                                {errors.name?.firstName && <p className='text-red-500 text-sm'>*{errors.name.firstName.message}</p>}
                            </Field>
                        </div>
                        <div className='mt-4 flex gap-4'>
                            <Field className='w-full'>
                                <Label><p className=''>Data de vencimento:</p></Label>
                                <Input
                                    {...register('expiration', {
                                        required: "Data de vencimento é obrigatória",
                                        pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{4})$/, message: "Formato inválido (MM/AAAA)" }
                                    })}
                                    type="text"
                                    placeholder="MM/AAAA"
                                    value={expirationDisplay} // Exibe o valor formatado
                                    onChange={handleExpirationInputChange}
                                />
                                {errors.expiration && <p className='text-red-500 text-sm'>*{errors.expiration.message}</p>}
                            </Field>
                            <Field className='w-full'>
                                <Label><p className=''>Código de segurança:</p></Label>
                                <Input {...register('cvv', {
                                    required: "CVV é obrigatório",
                                    minLength: { value: 3, message: "CVV deve ter no mínimo 3 dígitos" },
                                    maxLength: { value: 4, message: "CVV deve ter no máximo 4 dígitos" },
                                    pattern: { value: /^[0-9]+$/, message: "Somente números são permitidos" }
                                })} type='current-password' />
                                {errors.cvv && <p className='text-red-500 text-sm'>*{errors.cvv.message}</p>}
                            </Field>
                        </div>
                        <p className='mt-6 text-xs leading-4'>
                            Ao clicar no botão “Atualizar cartão” abaixo,
                            você concorda com nosso <a className='text-blue-400' href="#" target='_blank'>TERMO DE USO</a> e aceita que a Pump
                            renove automaticamente sua assinatura e cobre o
                            preço da assinatura (atualmente R$19,95/mês).
                        </p>
                        {!loading ? (
                            <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
                                ATUALIZAR CARTÃO
                            </button>
                        ) : (
                            <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
                                <div className='flex justify-center'>
                                    <Image
                                        src={loadingIcon}
                                        width={25}
                                        height={25}
                                        style={{ animation: 'rotate .7s linear infinite' }}
                                        alt="Loading"
                                    />
                                </div>
                            </button>
                        )}
                        {error && <p className="text-sm text-red-600 mt-4">* {error}</p>}
                    </Fieldset>
                </div>
            </form>

            <div className="h-44">

            </div>

            <div className="flex flex-col md:flex-row bg-black">
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

export default UpdateCard