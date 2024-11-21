export const handleExpirationInputChange = (e: any) => {
    let rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    // Limita a entrada a no máximo 6 dígitos (MMYYYY)
    rawValue = rawValue.slice(0, 6);

    // Adiciona a barra automaticamente após o mês (primeiros 2 dígitos)
    if (rawValue.length >= 3) {
        rawValue = `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
    }

    return rawValue; // Retorna o valor formatado corretamente
};
