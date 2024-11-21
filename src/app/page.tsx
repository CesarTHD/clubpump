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
      const urlCustomer = `/api/customers`;
      const response = await axios.post(urlCustomer, {
        email: data.email
      }, {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      const customers = await response.data;

      let uniqueCustomer: any = {};
      customers.items.map((customer: any, index: number) => {
        if (customer.cpf_cnpj) {
          uniqueCustomer = customer;
        } else if (index === customers.items.length - 1 && !customer.cpf_cnpj) {
          uniqueCustomer = customer;
        }
      });


      if (uniqueCustomer.cpf_cnpj) {
        if (uniqueCustomer.cpf_cnpj === data.password && typeof window !== 'undefined') {
          localStorage.setItem('club.user', JSON.stringify(uniqueCustomer));
          setUser(uniqueCustomer);
          router.push('/home');
        } else {
          setError("Erro ao efetuar login. Verifique suas credenciais ou tente novamente mais tarde.  ")
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.setItem('club.user', JSON.stringify(uniqueCustomer));
          setUser(uniqueCustomer);
          router.push('/home');
        }
      }
      
    } catch (error) {
      setError("Erro ao efetuar login. Verifique suas credenciais ou tente novamente mais tarde.  ")
      return error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='flex flex-col max-w-[400px] mx-auto mt-20 gap-8 justify-center px-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <Legend><span className='text-white text-xl'>Login</span></Legend>
            <Text><span className='text-base'>Faça login para verificar sua assinatura ou contratar um novo plano.</span></Text>
            <FieldGroup>
              <Field>
                <Label><span className='text-white text-base'>E-mail:</span></Label>
                <Input {...register('email')} type='text' />
              </Field>
              <Field>
                <Label><span className='text-white text-base'>Senha:</span></Label>
                <Input {...register('password')} type='password' />
                {error && (<div className='text-red-500 text-sm font-light mt-2' dangerouslySetInnerHTML={{ __html: error }} />)}
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

      </div>
    </div>
  );
};

export default Login;
