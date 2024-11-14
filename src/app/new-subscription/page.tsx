'use client';
import { FormValues } from '@/types/FormValues';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Button } from '@/components/catalyst-ui-kit/button';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import axios from 'axios';

const CustomerForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId");

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
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
        });

        console.log(methodPay.data.id);

        await axios.get(`/api/newsubscription?userId=${userId}`, {
          headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
        });

        router.push("/home");
      } catch (err) {
        setError("Erro ao emitir nova fatura.");
        router.push("/home");
      }
    } catch (error) {
      setError("Erro ao emitir nova fatura.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className='flex flex-col md:flex-row justify-center w-full px-4 md:px-16 gap-8 bg-white text-neutral-800 py-20' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex flex-col w-full md:w-1/3'>
          <div className='border rounded-lg p-8'>
            <table className='w-full'>
              <thead className='font-semibold text-lg'>
                <tr>
                  <td className='w-[60%]'>
                    <p>Produto</p>
                  </td>
                  <td>
                    <p>Subtotal</p>
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='w-[60%]'>
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
              <Legend><span className='text-xl '>Informações de pagamento</span></Legend>
              <Text>Informe os dados de cartão de crédito para ativar sua assinatura.</Text>
              <div className='mt-4'>
                <Field>
                  <Label><span className=''>Número do cartão de crédito:</span></Label>
                  <Input
                    {...register('number', {
                      required: "Número do cartão é obrigatório",
                      minLength: { value: 16, message: "O cartão deve ter 16 dígitos" },
                      maxLength: { value: 16, message: "O cartão deve ter 16 dígitos" },
                      pattern: { value: /^[0-9]+$/, message: "Somente números são permitidos" }
                    })}
                    type='text'
                    placeholder='0000 0000 0000 0000'
                  />
                  {errors.number && <p className='text-red-500 text-sm'>*{errors.number.message}</p>}
                </Field>
              </div>
              <div className='mt-4'>
                <Field>
                  <Label><span className=''>Nome impresso no cartão:</span></Label>
                  <Input
                    {...register('name.firstName', { required: "Nome é obrigatório" })}
                    type='text'
                  />
                  {errors.name?.firstName && <p className='text-red-500 text-sm'>*{errors.name.firstName.message}</p>}
                </Field>
              </div>
              <div className='mt-4 flex gap-4'>
                <Field className='w-full'>
                  <Label><span className=''>Data de vencimento:</span></Label>
                  <Input
                    {...register('expiration', {
                      required: "Data de vencimento é obrigatória",
                      pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Formato inválido (MM/AA)" }
                    })}
                    type='text'
                    placeholder='MM/AA'
                  />
                  {errors.expiration && <p className='text-red-500 text-sm'>*{errors.expiration.message}</p>}
                </Field>
                <Field className='w-full'>
                  <Label><span className=''>Código de segurança:</span></Label>
                  <Input
                    {...register('cvv', {
                      required: "CVV é obrigatório",
                      minLength: { value: 3, message: "CVV deve ter no mínimo 3 dígitos" },
                      maxLength: { value: 4, message: "CVV deve ter no máximo 4 dígitos" },
                      pattern: { value: /^[0-9]+$/, message: "Somente números são permitidos" }
                    })}
                    type='current-password'
                  />
                  {errors.cvv && <p className='text-red-500 text-sm'>*{errors.cvv.message}</p>}
                </Field>
              </div>
              <p className='mt-6 text-xs leading-4'>
                Ao clicar no botão “Assine agora” abaixo,
                você concorda com nosso <a className='text-blue-400' href="#" target='_blank'>TERMO DE USO</a> e aceita que a Pump
                renove automaticamente sua assinatura e cobre o
                preço da assinatura (atualmente R$19,95/mês).
              </p>
              {loading ? (
                <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
                  loading
                </button>
              ) : (
                <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
                  ASSINE AGORA!
                </button>
              )}
            </Fieldset>
            {error && (
              <div className='w-full'>
                <p className='text-red-500 text-sm'>*
                  {error}
                </p>
              </div>
            )}
          </div>

        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
