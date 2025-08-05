import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Oculta após 2 segundos
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
          borderRadius: '6px',
          marginBottom: '12px',
        }}
      />

      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">R$ {product.price.toFixed(2)}</p>

      <Link to={`/product/${product._id}`}>Ver mais</Link>
      <button onClick={handleAddToCart} className="product-button">
        Comprar
      </button>

      {added && (
        <p style={{
          marginTop: '10px',
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          Adicionado ao Carrinho!
        </p>
      )}
    </div>
  );
}

export default ProductCard;