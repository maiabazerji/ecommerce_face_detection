import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; 
import Home from "./pages/Home";
import Products from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/blog";
import GlobalStyle from "./globalStyles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartProvider";
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './i18n'; 

// Define the App component
const App = () => {
  return (
    <CartProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productList" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} /> 
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};


export default App; 