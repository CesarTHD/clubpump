import { User } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createCustomer(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body;

    const TOKEN_API = "38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533";
    const url = `https://api.iugu.com/v1/customers?api_token=${TOKEN_API}`;


    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            email: user.email,
            name: user.name,
            phone: user.phone,
            phone_prefix: user.phone_prefix,
            cpf_cnpj: user.cpf_cnpj,
        })
    };

    try {

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            console.error("Erro da API:", data);
            return res.status(response.status).json(data);
        }
        return res.status(200).json(data);
    } catch (e:any) {
        console.error("Erro no servidor:", e);
        return res.status(500).json({ error: e.message });
    }
}