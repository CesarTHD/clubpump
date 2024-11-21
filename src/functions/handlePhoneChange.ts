const formatPhone = (value: string) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
    
    if (value.length >= 11) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
    } else if (value.length >= 7) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
        return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length >= 2) {
        return `(${value.slice(0, 2)}`;
    } else {
        return value;
    }
};

export const handlePhoneChange = (event: any) => {
    const formattedPhone = formatPhone(event.target.value);
    return formattedPhone;
};