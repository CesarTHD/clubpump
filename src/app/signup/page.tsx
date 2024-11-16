'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "@/types/FormValues";
import loadingIcon from '@/assets/loading.png';
import { useEffect, useState } from "react";
import axios from "axios";

type CustomerFormProps = {
    onSubmit: (data: any) => void;
};

const Signup: React.FC<CustomerFormProps> = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    const [telephone, setTelephone] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');

    // Função para formatar o número do telefone no padrão (89) 9 8888-0456
    const formatPhone = (value: string) => {
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

        if (value.length >= 11) {
            return `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
        } else if (value.length >= 7) {
            return `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
        } else if (value.length >= 3) {
            return `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length >= 2) {
            return `(${value.slice(0, 2)}`;
        } else {
            return value;
        }
    };

    const formatCpfCnpj = (value:any) => {
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 14) value = value.slice(0, 14); // Limita a 14 dígitos

        if (value.length === 11) { // Formato CPF
            return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
        } else if (value.length === 14) { // Formato CNPJ
            return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
        } else {
            return value;
        }
    };

    // Função para manipular a mudança no input
    const handleCpfCnpjChange = (event: any) => {
        const formattedValue = formatCpfCnpj(event.target.value);
        setCpfCnpj(formattedValue);
    };

    // Função para manipular a mudança no input
    const handlePhoneChange = (event: any) => {
        const formattedPhone = formatPhone(event.target.value);
        setTelephone(formattedPhone);
    };


    const submit: SubmitHandler<FormValues> = (data) => {
        onSubmit(data);
    };

    const getConsultants = async () => {
        try {
            const urlApi = `/api/getconsultants`;

            const response = await axios.get(urlApi, {
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            });

            console.log(response);
            
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getConsultants();
    }, []);

    return (
        <div>
            <div className="flex justify-center mt-6">
                <form className='flex flex-col py-20 md:flex-row justify-center w-full px-4 md:px-16 gap-8 bg-white text-neutral-800' onSubmit={handleSubmit(submit)}>
                    <div className='w-full md:w-1/2 border p-8 rounded-lg'>
                        <Fieldset>
                            <Legend><p className='text-2xl'>Dados do assinante</p></Legend>
                            <Text><span className="text-lg">Realize seu cadastro e participe do nosso clube de benefícios.</span></Text>
                            <FieldGroup>
                                <div className='flex flex-col md:flex-row gap-4 mt-8'>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Nome:</p></Label>
                                        <Input
                                            {...register('name.firstName', { required: "Nome é obrigatório" })}
                                            type='text'
                                        />
                                        {errors.name?.firstName && <p className='text-red-500 text-sm'>*{errors.name.firstName.message}</p>}
                                    </Field>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Sobrenome:</p></Label>
                                        <Input
                                            {...register('name.lastName', { required: "Sobrenome é obrigatório" })}
                                            type='text'
                                        />
                                        {errors.name?.lastName && <p className='text-red-500 text-sm'>*{errors.name.lastName.message}</p>}
                                    </Field>
                                </div>
                                <div className='flex flex-col md:flex-row gap-4'>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Email:</p></Label>
                                        <Input
                                            {...register('email', {
                                                required: "Email é obrigatório",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Email inválido"
                                                }
                                            })}
                                            type='email'
                                        />
                                        {errors.email && <p className='text-red-500 text-sm'>*{errors.email.message}</p>}
                                    </Field>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Celular:</p></Label>
                                        <Input
                                            {...register('telephone', {
                                                required: "Celular é obrigatório",
                                                pattern: {
                                                    value: /^\(\d{2}\) \d \d{4}-\d{4}$/,
                                                    message: "Celular inválido (formato: (XX) X XXXX-XXXX)"
                                                }
                                            })}
                                            type="text"
                                            value={telephone}
                                            onChange={handlePhoneChange}
                                            placeholder="(XX) X XXXX-XXXX"
                                        />
                                        {errors.telephone && <p className='text-red-500 text-sm'>*{errors.telephone.message}</p>}
                                    </Field>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>CPF/CNPJ:</p></Label>
                                        <Input
                                            {...register('cpf_cnpj', {
                                                required: "CPF/CNPJ é obrigatório",
                                                pattern: {
                                                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                                    message: "CPF inválido (deve ter 11 dígitos) ou CNPJ inválido (deve ter 14 dígitos)"
                                                }
                                            })}
                                            type="text"
                                            value={cpfCnpj}
                                            onChange={handleCpfCnpjChange}
                                            placeholder="000.000.000-00 ou 00.000.000/0000-00"
                                        />
                                        {errors.cpf_cnpj && <p className='text-red-500 text-sm'>*{errors.cpf_cnpj.message}</p>}
                                    </Field>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Nome do consultor:</p></Label>
                                        <Input
                                            {...register('consultantName', { required: "Nome do consultor é obrigatório" })}
                                            type='text'
                                        />
                                        {errors.consultantName && <p className='text-red-500 text-sm'>*{errors.consultantName.message}</p>}
                                    </Field>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Senha:</p></Label>
                                        <Input
                                            {...register('password', {
                                                required: "Senha é obrigatória",
                                                minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" }
                                            })}
                                            type='password'
                                        />
                                        {errors.password && <p className='text-red-500 text-sm'>*{errors.password.message}</p>}
                                    </Field>
                                    <Field className='w-full'>
                                        <Label><p className='font-semibold text-lg'>Confirmar senha:</p></Label>
                                        <Input
                                            {...register('confirmPassword', {
                                                validate: (value) => value === watch('password') || "Senhas não coincidem"
                                            })}
                                            type='password'
                                        />
                                        {errors.confirmPassword && <p className='text-red-500 text-sm'>*{errors.confirmPassword.message}</p>}
                                    </Field>
                                </div>

                                <div className="pt-4">
                                    <button type='submit' disabled={loading} className='border rounded-lg h-16 w-full text-3xl font-extrabold hover:text-4xl transition-all'>
                                        {!loading ? (
                                            <p>CADASTRE-SE</p>
                                        ) : (
                                            <Image
                                                src={loadingIcon}
                                                width={25}
                                                height={25}
                                                style={{ animation: 'rotate .7s linear infinite' }}
                                                alt="Loading"
                                            />
                                        )}
                                    </button>
                                </div>
                            </FieldGroup>
                        </Fieldset>
                    </div>
                </form>
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

export default Signup