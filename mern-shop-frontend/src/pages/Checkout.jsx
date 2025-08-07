import { useCart } from '../context/CartContext';
import { useState } from 'react';

function Checkout() {
  const { cart, dispatch } = useCart();
  const [address, setAddress] = useState('');

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    alert('Pedido confirmado!');
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Checkout</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Endereço de entrega</h3>
        <textarea
          placeholder="Digite seu endereço completo..."
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Resumo do Pedido</h3>
        <ul>
          {cart.items.map(({ product, quantity }) => (
            <li key={product._id}>
              {product.name} × {quantity} — R$ {(product.price * quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
      </div>

      <button onClick={handleConfirm}>Confirmar Pedido</button>
    </div>
  );
}

export default Checkout;
