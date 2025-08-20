## 🛍️ MERN Shop

Fullstack e-commerce application developed with the **MERN** stack (MongoDB, Express, React, Node.js).  
The system allows listing, registering, and managing products, performing login/registration, adding items to the cart, leaving comments, and completing checkout.

---

## 📁 Project Structure

```
mern-shop/
├── mern-shop-frontend/     # React application (Vite)
├── mern-shop-backend/      # Node.js + Express API
```

---

## 📦 Backend (`mern-shop-backend`)

### ▶️ Installation

```bash
cd mern-shop-backend
npm install
```

### ▶️ Run the server

```bash
npm run dev
```

### 🔐 Environment Variables

Create a `.env` file with:

```env
MONGO_URI=mongodb://localhost:27017/mernshop
JWT_SECRET=your_secret_key
PORT=5000
```

### 📌 API Routes

#### 🔐 Authentication

| Method | Route                | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/users/register` | Register a new user      |
| POST   | `/api/users/login`    | Login and return JWT     |

#### 📦 Products

| Method | Route                        | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/products`              | List all products               |
| POST   | `/api/products`              | Create product (authenticated)  |
| GET    | `/api/products/mine`         | List products of logged user    |
| GET    | `/api/products/:id`          | Get product by ID               |
| PUT    | `/api/products/:id`          | Update product (owner)          |
| DELETE | `/api/products/:id`          | Delete product (owner)          |

#### 💬 Reviews

| Method | Route                                | Description                |
|--------|--------------------------------------|----------------------------|
| GET    | `/api/products/:id/reviews`         | List product reviews       |
| POST   | `/api/products/:id/reviews`         | Create review (authenticated) |

---

## 💻 Frontend (`mern-shop-frontend`)

### ▶️ Installation

```bash
cd mern-shop-frontend
npm install
```

### ▶️ Run the application

```bash
npm run dev
```

### 🌐 Features

- ✅ Product listing on homepage  
- ✅ Product detail page  
- ✅ Shopping cart  
- ✅ Checkout with summary + address  
- ✅ Product reviews  
- ✅ Login / Registration  
- ✅ Authenticated area (/profile) with:  
  - Product CRUD  
  - User’s product list  
- ✅ Route protection with JWT  
- ✅ Styling with pure CSS  

---

## 🧪 Technologies Used

- React 19 (Vite)  
- Node.js  
- Express  
- MongoDB (Mongoose)  
- JSON Web Token (JWT)  
- Pure CSS (no Tailwind)  

---

## 🚀 Future Improvements

- 💳 Payment gateway integration  
- ⭐ Star rating system  
- 📦 User orders page  
- ☁️ Deployment with MongoDB Atlas + Render  

---

## 🔒 Authorization

Some routes are protected by `protect` middleware that requires a valid JWT in the header:

```http
Authorization: Bearer <token>
```

---

## 👤 Test User

```
email: admin@email.com
password: admin
```

---

## 🐳 Docker & Docker Compose

### ▶️ Requirements

- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

### ▶️ Build & Run

At the project root (`mern-shop/`), run:

```bash
docker-compose up --build
```

This will:

- Start MongoDB on port `27017`  
- Start backend (Node + Express) on port `5000`  
- Start frontend (Vite + React) on port `5173`  

---

### 🛠️ Container Structure

```yaml
services:
  mongo:
    image: mongo
    ports: [ "27017:27017" ]

  backend:
    build: ./mern-shop-backend
    ports: [ "5000:5000" ]
    environment:
      - MONGO_URI=mongodb://mongo:27017/mernshop
      - JWT_SECRET=your_secret
      - PORT=5000

  frontend:
    build: ./mern-shop-frontend
    ports: [ "5173:5173" ]
    environment:
      - VITE_BACKEND_URL=http://localhost:5000
```

---

### 🌐 Quick Access

- Frontend: http://localhost:5173  
- Backend API: http://localhost:5000/api/products  
- MongoDB: mongodb://localhost:27017 (via MongoDB Compass)  

---

### 💡 Tips

- After code changes: stop (`Ctrl + C`) and run `docker-compose up --build` again  
- To clean everything: `docker-compose down -v`  

---
