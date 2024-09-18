'use client';
import { useAuthContext } from "@/context/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Button } from '@/components/catalyst-ui-kit/button';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "@/components/Header";
import { FormValues } from "@/types/FormValues";


const UpdateCard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    const userId = searchParams?.get("userId");
    const invoiceId = searchParams?.get("invoiceId");

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setError("");
        try {
            const cardToken = await axios.get(`/api/tokenizecard?dataCard=${JSON.stringify(data)}`, {
                headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
            });
            console.log(cardToken.data.card.id);

            try {
                const methodPay = await axios.get(`/api/newmethodpay?userId=${userId}&cardToken=${cardToken.data.card.id}`, {
                    headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
                })
                console.log(methodPay.data.id);

                const invoice = await axios.get(`/api/newinvoice?invoiceId=${invoiceId}`, {
                    headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
                })


            } catch (err) {
                setLoading(false);
                setError("Erro ao efetuar cadastro.");
                console.log(err);
            } finally {
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            setError("Erro ao efetuar cadastro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-16 bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto">
                <div className='border rounded-lg p-8'>
                    <table className='w-full'>
                        <thead className='font-semibold text-lg'>
                            <tr>
                                <td className='w-[70%]'>
                                    <p>Produto</p>
                                </td>
                                <td>
                                    <p>Subtotal</p>
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='w-[70%]'>
                                    <p>Assinatura Club Pump Cashback - Assine x6</p>
                                </td>
                                <td>
                                    <p>R$ 19,95 / mês</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='border rounded-lg p-8 mt-8'>
                    <Fieldset>
                        <Legend><p className='text-xl '>Informações de pagamento</p></Legend>
                        <Text>Informe os dados de cartão de crédito para ativar sua assinatura.</Text>
                        <div className='mt-4'>
                            <Field>
                                <Label><p className=''>Número do cartão de crédito:</p></Label>
                                <Input {...register('number', {
                                    required: "Número do cartão é obrigatório",
                                    minLength: { value: 16, message: "O cartão deve ter 16 dígitos" },
                                    maxLength: { value: 16, message: "O cartão deve ter 16 dígitos" },
                                    pattern: { value: /^[0-9]+$/, message: "Somente números são permitidos" }
                                })} type='text' placeholder='0000 0000 0000 0000' />
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
                                <Input {...register('expiration', {
                                    required: "Data de vencimento é obrigatória",
                                    pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Formato inválido (MM/AA)" }
                                })} type='text' placeholder='MM/AAAA' />
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
                            Ao clicar no botão “Assine agora” abaixo,
                            você concorda com nosso <a className='text-blue-400' href="#" target='_blank'>TERMO DE USO</a> e aceita que a Pump
                            renove automaticamente sua assinatura e cobre o
                            preço da assinatura (atualmente R$19,95/mês).
                        </p>
                        <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
                            ASSINE AGORA!
                        </button>
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