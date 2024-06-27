async function createPaymentMethod() {
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            description: 'Cartão do cliente',
            token: '1715acaf-26ff-497d-b2a4-9aa7b4e742e9',
            set_as_default: true
        })
    };

    //customer in route
    fetch('https://api.iugu.com/v1/customers/4C2DC7D2A99D4EEEA0543B8193AB5151/payment_methods?api_token=38065F43CCBB2D4A4C507782AD80AFA8860B02EBE4C3AFB32ECEDD583464D533', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export default createPaymentMethod;