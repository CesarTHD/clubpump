// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const TOKEN_API = process.env.SECRET_API_KEY;

  if (!userId) {
    return res.status(500).json({ error: 'ID é obrigatório' });
  }
  const url = `${process.env.NEXT_PUBLIC_API_URL}/subscriptions?api_token=${TOKEN_API}`;

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      plan_identifier: 'MENSAL',
      customer_id: userId,
      only_on_charge_success: true,
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return res.status(200).json({data});
  } catch (error) {
    return res.status(500).json({error});
  }
}
