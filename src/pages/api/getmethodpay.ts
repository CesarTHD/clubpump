import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { useContext } from 'react';
import { useAuthContext } from '@/context/useAuth';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const {user}:any = useContext(useAuthContext);

  try {
    const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers/${user.id}/payment_methods`;
    
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    response.data.items.length === 0 ? res.status(500).json({ error: 'Usuário não encontrado' }) : res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
}
