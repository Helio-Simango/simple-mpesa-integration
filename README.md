# Simple M-Pesa Integration 💰📱

Bem-vindo ao **Simple M-Pesa Integration**, um projeto simples e funcional de integração com a API M-Pesa, utilizando **Node.js** com arquitetura limpa e escalável.

Este projeto tem como objetivo demonstrar uma implementação clara, reutilizável e organizada da integração de pagamentos via M-Pesa.

> ✨ Ideal para estudos e como ponto de partida para aplicações reais de pagamento!

---

## 🚀 Tecnologias Utilizadas

- **Node.js** 🟢
- **Express.js** ⚡
- **dotenv** 🔐
- **mpesa-node-api** 📲
- **Nodemon** (em desenvolvimento)

---

## 📁 Estrutura do Projeto

```
simple-mpesa-integration/
│-- src/
│   ├── controllers/       # Camada de controle das requisições
│   ├── routes/            # Definição de rotas da aplicação
│   ├── services/          # Lógica de negócio e integração com a API M-Pesa
│   ├── index.js           # Ponto de entrada da aplicação
│-- .env                   # Variáveis de ambiente sensíveis
│-- package.json
│-- README.md
```

---

## ⚙️ Configuração e Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Helio-Simango/simple-mpesa-integration.git
cd simple-mpesa-integration
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000

# M-Pesa Credentials
MPESA_API_HOST=sandbox.safaricom.co.ke
MPESA_API_KEY=sua_chave_api
MPESA_PUBLIC_KEY=sua_chave_publica_em_uma_linha
MPESA_ORIGIN=http://localhost:3000
MPESA_SERVICE_PROVIDER_CODE=171717
```

### 4️⃣ Execute a aplicação

```bash
npm run dev
```

> O servidor será iniciado em **http://localhost:3000**

---

## 🌐 Rotas Disponíveis

| Rota                 | Método | Descrição                           |
|----------------------|--------|-------------------------------------|
| `/api/payments/c2b`       | POST   | Inicia um pagamento C2B (cliente → empresa) |
| `/api/payments/b2c`       | POST   | Inicia um pagamento C2B (empresa → cliente) |
| `/`                  | GET    | Health check da aplicação          |

---

## 📦 Exemplo de Requisição C2B

**POST** `http://localhost:3000/api/payments/c2b`

```json
{
  "amount": "100",
  "phoneNumber": "258841234567",
}
```

---

## 🔧 Estrutura Básica dos Arquivos

### `src/index.js`

```js
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const paymentRoutes = require('./routes/payment.routes');
app.use('/api/pay', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Simple M-Pesa Integration is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### `src/routes/payment.routes.js`

```js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rota para pagamento C2B
router.post('/c2b', paymentController.payC2B);

// Rota para pagamento B2C
router.post('/b2c', paymentController.payB2C);

module.exports = router;
```

### `src/controllers/payment.controller.js`

```js

---

## ✅ Checklist para Produção

- [ ] Adicionar logs estruturados com Winston/Pino
- [ ] Adicionar a logica após a confirmação de pagamento
- [ ] implementar transção e uso de base dados 
- [ ] Implementar autenticação e autorização (se necessário)
- [ ] Validar entrada de dados com Joi ou Zod
- [ ] Criar testes automatizados

---

## 🙌 Como Contribuir

1. Faça um fork do repositório  
2. Crie uma branch de feature:

```bash
git checkout -b feature/nome-da-feature
```

3. Faça commit das suas mudanças:

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

4. Faça push para o repositório:

```bash
git push origin feature/nome-da-feature
```

5. Crie um Pull Request na branch `main`

---

## 👨‍💻 Autor

Desenvolvido com 💚 por **Hélio Simango**

---

**Este projeto é apenas para fins educacionais e demonstrações!** 🚀