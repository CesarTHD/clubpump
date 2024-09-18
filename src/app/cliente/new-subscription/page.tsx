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
import tokenizeCard from '@/functions/tokenizeCard';
import axios from 'axios';


const CustomerForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<FormValues>();
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
      } catch (err) {
        setError("Erro ao emitir nova fatura.");
        console.log(err);
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
              <Legend><p className='text-xl '>Informações de pagamento</p></Legend>
              <Text>Informe os dados de cartão de crédito para ativar sua assinatura.</Text>
              <div className='mt-4'>
                <Field>
                  <Label><p className=''>Número do cartão de crédito:</p></Label>
                  {/* <Input {...register('number')} type='text' placeholder='0000 0000 0000 0000' value={"5502092903811171"} /> */}
                  <Input {...register('number')} type='text' placeholder='0000 0000 0000 0000' />
                </Field>
              </div>
              <div className='mt-4'>
                <Field>
                  <Label><p className=''>Nome impresso no cartão:</p></Label>
                  <Input {...register('name.firstName')} type='text' />
                </Field>
              </div>
              <div className='mt-4 flex gap-4'>
                <Field className='w-full'>
                  <Label><p className=''>Data de vencimento:</p></Label>
                  <Input {...register('expiration')} type='text' placeholder='MM/AA' />
                </Field>
                <Field className='w-full'>
                  <Label><p className=''>Código de segurança:</p></Label>
                  <Input {...register('cvv')} type='current-password' />
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
                <p className='text-sm text-red-500'>
                  {error}
                </p>
              </div>
            )}
          </div>

        </div>
      </form>
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full justify-center py-20">
          <Image src={"https://clubpump.com.br/wp-content/uploads/2019/03/logo-club-pump.jpg"} width={220} height={100} alt="Club Pump" />
        </div>
        <div className="flex w-full justify-center">
          <Image src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} width={250} height={100} alt="Club Pump" />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
