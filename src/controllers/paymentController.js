const mpesaService = require('../services/mepsaService');

exports.payC2B = async (req, res) => {
  try {
    const { amount, msisdn} = req.body;

    if(!amount || !msisdn){
      return res.status(400).json({ error: 'Parâmetros obrigatórios não informados' });
    }

    const transactionRef = mpesaService.generateTransactionRef('PAG', 123);
    const trasnsactionRefValid = mpesaService.validatePaymentReference(transactionRef, 'transaction');
    if (!trasnsactionRefValid){
      return res.status(400).json({ error: 'Referência de transação inválida' });
    }

    // Gera referência para parceiros/comercialização externa
    // O primeiro parametro têm que ter no maximo 10 caracteres
    const thirdPartyRef = mpesaService.generateThirdPartyRef('PERMUTAS',"CTR0");
    const thirdPartyRefValid = mpesaService.validatePaymentReference(thirdPartyRef, 'thirdParty');
    if (!thirdPartyRefValid){
      return res.status(400).json({ error: 'Referência de terceiro inválida' });
    }

    // const result = await mpesaService.c2bPayment(amount, msisdn, "TRANS1233FGHH45677", "REF0043DF45GFS");
    const result = await mpesaService.c2bPayment(amount, msisdn, transactionRef, thirdPartyRef);
    
    res.status(200).json({
      message: 'Pagamento C2B realizado com sucesso',
      data: result
    });
  
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ 
      error: {
        message: error.message || 'C2B Payment Error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        raw: error // só pra debug
      }
    });
  }
};

exports.payB2C = async (req, res) => {
  try {
    const { amount, msisdn } = req.body;

    if(!amount || !msisdn){
      return res.status(400).json({ error: 'Parâmetros obrigatórios não informados' });
    }

    const transactionRef = mpesaService.generateTransactionRef('PAG', 123);
    const trasnsactionRefValid = mpesaService.validatePaymentReference(transactionRef, 'transaction');
    if (!trasnsactionRefValid){
      return res.status(400).json({ error: 'Referência de transação inválida' });
    }

    // Gera referência para parceiros/comercialização externa
    // O primeiro parametro têm que ter no maximo 10 caracteres
    const thirdPartyRef = mpesaService.generateThirdPartyRef('PERMUTAS',"CTR0");
    const thirdPartyRefValid = mpesaService.validatePaymentReference(thirdPartyRef, 'thirdParty');
    if (!thirdPartyRefValid){
      return res.status(400).json({ error: 'Referência de terceiro inválida' });
    }
    
    const result = await mpesaService.b2cPayment(amount, msisdn, transactionRef, thirdPartyRef);
    
    res.status(200).json({
      message: 'Pagamento B2C realizado com sucesso',
      data: result
    });
  
  } catch (error) {
    console.error(error);
    
    res.status(500).json({
      error: {
        message: error.message || 'B2C Payment Erro',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        raw: error // só pra debug
      } 
    });
  }
};
