import Product from '../models/Product.js';


// Listar todos os produtos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

// Criar novo produto
export const createProduct = async (req, res) => {
//console.log('Usuário autenticado:', req.user);  
  try {
    const { name, description, price, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      user: req.user._id,  // << AQUI
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar produto' });
  }
};


// Buscar produto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar produto' });
  }
};

// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover produto' });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar seus produtos' });
  }
};
