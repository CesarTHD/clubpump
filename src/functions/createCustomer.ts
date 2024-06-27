import { env } from "process";

async function createCustomer(email:string, name:string, phone:number, phone_prefix:number, cpf_cnpj:string) {
    const urlApi = `https://api.iugu.com/v1/customers?api_token=${process.env.TOKEN_API}`
    
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            email,
            name,
            phone,
            phone_prefix,
            cpf_cnpj,
        })
    };

    try{
        const res = await fetch(urlApi, options);
        return await res.json();
    }catch(e){
        throw e;
    }
}

export default createCustomer;