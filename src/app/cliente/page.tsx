'use client';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TypeCustomer } from '@/types/Customer';
import { FormValues } from '@/types/FormValues';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/catalyst-ui-kit/fieldset';
import { Input } from '@/components/catalyst-ui-kit/input';
import { Text } from '@/components/catalyst-ui-kit/text';
import { Button } from '@/components/catalyst-ui-kit/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import loadingIcon from '@/assets/loading.png';
import { useAuthContext } from '@/context/useAuth';
import Header from '@/components/Header';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser }: any = useContext(useAuthContext);

  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);

    setError('');
    try {
      const urlToken = `/api/authtoken?email=${data.email}&password=${data.password}`;
      const response = await axios.get(urlToken, {
        headers: { accept: 'application/json', 'content-type': 'application/json' },
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem("club.userId", response.data.token);
      }

      try {
        const urlCustomer = `/api/customers?email=${data.email}`;
        // const urlCustomer = `/api/customers?email=metregabriel@gmail.com`;
        // const urlCustomer = `/api/customers?email=valdecis@gmail.com`;
        // const urlCustomer = `/api/customers?email=portela@live.com`;
        const response = await axios.get(urlCustomer, {
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        });

        const customers = await response.data;

        let uniqueCustomer;

        customers.items.map((customer: any, index: number) => {
          if (customer.cpf_cnpj) {
            uniqueCustomer = customer;
          } else if (index === customers.items.length - 1 && !customer.cpf_cnpj) {
            uniqueCustomer = customer;
          }
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('club.user', JSON.stringify(uniqueCustomer));
        }
        setUser(uniqueCustomer);
        router.push('/cliente/home');
      } catch (error) {
        return;
      }

    } catch (err: any) {
      setError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='flex flex-col max-w-[400px] mx-auto mt-20 gap-8 justify-center px-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <Legend><span className='text-white text-lg'>Login</span></Legend>
            <Text>Faça login para visualizar suas faturas ou contratar um novo plano.</Text>
            <FieldGroup>
              <Field>
                <Label><span className='text-white'>E-mail:</span></Label>
                <Input {...register('email')} type='text' />
              </Field>
              <Field>
                <Label><span className='text-white'>Senha:</span></Label>
                <Input {...register('password')} type='password' />
              </Field>
              <Button type='submit' disabled={loading === true} className='hover:cursor-pointer min-w-32'>
                {!loading ? (
                  <span>Entrar</span>
                ) : (
                  <Image
                    src={loadingIcon}
                    width={25}
                    height={25}
                    style={{ animation: 'rotate .7s linear infinite' }}
                    alt="Loading"
                  />
                )}
              </Button>
            </FieldGroup>
          </Fieldset>
        </form>

        {error && (<div dangerouslySetInnerHTML={{ __html: error }} />)}
      </div>
    </div>
  );
};

export default Login;
