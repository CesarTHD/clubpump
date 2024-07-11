'use client';
import { FormValues } from '@/types/FormValues';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type CustomerFormProps = {
  onSubmit: (data: any) => void;
};


const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const submit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col w-full max-w-[1200px] border border-white p-4 gap-4">
      <div className='flex justify-around flex-col md:flex-row gap-8'>
        <div className='flex flex-col gap-4 border p-6 w-full'>
          <h2 className='text-center'>Dados do cliente</h2>

          <div className='flex flex-col gap-2'>
            <label>Nome:</label>
            <input {...register('name.firstName')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Sobrenome:</label>
            <input {...register('name.lastName')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>CPF:</label>
            <input {...register('cpf_cnpj')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Celular:</label>
            <input {...register('telephone')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>E-mail:</label>
            <input {...register('email')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Nome do Consultor:</label>
            <input {...register('consultantName')} className="text-black" type="text" />
          </div>
        </div>

        <div className='flex flex-col gap-4 border p-6 w-full'>
          <h2 className='text-center'>Dados do cartão de crédito</h2>

          <div className='flex flex-col gap-2'>
            <label>Número do cartão:</label>
            <input {...register('number')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Nome impresso no cartão:</label>
            <input {...register('number')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Data de vencimento:</label>
            <input {...register('expiration')} className="text-black" type="text" />
          </div>

          <div className='flex flex-col gap-2'>
            <label>Código de segurança:</label>
            <input {...register('cvv')} className="text-black" type="text" />
          </div>
        </div>
      </div>

      <button type="submit" className='border w-40 mx-auto mt-12 py-2 transition-all duration-300 hover:bg-white hover:text-black'>Buscar</button>
    </form>
  );
};

export default CustomerForm;
