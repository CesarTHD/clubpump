'use client';
import { FormValues } from '@/types/FormValues';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import axios from 'axios';
import { handlePhoneChange } from '@/functions/handlePhoneChange';
import { formatCpfCnpj, validateCnpj, validateCpf } from '@/functions/handleCpfCnpjChange';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';



const CustomerForm = ({setUserId}: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");

    try {
      const regex = /^\((\d{2})\)(\d+)$/;
      const cleanTel = telephone.replace(/[\s-]/g, "");
      const match = cleanTel.match(regex);

      let phone;
      let phone_prefix;

      if (match) {
        phone_prefix = match[1];
        phone = match[2];
      }

      const cpf_cnpj = cpfCnpj.replace(/[.\-/]/g, "");

      const res = await axios.post("/api/createcustomer", {
        name: firstName + " " + lastName,
        email,
        phone,
        phone_prefix,
        cpf_cnpj
      }, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      
      console.log(res.data.id);
      if(res.data.id){
        setUserId(res.data.id);
      }
      
    } catch (e) {
      setError("Erro ao cadastrar usuário. Verifique os dados ou tente mais tarde.");
      throw(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full border px-8 py-16 rounded-lg'>
      <Fieldset>
        <Legend><p className='text-2xl'>Dados do assinante</p></Legend>
        <Text><span className="text-lg">Realize seu cadastro e participe do nosso clube de benefícios.</span></Text>
        <FieldGroup>
          <div className='flex flex-col md:flex-row gap-4 mt-8'>
            <Field className='w-full'>
              <Label><p className='font-semibold text-lg'>Nome:</p></Label>
              <Input
                {...register('name.firstName', { required: "Nome é obrigatório" })}
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
              />
              {errors.name?.firstName && <p className='text-red-500 text-sm'>*{errors.name.firstName.message}</p>}
            </Field>
            <Field className='w-full'>
              <Label><p className='font-semibold text-lg'>Sobrenome:</p></Label>
              <Input
                {...register('name.lastName', { required: "Sobrenome é obrigatório" })}
                type='text'
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setTelephone(handlePhoneChange(e))}
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
                  validate: (value: string) => {
                    const onlyNumbers = value.replace(/\D/g, '');
                    if (onlyNumbers.length === 11) {
                      return validateCpf(onlyNumbers) || "CPF inválido.";
                    } else if (onlyNumbers.length === 14) {
                      return validateCnpj(onlyNumbers) || "CNPJ inválido.";
                    }
                    return "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
                  }
                })}
                type="text"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
              />
              {errors.cpf_cnpj && <p className='text-red-500 text-sm'>*{errors.cpf_cnpj.message}</p>}
            </Field>
            <button disabled={loading} className='border rounded-lg h-12 w-full text-2xl font-extrabold mt-8 disabled:bg-gray-600'>
              <div className='hover:scale-125 transition-all'>
                {!loading ? (
                  <div className='flex justify-center gap-2'>
                    <p>PRÓXIMO</p>
                    <ArrowRightCircleIcon className='w-6' />
                  </div>
                ) : (
                  <div className='flex justify-center'>
                    <Image
                      src={loadingIcon}
                      width={25}
                      height={25}
                      style={{ animation: 'rotate .7s linear infinite' }}
                      alt="Loading"
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        </FieldGroup>
      </Fieldset>
    </form>
  );
};

export default CustomerForm;
