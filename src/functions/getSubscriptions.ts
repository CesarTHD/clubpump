import { User } from "@/types/user";
import axios from "axios";


export const getSubscriptions = async (email: string) => {
    try {
        const urlApi = `/api/getsubscriptions?email=${email}`;
        const response = await axios.get(urlApi, {
            headers: { accept: 'application/json', 'content-type': 'application/json' },
        });

        const subscriptionResponse = await response.data;
        return subscriptionResponse.items;
        // setSubscriptions(subscriptionResponse.items);
    } catch (err) {
        return err;
    }
}