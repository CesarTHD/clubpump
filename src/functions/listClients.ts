async function listClients(cpf_cnpj: string) {

  const urlApi = `https://api.iugu.com/v1/customers?query=cpf_cnpj%3A${cpf_cnpj}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`
  
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
  };

  try {
    const res = await fetch(urlApi, options);
    return await res.json();
  } catch (e) {
    throw e;
  }

}
export default listClients;