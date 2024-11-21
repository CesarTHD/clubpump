'use client';
import { FormValues } from '@/types/FormValues';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Select } from "@/components/catalyst-ui-kit/select";
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Button } from '@/components/catalyst-ui-kit/button';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { handlePhoneChange } from '@/functions/handlePhoneChange';
import { formatCpfCnpj, handleCpfCnpjChange, validateCnpj, validateCpf } from '@/functions/handleCpfCnpjChange';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { handleExpirationInputChange } from '@/functions/handleExpirationInputChange';
import { handleCardInputChange } from '@/functions/handleCardInputChange';



const CardForm = ({ userId, setStep }: any) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [consultants, setConsultants]: any = useState([]);
  const [cardDisplay, setCardDisplay] = useState("");
  const [expirationDisplay, setExpirationDisplay] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const getConsultants = async () => {
    try {
      const urlApi = `/api/getconsultants`;

      const response = await axios.get(urlApi, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      const consultantsCSV = response.data.content.rendered;
      const cleanedInput = consultantsCSV.replace(/<\/?p>/g, "");
      const consultantsArray = cleanedInput.split(",").map((item: any) => item.trim());
      setConsultants(consultantsArray);

    } catch (error) {
      console.log("error", error);
    }
  }

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    setLoading(true);
    setError("");
    try {
      const cardToken = await axios.get(`/api/tokenizecard?dataCard=${JSON.stringify(data)}`, {
        headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
      });

      try {
        const methodPay = await axios.get(`/api/newmethodpay?userId=${userId}&cardToken=${cardToken.data.card.id}`, {
          headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
        });

        const subscription = await axios.get(`/api/newsubscription?userId=${userId}`, {
          headers: { accept: 'application/json', 'content-type': 'application/json', 'Cache-Control': 'no-cache' },
        });
        
        setStep(3);
      } catch (err) {
        setLoading(false);
        setError("Erro ao configurar método de pagamento, verifique os dados do cartão de crédito.");
      } finally {
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      setError("Erro ao configurar método de pagamento, verifique os dados do cartão de crédito.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getConsultants();
  }, []);

  return (
    <div className=''>
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
      <form onSubmit={handleSubmit(onSubmit)} className='border rounded-lg p-8 mt-4'>
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
                value={cardDisplay || ""}
                onChange={(e) => setCardDisplay(handleCardInputChange(e) || cardDisplay)} // Garante estado consistente
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
                value={expirationDisplay}
                onChange={(e) => setExpirationDisplay(handleExpirationInputChange(e))}
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
            Ao clicar no botão “Cadastrar-se” abaixo,
            você concorda com nosso <a className='text-blue-400' href="#" target='_blank'>TERMO DE USO</a> e aceita que a Pump
            renove automaticamente sua assinatura e cobre o
            preço da assinatura (atualmente R$19,95/mês).
          </p>
          <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold hover:text-3xl transition-all'>
            CADASTRAR-SE
          </button>
          {error && <p className="text-sm text-red-600 mt-4">* {error}</p>}
        </Fieldset>
      </form>
    </div>
  );
};

export default CardForm;
