import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

const Container = styled.div`
    padding: 20px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    background-image: url('./logo/BazerjiCode.png');
    background-size: cover; 
    background-position: center; 
    min-height: 100vh; 
    position: relative; 
    opacity: 0.9;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #fff;
`;

const CartItem = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    margin: 10px auto;
    width: 80%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02);
    }
`;

const CartItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

const CartItemInfo = styled.div`
    flex: 1;
    margin-left: 10px;
    text-align: left;
`;

const CartItemButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const QuantityButton = styled(Button)`
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;

const ClearButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

const HomeButton = styled(Button)`
    background-color: #28a745;
    margin-top: 20px;

    &:hover {
        background-color: #218838;
    }
`;

const AddMoreButton = styled(Button)`
    background-color: #007bff;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    background: transparent;
    padding: 10px;
    border-radius: 8px;
`;

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); 
    };

    const handleBackToProduct = () => {
        navigate('/products'); 
    };

    return (
        <Container>
            <Title>Shopping Cart</Title>
            {cart.length === 0 ? (
                <p style={{ color: '#fff' }}>Your cart is empty</p>
            ) : (
                <>
                    {cart.map(item => {
                        const totalPrice = item.price * item.quantity;
                        return (
                            <CartItem key={item._id} whileHover={{ scale: 1.05 }}>
                                <CartItemImage src={item.image} alt={item.name} />
                                <CartItemInfo>
                                    <h4 style={{ color: '#333' }}>{item.name}</h4>
                                    <p>Price per item: <span style={{ color: '#007bff' }}>${item.price.toFixed(2)}</span></p>
                                    <p>Quantity: <span style={{ color: '#28a745' }}>{item.quantity}</span></p>
                                    <p>Total Price: <span style={{ color: '#dc3545' }}>${totalPrice.toFixed(2)}</span></p>
                                </CartItemInfo>
                                <CartItemButtons>
                                    <QuantityButton onClick={() => decreaseQuantity(item._id)}>
                                        <FaMinus />
                                    </QuantityButton>
                                    <QuantityButton onClick={() => increaseQuantity(item._id)}>
                                        <FaPlus />
                                    </QuantityButton>
                                    <Button onClick={() => removeFromCart(item._id)}>
                                        <FaTrashAlt /> Remove
                                    </Button>
                                </CartItemButtons>
                            </CartItem>
                        );
                    })}
                </>
            )}
            <ButtonContainer>
                <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
                <AddMoreButton onClick={handleBackToProduct}>Add More Items</AddMoreButton>
                <HomeButton onClick={handleBackToHome}>Back to Home</HomeButton>
            </ButtonContainer>
        </Container>
    );
};

export default Cart;
