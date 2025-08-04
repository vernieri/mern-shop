import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { dispatch } = useCart();

const handleAddToCart = () => {
  console.log("Adicionando ao carrinho:", product); // ← importante
  dispatch({ type: 'ADD_TO_CART', payload: product });
};

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <Link to={`/product/${product._id}`}>Ver mais</Link>
      <br />
      <button onClick={handleAddToCart}>Comprar</button>
    </div>
  );
}

export default ProductCard;
