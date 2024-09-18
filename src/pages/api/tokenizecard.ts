import { FormValues } from '@/types/FormValues';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dataCard }: any = req.query;
    const dataJson:FormValues = JSON.parse(dataCard);

    let cardNumber = dataJson?.number.replace(" ", '');

    let nameParts = dataJson.name.firstName.split(" ");
    let last_name = nameParts.pop();
    let first_name = nameParts.join(" ");

    let dateParts = dataJson.expiration.split("/");
    let month = dateParts[0];
    let year = dateParts[1];

    const options = {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            data: {
                number: cardNumber,
                verification_value: dataJson?.cvv,
                first_name,
                last_name,
                month,
                year
            },
            account_id: '175525FF9DE44E2BBD3EFC557A66797A',
            method: 'credit_card',
            test: false
        })
    };

    try {
        const response = await fetch('https://api.iugu.com/v1/payment_token', options);
        const card = await response.json()
        console.log(card);
        if(card.id){
            return res.status(200).json({ card });
        }else{
            return res.status(500).json({ error: "" });
        }
        
        // return res.status(200).json({ data: responseData });
    } catch (e: any) {
        return res.status(500).json({ errors: e.message || "Erro interno" });
    }
}
