async function tokenizeCard() {
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            data: {
                number: '5502092903811171',
                verification_value: '335',
                first_name: 'CÉSAR TALLYS',
                last_name: 'HENRIQUE DUARTE',
                month: '08',
                year: '28'
            },
            account_id: '175525FF9DE44E2BBD3EFC557A66797A',
            method: 'credit_card',
            test: false
        })
    };

    fetch('https://api.iugu.com/v1/payment_token', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export default tokenizeCard;