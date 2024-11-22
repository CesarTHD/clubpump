// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  const API_TOKEN = process.env.SECRET_API_KEY;
  if (!email) {
    return res.status(500).json({ error: 'email é obrigatório' });
  }

  try {
    const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions?query=customer_email%3A${email}&api_token=${API_TOKEN}`;
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    response.data.items.length === 0 ? res.status(500).json({ error: 'Nenhuma assinatura encontrada' }) : res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Nenhuma assinatura encontrada' });
  }
}
