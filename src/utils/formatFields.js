function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

function formatPhone(phoneNumber) {
    // Remove qualquer caractere que não seja dígito
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Verifica se o número já contém o código do país +55
    let countryCode = '';
    let areaCode = '';
    let localNumber = '';

    if (cleaned.startsWith('55')) {
        countryCode = '+55 ';
        areaCode = cleaned.substring(2, 4); // Os primeiros 2 dígitos após +55
        localNumber = cleaned.substring(4);
    } else {
        areaCode = cleaned.substring(0, 2); // Os primeiros 2 dígitos
        localNumber = cleaned.substring(2);
    }

    // Formata o número local
    if (localNumber.length === 10) {
        localNumber = localNumber.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else if (localNumber.length === 9) {
        localNumber = localNumber.replace(/(\d{4})(\d{5})/, '$1-$2');
    }

    return `${countryCode}(${areaCode}) ${localNumber}`;
}

export {
    formatDate,
    formatPhone
}