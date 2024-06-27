"use client";

import createCustomer from "@/functions/createCustomer";
import listClients from "@/functions/listClients";
import { User } from "@/types/user";

export default function Home() {
  const user:User = {
    name: 'César Tallys Henrique Duarte',
    cpf_cnpj: '08247288311',
    phone_prefix: 61,
    phone: 998374202,
    email: 'cesartallys5@gmail.com',
    consultant: 'Gabriel',
    card_number: '',
    card_name: '',
    card_data: '',
    card_code: '',
  }
  
  const sendData = async() => {
    console.log(await listClients(user.cpf_cnpj));
    // createCustomer(user.email, user.name, user.phone, user.phone_prefix, user.cpf_cnpj);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => {sendData()}} className="border border-white py-2 px-4">Comprar</button>
    </main>
  );
}
