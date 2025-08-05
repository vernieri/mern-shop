import express from 'express';
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllProducts);
//router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.post('/', protect, createProduct); // << agora só logado pode criar

export default router;





/*
curl -X PUT http://localhost:5000/api/products/688b7e03c34e41bc7bfde69e \
  -H "Content-Type: application/json" \
  -d '{"name":"Camiseta TechFit", "price": 99.99}'
*/