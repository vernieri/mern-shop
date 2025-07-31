import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <Link to={`/product/${product._id}`}>Ver mais</Link>
    </div>
  );
}

export default ProductCard;
