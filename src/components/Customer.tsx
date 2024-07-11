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
        <ul key={index}>
          <li>{customer.name}</li>
          <li>{customer.cpf_cnpj}</li>
        </ul>
      ))}
    </div>
  );
};

export default Customer;
