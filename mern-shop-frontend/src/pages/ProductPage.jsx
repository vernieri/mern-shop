import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <p>Descrição: {product.description}</p>
    </div>
  );
}

export default ProductPage;
