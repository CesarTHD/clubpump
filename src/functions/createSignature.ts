async function createSignature() {
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            plan_identifier: 'anual 239,40',
            customer_id: '4C2DC7D2A99D4EEEA0543B8193AB5151',
            only_on_charge_success: true,
        })
    };

    fetch(`https://api.iugu.com/v1/subscriptions?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export default createSignature;