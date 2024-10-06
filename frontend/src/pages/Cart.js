import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

// Make sure your logo image is located in the public folder
const Container = styled.div`
    padding: 20px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    background-image: url('/BazerjiCode.png');
    background-size: cover; 
    background-position: center; 
    min-height: 100vh; 
    position: relative; 
    opacity: 0.9; // Make the background slightly transparent for better visibility
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #fff; // Change text color to white for visibility
`;

const CartItem = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    margin: 10px auto;
    width: 80%;
    background: rgba(255, 255, 255, 0.8); // Semi-transparent white background
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
    margin-bottom: 5px;

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

// New styled component for button container
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between; // Distribute buttons evenly
    align-items: center;             // Center items vertically
    width: 100%;                     // Full width
    max-width: 600px;               // Maximum width
    margin: 20px auto;              // Center the container
    background: transparent;         // Set background to transparent
    padding: 10px;                   // Add some padding
    border-radius: 8px;             // Rounded corners
`;

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); // Navigate back to the home page
    };

    const handleBackToProduct = () => {
        navigate('/products'); // Navigate to the products page
    };

    return (
        <Container>
            <Title>Shopping Cart</Title>
            {cart.length === 0 ? (
                <p style={{ color: '#fff' }}>Your cart is empty</p>
            ) : (
                <>
                    {cart.map(item => {
                        const totalPrice = item.price * item.quantity; // Calculate total price
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
                                        <FaTrashAlt />
                                        Remove
                                    </Button>
                                </CartItemButtons>
                            </CartItem>
                        );
                    })}
                </>
            )}
            {/* Button container with three buttons */}
            <ButtonContainer>
                <ClearButton onClick={clearCart}>
                    Clear Cart
                </ClearButton>
                <AddMoreButton onClick={handleBackToProduct}>
                    Add More Items
                </AddMoreButton>
                <HomeButton onClick={handleBackToHome}>
                    Back to Home
                </HomeButton>
            </ButtonContainer>
        </Container>
    );
};

export default Cart;
