require('dotenv').config();
const mpesa = require('mpesa-node-api');

mpesa.initializeApi({
  baseUrl: process.env.MPESA_API_HOST,
  apiKey: process.env.MPESA_API_KEY,
  publicKey: process.env.MPESA_PUBLIC_KEY,
  origin: process.env.MPESA_ORIGIN,
  serviceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE
});

async function c2bPayment(amount, msisdn, transactionRef, thirdPartyRef) {
  return await mpesa.initiate_c2b(amount, msisdn, transactionRef, thirdPartyRef);
}

async function b2cPayment(amount, msisdn, transactionRef, thirdPartyRef) {
  return await mpesa.initiate_b2c(amount, msisdn, transactionRef, thirdPartyRef);
}

module.exports = {
  c2bPayment,
  b2cPayment
};
