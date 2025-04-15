const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rota para pagamento C2B
router.post('/c2b', paymentController.payC2B);

// Rota para pagamento B2C
router.post('/b2c', paymentController.payB2C);

module.exports = router;
