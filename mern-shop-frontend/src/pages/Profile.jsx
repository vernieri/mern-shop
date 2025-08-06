import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [productId, setProductId] = useState('');
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [myProducts, setMyProducts] = useState([]);

  const token = user?.token;

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loadMyProducts = async () => {
    try {
      const res = await api.get('/products/mine');
      setMyProducts(res.data);
    } catch {
      setMyProducts([]);
    }
  };

  useEffect(() => {
    loadMyProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createProduct = async () => {
    try {
      await api.post('/products', form);
      setMessage('✅ Produto criado com sucesso!');
      setForm({ name: '', price: '', description: '', image: '' });
      loadMyProducts();
    } catch {
      setMessage('❌ Erro ao criar produto');
    }
  };

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${productId}`);
      setLoadedProduct(res.data);
      setForm(res.data);
      setMessage('🔎 Produto carregado');
    } catch {
      setMessage('❌ Produto não encontrado');
    }
  };

  const updateProduct = async () => {
    try {
      await api.put(`/products/${productId}`, form);
      setMessage('✏️ Produto atualizado com sucesso!');
      loadMyProducts();
    } catch {
      setMessage('❌ Erro ao atualizar produto');
    }
  };

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${productId}`);
      setMessage('🗑️ Produto removido com sucesso!');
      setLoadedProduct(null);
      setForm({ name: '', price: '', description: '', image: '' });
      setProductId('');
      loadMyProducts();
    } catch {
      setMessage('❌ Erro ao remover produto');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Área do usuário</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>📦 Meus produtos</h3>
        {myProducts.length === 0 ? (
          <p>Você ainda não cadastrou produtos.</p>
        ) : (
          <ul>
            {myProducts.map(prod => (
              <li key={prod._id} style={{ marginBottom: '1rem' }}>
                <strong>{prod.name}</strong> – R$ {prod.price.toFixed(2)}<br />
                <button
                  onClick={() => {
                    setProductId(prod._id);
                    setForm({
                      name: prod.name,
                      price: prod.price,
                      description: prod.description,
                      image: prod.image,
                    });
                    setLoadedProduct(prod);
                    window.scrollTo(0, document.body.scrollHeight);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    await api.delete(`/products/${prod._id}`);
                    setMessage('Produto deletado!');
                    setMyProducts(prev => prev.filter(p => p._id !== prod._id));
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>🆕 Criar novo produto</h3>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
        <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <input name="image" placeholder="URL da imagem" value={form.image} onChange={handleChange} />
        <button onClick={createProduct}>Criar</button>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>🔍 Consultar produto por ID</h3>
        <input value={productId} onChange={e => setProductId(e.target.value)} placeholder="ID do produto" />
        <button onClick={getProduct}>Buscar</button>
      </section>

      {loadedProduct && (
        <section style={{ marginBottom: '2rem' }}>
          <h3>✏️ Editar produto</h3>
          <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
          <input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
          <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
          <input name="image" placeholder="URL da imagem" value={form.image} onChange={handleChange} />
          <button onClick={updateProduct}>Atualizar</button>
          <button onClick={deleteProduct} style={{ marginLeft: '10px' }}>Excluir</button>
        </section>
      )}

      {message && (
        <p style={{ backgroundColor: '#eee', padding: '0.5rem', borderRadius: '4px' }}>{message}</p>
      )}
    </div>
  );
}

export default Profile;
