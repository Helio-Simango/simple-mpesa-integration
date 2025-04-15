const mpesaService = require('../services/mepsaService');

exports.payC2B = async (req, res) => {
  const { amount, msisdn, transactionRef, thirdPartyRef } = req.body;
  try {
    const result = await mpesaService.c2bPayment(amount, msisdn, transactionRef, thirdPartyRef);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: {
        message: error.message || 'Erro inesperado',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        raw: error // só pra debug
      }
    });
  }
};

exports.payB2C = async (req, res) => {
  const { amount, msisdn, transactionRef, thirdPartyRef } = req.body;
  try {
    const result = await mpesaService.b2cPayment(amount, msisdn, transactionRef, thirdPartyRef);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        message: error.message || 'Erro inesperado',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        raw: error // só pra debug
      } 
    });
  }
};
