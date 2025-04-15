require('dotenv').config();
const mpesa = require('mpesa-node-api');

mpesa.initializeApi({
  baseUrl: process.env.MPESA_API_HOST,
  apiKey: process.env.MPESA_API_KEY,
  publicKey: process.env.MPESA_PUBLIC_KEY,
  origin: process.env.MPESA_ORIGIN,
  serviceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE
});

/**
 * Gera uma referência de transação única com máximo de 20 caracteres
 * @param {string} prefix - Prefixo identificador do negócio (ex: "PAG")
 * @param {number|string} userId - ID do usuário (opcional)
 * @returns {string} Referência no formato: PREFIX + YYMMDDHH + USERID (var) + RANDOM (var)
 */
function generateTransactionRef(prefix = 'TXN', userId = null) {
    const now = new Date();
    const timestamp = now.toISOString().slice(2, 13).replace(/[-T:]/g, '').slice(0, 8); // YYMMDDHH
    const fixedPart = prefix.toUpperCase().slice(0, 3) + timestamp; // 11 caracteres

    let userIdStr = userId !== null ? String(userId) : '';
    let availableSpace = 20 - fixedPart.length - userIdStr.length;

    // Garante ao menos 1 caractere de random
    if (availableSpace < 1) {
        // Cortar o userId se for grande demais
        const maxUserIdLength = 20 - fixedPart.length - 1;
        userIdStr = userIdStr.slice(0, maxUserIdLength);
        availableSpace = 1;
    }

    const maxRandom = Math.pow(10, availableSpace) - 1;
    const minRandom = Math.pow(10, availableSpace - 1);
    const random = Math.floor(minRandom + Math.random() * (maxRandom - minRandom + 1))
        .toString()
        .padStart(availableSpace, '0');

    const ref = fixedPart + userIdStr + random;

    if (ref.length !== 20 || !/^[A-Z]{2,3}\d{8}\d{1,7}\d+$/.test(ref)) {
        throw new Error('transactionRef gerado inválido');
    }

    return ref;
}


/**
 * Gera referência para parceiros/comercialização externa
 * @param {string} partnerCode - Código do parceiro comercial (ex: "PERMUTASONLINE")
 * @param {string} contractId - ID do contrato/afiliação (opcional)
 * @param {string} locationCode - Código de localização (opcional)
 * @returns {string} Referência no formato: PARTNERLOCATIONCONTRACTTIMESTAMP
 */
function generateThirdPartyRef(partnerCode, contractId = null, locationCode = null) {
    if (!partnerCode || !/^[A-Z0-9]{3,10}$/.test(partnerCode)) { // SOMENTE ATE 10 CARACTERES, NO MINIMO 3
        throw new Error('Código de parceiro inválido');
    }

    const timestamp = new Date().getTime().toString().slice(-6);
    const components = [partnerCode.toUpperCase()];

    if (locationCode) components.push(String(locationCode).toUpperCase());
    if (contractId) components.push(contractId);

    const ref = `${components.join('')}${timestamp}`;

    if (ref.length > 30 || !/^[A-Z0-9]{8,30}$/.test(ref)) {
        throw new Error('Referência de terceiro excede limites');
    }

    return ref;
}

/**
 * Valida referências geradas
 * @param {string} ref - Referência a validar
 * @param {'transaction'|'thirdParty'} type - Tipo de referência
 * @returns {boolean}
 */
function validatePaymentReference(ref, type) {
    const patterns = {
        transaction: /^[A-Z]{2,3}\d{8}\d{1,7}\d+$/,        // Sem hífens
        thirdParty: /^[A-Z0-9]{8,30}$/                        // Sem hífens
    };

    if (!patterns[type]) throw new Error('Tipo de referência inválido');
    return patterns[type].test(ref);
}


async function c2bPayment(amount, msisdn, transactionRef, thirdPartyRef) {
  return await mpesa.initiate_c2b(amount, msisdn, transactionRef, thirdPartyRef);
}

async function b2cPayment(amount, msisdn, transactionRef, thirdPartyRef) {
  return await mpesa.initiate_b2c(amount, msisdn, transactionRef, thirdPartyRef);
}

module.exports = {
  c2bPayment,
  b2cPayment,
  generateTransactionRef, 
  generateThirdPartyRef, 
  validatePaymentReference
};
