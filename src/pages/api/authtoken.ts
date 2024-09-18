import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.query;

    if(!email || !password) return res.status(500).json({ error: 'Access data incomplete' });;

    try {
        const response = await axios.post('https://thdsolutions.com.br/wp-json/jwt-auth/v1/token', {
            username: email,
            password: password,
        });
        const token = response.data.token;

        res.status(200).json({ token });
    } catch (error:any) {
        res.status(500).json({ error: error.response.data.message });
    }
}