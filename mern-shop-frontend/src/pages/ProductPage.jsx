import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) return <p>Produto não encontrado</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', display: 'flex', gap: '2rem' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '50%',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '28px', marginBottom: '1rem' }}>{product.name}</h2>
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '1rem' }}>
          {product.description}
        </p>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
          R$ {product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '1.5rem',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
