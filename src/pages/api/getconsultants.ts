import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { headers } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const urlApi = `https://clubpump.com.br/wp-json/wp/v2/posts/7790`;
  
    const response = await axios.get(urlApi, {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        // 'Authorization': `Bearer ${token}`,
      }
    });

    const post = response.data; // WordPress retorna um array diretamente
    if (post) {
      res.status(200).json(post); // Retorna a lista de usuários
    } else {
      res.status(404).json({ error: 'Post não encontrado.' });
    }
  } catch (error: any) {
    console.error('Erro ao buscar post:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Erro ao buscar post',
      details: error.response?.data || error.message,
    });
  }
}
