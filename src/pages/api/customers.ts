import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  const { customerId } = req.query;

  try {
    let urlApi
    if(email){
      urlApi = `https://api.iugu.com/v1/customers?query=email%3A${email}&api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`;
    }else{
      urlApi = `https://api.iugu.com/v1/customers/${customerId}?api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`;
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
