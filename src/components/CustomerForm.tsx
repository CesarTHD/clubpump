'use client';
import { FormValues } from '@/types/FormValues';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Button } from '@/components/catalyst-ui-kit/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';

type CustomerFormProps = {
  onSubmit: (data: any) => void;
};


const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();

  const submit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form className='flex flex-col md:flex-row justify-center w-full px-4 md:px-16 gap-8 bg-white text-neutral-800 py-20' onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full md:w-1/2 border p-8 rounded-lg'>
        <Fieldset>
          <Legend><p className='text-xl'>Informações do cliente</p></Legend>
          <Text>Realize seu cadastro e participe do nosso clube de benefícios.</Text>
          <FieldGroup>
            <div className='flex gap-4 mt-16'>
              <Field className='w-full'>
                <Label><p className=''>Nome:</p></Label>
                <Input {...register('name.firstName')} type='text' />
              </Field>
              <Field className='w-full'>
                <Label><p className=''>Sobrenome:</p></Label>
                <Input {...register('name.lastName')} type='text' />
              </Field>
            </div>
            <div className='flex gap-4'>
              <Field className='w-full'>
                <Label><p className=''>Email:</p></Label>
                <Input {...register('email')} type='email' />
              </Field>
              <Field className='w-full'>
                <Label><p className=''>Celular:</p></Label>
                <Input {...register('telephone')} type='text' />
              </Field>
            </div>
            <div className="flex gap-4">
              <Field className='w-full'>
                <Label><p className=''>CPF/CNPJ:</p></Label>
                <Input {...register('cpf_cnpj')} type='text' />
              </Field>
              <Field className='w-full'>
                <Label><p className=''>Nome do consultor:</p></Label>
                <Input {...register('consultantName')} type='text' />
              </Field>
            </div>
            <div className="flex gap-4">
              <Field className='w-full'>
                <Label><p className=''>Senha:</p></Label>
                <Input {...register('password')} type='password' />
              </Field>
              <Field className='w-full'>
                <Label><p className=''>Confirmar senha:</p></Label>
                <Input {...register('password')} type='password' />
              </Field>
            </div>

            {/* <Button type='submit' disabled={loading} className='hover:cursor-pointer min-w-32'>
              {!loading ? (
                <p>Cadastre-se</p>
              ) : (
                <Image
                  src={loadingIcon}
                  width={25}
                  height={25}
                  style={{ animation: 'rotate .7s linear infinite' }}
                  alt="Loading"
                />
              )}
            </Button> */}
          </FieldGroup>
        </Fieldset>
      </div>
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
                <Input {...register('number')} type='text' placeholder='0000 0000 0000 0000' />
              </Field>
            </div>
            <div className='mt-4'>
              <Field>
                <Label><p className=''>Nome impresso no cartão:</p></Label>
                <Input {...register('consultantName')} type='text' />
              </Field>
            </div>
            <div className='mt-4 flex gap-4'>
              <Field className='w-full'>
                <Label><p className=''>Data de vencimento:</p></Label>
                <Input {...register('expiration')} type='text' placeholder='MM/AAAA' />
              </Field>
              <Field className='w-full'>
                <Label><p className=''>Código de segurança:</p></Label>
                <Input {...register('name.lastName')} type='current-password' />
              </Field>
            </div>
            <p className='mt-6 text-xs leading-4'>
              Ao clicar no botão “Assine agora” abaixo, 
              você concorda com nosso <a className='text-blue-400' href="#" target='_blank'>TERMO DE USO</a> e aceita que a Pump 
              renove automaticamente sua assinatura e cobre o 
              preço da assinatura (atualmente R$19,95/mês).
            </p>
            <button className='border rounded-lg h-16 mt-4 w-full text-2xl font-extrabold'>
              ASSINE AGORA!
            </button>
          </Fieldset>
        </div>

      </div>
    </form>
  );
};

export default CustomerForm;
