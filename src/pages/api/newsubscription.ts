// pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(500).json({ error: 'ID é obrigatório' });
  }
  const url = `https://api.iugu.com/v1/subscriptions?api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`;

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      plan_identifier: 'MENSAL', // confirmar
      customer_id: userId,
      only_on_charge_success: true,
    })
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("certo", data)
    return res.status(200).json({data});
  } catch (error) {
    console.log("errado", error)
    return res.status(500).json({error});
  }
}
