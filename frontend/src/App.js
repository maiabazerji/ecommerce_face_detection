import React, { useEffect, useState } from "react"; // Add useState and useEffect
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GlobalStyle from "./globalStyles";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext"; 
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App = () => {
  // Add state to store backend response
  const [, setData] = useState('');

  // Use useEffect to fetch data from backend on component mount
  useEffect(() => {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => setData(data.message))  // Store response in state
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <CartProvider>
      <Router>
        <GlobalStyle />
        <Header />
        {/* Display backend response (Optional) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productList" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
