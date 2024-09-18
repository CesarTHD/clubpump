import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, cardToken } = req.query;

  console.log("User ID:", userId);
  console.log("Card Token:", cardToken);

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
    const response = await fetch(`https://api.iugu.com/v1/customers/${userId}/payment_methods?api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`, options);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
}

  // try {
  //   const urlApi = `https://api.iugu.com/v1/customers/${userId}/payment_methods?api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`;
    
  //   const response = await axios.post(urlApi, {
  //     headers: { accept: 'application/json', 'content-type': 'application/json' },
  //     body: {
  //       description: "Cartão do cliente",
  //       token: cardToken
  //     }
  //   });
  //   console.log(response);
  //   response.data.items.length === 0 ? res.status(500).json({ error: 'Usuário não encontrado' }) : res.status(200).json(response.data);
  // } catch (error:any) {
  //   console.log(error.response.data.errors);
  //   res.status(500).json({ error: 'Erro ao buscar clientes' });
  // }
