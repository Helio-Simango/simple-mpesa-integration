const express = require('express');
const app = express();
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

app.use(express.json());

// Rota base da API de pagamento
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
