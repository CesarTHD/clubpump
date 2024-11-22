// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cpf } = req.query;
  const API_TOKEN = process.env.SECRET_API_KEY;
  if (!cpf) {
    return res.status(500).json({ error: 'cpf é obrigatório' });
  }

  try {
    const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/invoices?query=payer_cpf_cnpj%3A${cpf}&api_token=${API_TOKEN}`;
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    response.data.items.length === 0 ? res.status(500).json({ error: 'Nenhuma fatura encontrada' }) : res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Nenhuma fatura encontrada' });
  }
}
