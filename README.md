# 🛍️ MERN Shop

Aplicação fullstack de e-commerce desenvolvida com a stack **MERN** (MongoDB, Express, React e Node.js).  
O sistema permite listar, cadastrar e gerenciar produtos, realizar login/cadastro, adicionar itens ao carrinho, deixar comentários e realizar checkout.

---

## 📁 Estrutura do Projeto

```
mern-shop/
├── mern-shop-frontend/     # Aplicação React (Vite)
├── mern-shop-backend/      # API Node.js + Express
```

---

## 📦 Backend (`mern-shop-backend`)

### ▶️ Instalação

```bash
cd mern-shop-backend
npm install
```

### ▶️ Executar o servidor

```bash
npm run dev
```

### 🔐 Variáveis de ambiente

Crie um `.env` com:

```env
MONGO_URI=mongodb://localhost:27017/mernshop
JWT_SECRET=sua_chave_secreta
PORT=5000
```

### 📌 Rotas da API

#### 🔐 Autenticação

| Método | Rota                  | Descrição                    |
|--------|------------------------|------------------------------|
| POST   | `/api/users/register` | Cadastrar novo usuário       |
| POST   | `/api/users/login`    | Login e retorno do JWT       |

#### 📦 Produtos

| Método | Rota                          | Descrição                              |
|--------|-------------------------------|----------------------------------------|
| GET    | `/api/products`              | Listar todos os produtos               |
| POST   | `/api/products`              | Criar produto (autenticado)            |
| GET    | `/api/products/mine`         | Listar produtos do usuário logado      |
| GET    | `/api/products/:id`          | Buscar produto por ID                  |
| PUT    | `/api/products/:id`          | Atualizar produto (dono)               |
| DELETE | `/api/products/:id`          | Excluir produto (dono)                 |

#### 💬 Comentários

| Método | Rota                                | Descrição                       |
|--------|--------------------------------------|---------------------------------|
| GET    | `/api/products/:id/reviews`         | Listar comentários de produto   |
| POST   | `/api/products/:id/reviews`         | Criar comentário (autenticado)  |

---

## 💻 Frontend (`mern-shop-frontend`)

### ▶️ Instalação

```bash
cd mern-shop-frontend
npm install
```

### ▶️ Executar a aplicação

```bash
npm run dev
```

### 🌐 Funcionalidades

- ✅ Listagem de produtos na página inicial
- ✅ Página de detalhe do produto
- ✅ Carrinho de compras
- ✅ Checkout com resumo + endereço
- ✅ Comentários por produto
- ✅ Login / Cadastro
- ✅ Área logada (/profile) com:
  - CRUD de produtos
  - Lista de produtos do usuário
- ✅ Proteção de rotas com JWT
- ✅ Estilização com CSS puro

---

## 🧪 Tecnologias utilizadas

- React 19 (Vite)
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- CSS puro (sem Tailwind)

---

## 🚀 Futuras melhorias

- 💳 Integração com gateway de pagamento
- ⭐ Sistema de avaliações com estrelas
- 📦 Tela de pedidos do usuário
- ☁️ Deploy com MongoDB Atlas + Render

---

## 🔒 Autorizações

Algumas rotas são protegidas por middleware `protect` que exige JWT válido no header:

```http
Authorization: Bearer <token>
```

---

## 👤 Usuário de teste

```
email: admin@email.com
senha: admin
```

---

## 📸 Prints e demonstrações

Adicione aqui imagens da interface e demonstrações se desejar.
