export const handleCardInputChange = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    // Limita o valor a 16 dígitos
    const limitedValue = rawValue.slice(0, 16);

    // Formata o valor com espaços a cada 4 dígitos
    const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formattedValue;
};
