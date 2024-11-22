import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const { customerId } = req.query;
  const TOKEN_API = process.env.SECRET_API_KEY;
  try {
    let urlApi
    if(email){
      urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers?query=email%3A${email}&api_token=${TOKEN_API}`;
      // urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers?query=email%3Ametregabriel@gmail.com&api_token=${TOKEN_API}`;
      // urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers?query=email%3Avaldecis@gmail.com&api_token=${TOKEN_API}`;
      // urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers?query=email%3Aportela@live.com&api_token=${TOKEN_API}`;
    }else{
      urlApi = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}?api_token=${TOKEN_API}`;
    }
    
    const response = await axios.get(urlApi, {
      headers: { accept: 'application/json', 'content-type': 'application/json' },
    });

    if(email){
      response.data.items.length === 0 ? res.status(500).json({ error: 'Usuário não encontrado' }) : res.status(200).json(response.data);
    }else{
      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
}
