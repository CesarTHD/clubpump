async function listClients(cpf_cnpj:string) {
    const urlApi = `https://api.iugu.com/v1/customers?query=cpf_cnpj%3A${cpf_cnpj}&api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533`

    const options = { method: 'GET', headers: { accept: 'application/json' }, "Access-Control-Allow-Origin": "*" };

    try{
        const res = await fetch(urlApi, options);
        return await res.json();
    }catch(e){
        throw e;
    }
  
  }
export default listClients;