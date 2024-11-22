import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, cardToken } = req.query;
  const TOKEN_API = process.env.SECRET_API_KEY;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      description: 'Cartão do cliente',
      token: cardToken
    })
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${userId}/payment_methods?api_token=${TOKEN_API}`, options);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
}