// Função para validar CPF
export const validateCpf = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf[10]);
};

// Função para validar CNPJ
export const validateCnpj = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0, pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers[size - i]) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits[0])) return false;

    size++;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers[size - i]) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits[1]);
};

// Formatação de CPF/CNPJ (já fornecida)
export const formatCpfCnpj = (value: string): string => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 14) value = value.slice(0, 14); // Limita a 14 dígitos

    if (value.length === 11) { // Formato CPF
        return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
    } else if (value.length === 14) { // Formato CNPJ
        return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
    } else {
        return value;
    }
};

export const handleCpfCnpjChange = (event: any) => {
    const formattedValue = formatCpfCnpj(event.target.value);
    return formattedValue;
};