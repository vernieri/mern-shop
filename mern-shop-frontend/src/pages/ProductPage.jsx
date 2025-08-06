import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductPage() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null));

    axios.get(`http://localhost:5000/api/products/${id}/reviews`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Comentário enviado com sucesso!');
      setComment('');
      setReviews(prev => [...prev, { name: user.name, comment }]);
    } catch {
      setMessage('Erro ao enviar comentário.');
    }
  };

  if (!product) return <p>Produto não encontrado</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
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

      <hr style={{ margin: '2rem 0' }} />

      <div>
        <h3>Comentários</h3>
        {reviews.length === 0 && <p>Este produto ainda não possui comentários.</p>}
        <ul>
          {reviews.map((rev, idx) => (
            <li key={idx} style={{ marginBottom: '1rem' }}>
              <strong>{rev.name}</strong>: {rev.comment}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Adicionar um comentário</h4>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows="3"
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <button onClick={handleCommentSubmit}>Enviar</button>
        </div>
      )}

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ProductPage;
