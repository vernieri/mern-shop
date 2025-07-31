import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Lista todos os produtos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Criar produto (POST opcional para testes)
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });
  await newProduct.save();
  res.status(201).json(newProduct);
});

export default router;