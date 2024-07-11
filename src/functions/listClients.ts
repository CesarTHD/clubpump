export async function getServerSideProps() {
  const cpf_cnpj = '08247288311';
  const urlApi = `https://api.iugu.com/v1/customers?query=cpf_cnpj%3A${cpf_cnpj}&api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`;
  
  const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
  };

  try {
    const res = await fetch(urlApi, options);
    const clients = await res.json();
    return { props: { clients } };
  } catch (e) {
    console.error(e);
    return { props: { clients: null } };
  }
}
