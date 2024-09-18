import { FormValues } from "@/types/FormValues";

async function tokenizeCard(data: FormValues) {

    let nameParts = data.name.firstName.split(" ");
    let last_name = nameParts.pop();
    let first_name = nameParts.join(" ");

    let dateParts = data.expiration.split("/");
    let month = dateParts[0];
    let year = dateParts[1];

    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            data: {
                number: data.number,
                verification_value: data.cvv,
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

    fetch('https://api.iugu.com/v1/payment_token', options)
        .then(response => response.json())
        .then(response => {return response})
        .catch(err => {return err});
}

export default tokenizeCard;


// async function tokenizeCard(data: any) {
//     const options = {
//         method: 'POST',
//         headers: { accept: 'application/json', 'content-type': 'application/json' },
//         body: JSON.stringify({
//             data: {
//                 number: '5502092903811171',
//                 verification_value: '335',
//                 first_name: 'CÉSAR TALLYS HENRIQUE',
//                 last_name: 'DUARTE',
//                 month: '08',
//                 year: '28'
//             },
//             account_id: '175525FF9DE44E2BBD3EFC557A66797A',
//             method: 'credit_card',
//             test: false
//         })
//     };

//     fetch('https://api.iugu.com/v1/payment_token', options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// }

// export default tokenizeCard;