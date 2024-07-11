// components/Customer.tsx

'use client';
import { TypeCustomer } from '@/types/Customer';

type CustomerProps = {
  customers: TypeCustomer[];
};

const Customer: React.FC<CustomerProps> = ({ customers }) => {
  return (
    <div>
      {customers.map((customer, index) => (
        <div key={index}>
          <p>{customer.name}</p>
          <p>{customer.cpf_cnpj}</p>
        </div>
      ))}
    </div>
  );
};

export default Customer;
