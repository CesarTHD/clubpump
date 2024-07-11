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
    <form onSubmit={handleSubmit(submit)} className="flex flex-col mt-8 w-[400px] border border-white p-4 gap-2">
      <label>Nome:</label>
      <input {...register('name.firstName')} className="text-black" type="text" />
      
      <label>Sobrenome:</label>
      <input {...register('name.lastName')} className="text-black" type="text" />
      
      <label>CPF:</label>
      <input {...register('cpf_cnpj')} className="text-black" type="text" />
      
      <label>Celular:</label>
      <input {...register('number')} className="text-black" type="text" />
      
      <label>E-mail:</label>
      <input {...register('email')} className="text-black" type="text" />
      
      <label>Nome do Consultor:</label>
      <input {...register('consultantName')} className="text-black" type="text" />
      
      <button type="submit">Buscar</button>
    </form>
  );
};

export default CustomerForm;
