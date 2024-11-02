import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            return; // Prevent adding the same item again
        }
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const increaseQuantity = (id) => {
        setCart(cart.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id) => {
        setCart(cart.map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider; 
