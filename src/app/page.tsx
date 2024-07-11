// app/page.tsx

'use client';
import { useState } from 'react';
import axios from 'axios';
import Customer from '@/components/Customer';
import CustomerForm from '@/components/CustomerForm';
import { TypeCustomer } from '@/types/Customer';
import { FormValues } from '@/types/FormValues';

const Home = () => {
  const [customers, setCustomers] = useState<TypeCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCustomers = async (customer: FormValues) => {
    setLoading(true);
    setError('');
    try {
      const urlApi = `/api/customers?cpf=${customer.cpf_cnpj}`;
      const { data } = await axios.get(urlApi, {
        headers: { accept: 'application/json', 'content-type': 'application/json' },
      });

      setCustomers(data.items);
    } catch (err) {
      setCustomers([]);
      setError('Erro ao buscar clientes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomerForm onSubmit={fetchCustomers} />
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <Customer customers={customers} />
    </div>
  );
};

export default Home;
