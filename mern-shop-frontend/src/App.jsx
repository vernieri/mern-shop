import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './pages/Checkout';



function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/cart">🛒 Carrinho</Link> |{" "}
        {user ? (
          <>
            <span>Olá, {user.name}</span> |{" "}
            <button onClick={logout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Registrar</Link>
          </>
        )}
        {user && <Link to="/profile">Área logada</Link>}

      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Rota protegida */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />        



      </Routes>
    </Router>
  );
}

export default App;
