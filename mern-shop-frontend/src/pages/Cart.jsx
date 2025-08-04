import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

<Link to="/cart">Ver Carrinho</Link>

function Cart() {
  const { cart, dispatch } = useCart();

  console.log("Carrinho:", cart); // 🔍 Veja o estado no console
  

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Carrinho de Compras</h2>

      {/* Debug visual */}
      <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
        {JSON.stringify(cart.items, null, 2)}
      </pre>

      {cart.items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.items.map(({ product, quantity }) => (
            <li key={product._id} style={{ marginBottom: '1rem' }}>
              <strong>{product.name}</strong><br />
              R$ {product.price.toFixed(2)} × {quantity}<br />
              <button onClick={() => handleRemove(product._id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
