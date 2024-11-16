import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { headers } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const urlApi = `https://clubpump.com.br/wp-json/wp/v2/users?capabilities=administrador`;
    const urlApi = `https://clubpump.com.br/wp-json/wp/v2/users`;
    // const urlApi = `https://clubpump.com.br/wp-json/custom/v1/users?role=colaborador`;

    // Token JWT gerado anteriormente
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NsdWJwdW1wLmNvbS5iciIsImlhdCI6MTczMTc2ODg4NSwibmJmIjoxNzMxNzY4ODg1LCJleHAiOjE3MzIzNzM2ODUsImRhdGEiOnsidXNlciI6eyJpZCI6IjIxIn19fQ.yZMysOAcQrSScST490ELFoo9OajVWWnb_eEC3UlZZMo';

    // Faz a requisição para o endpoint
    const response = await axios.post(urlApi, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Verifica se a resposta contém usuários
    const users = response.data; // WordPress retorna um array diretamente
    if (Array.isArray(users) && users.length > 0) {
      res.status(200).json(users); // Retorna a lista de usuários
    } else {
      res.status(404).json({ error: 'Nenhum usuário encontrado.' });
    }
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Erro ao buscar clientes',
      details: error.response?.data || error.message,
    });
  }
}
