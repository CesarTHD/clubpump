// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(500).json({ error: 'CPF é obrigatório' });
  }

  try {
    const urlApi = `https://api.iugu.com/v1/customers?query=cpf_cnpj%3A${cpf}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`;
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    response.data.items.length === 0 ? res.status(500).json({ error: 'Usuário não encontrado' }) : res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
}
