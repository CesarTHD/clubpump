// components/Customer.tsx

'use client';
import { TypeCustomer } from '@/types/Customer';
import { FormValues } from '@/types/FormValues';
import axios from 'axios';
import { useState } from 'react';

type CustomerProps = {
  customers: TypeCustomer[];
};

const Customer: React.FC<CustomerProps> = ({ customers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchCustomers = async (customer: FormValues) => {
    setLoading(true);
    // setCustomers([]);
    setError('');
    try {
      const urlApi = `/api/customers?cpf=${customer.cpf_cnpj}`;
      const { data } = await axios.get(urlApi, {
        headers: { accept: 'application/json', 'content-type': 'application/json' },
      });

      // setCustomers(data.items);
    } catch (err) {
      setError('Erro ao buscar clientes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {customers.map((customer, index) => (
        <ul key={index}>
          <li>{customer.name}</li>
          <li>{customer.cpf_cnpj}</li>
        </ul>
      ))}
    </div>
  );
};

export default Customer;
