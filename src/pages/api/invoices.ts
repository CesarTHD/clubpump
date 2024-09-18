// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(500).json({ error: 'cpf é obrigatório' });
  }

  try {
    const urlApi = `https://api.iugu.com/v1/invoices?query=payer_cpf_cnpj%3A${cpf}&api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`;
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    response.data.items.length === 0 ? res.status(500).json({ error: 'Nenhuma fatura encontrada' }) : res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Nenhuma fatura encontrada' });
  }
}
