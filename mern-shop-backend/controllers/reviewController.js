import Product from '../models/Product.js';

export const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    res.json(product.reviews);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar comentários' });
  }
};

export const addReview = async (req, res) => {
  const { comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    const newReview = {
      user: req.user._id,
      name: req.user.name,
      comment,
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
  } catch {
    res.status(500).json({ message: 'Erro ao adicionar comentário' });
  }
};
