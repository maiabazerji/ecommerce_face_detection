import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const navigate = useNavigate(); 

    const styles = {
        container: {
            padding: '20px',
            textAlign: 'center'
        },
        cartItem: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            alignItems: 'center'
        },
        cartItemImage: {
            width: '100px',
            height: '100px',
            objectFit: 'cover'
        },
        cartItemInfo: {
            flex: '1',
            marginLeft: '20px',
            textAlign: 'left'
        },
        cartItemButtons: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background-color 0.3s'
        },
        quantityButton: {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '7px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '5px',
            transition: 'background-color 0.3s'
        },
        clearButton: {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        },
        homeButton: {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'background-color 0.3s'
        }
    };

    const handleBackToHome = () => {
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div style={styles.container}>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item._id} style={styles.cartItem}>
                            <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                            <div style={styles.cartItemInfo}>
                                <h4>{item.name}</h4>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div style={styles.cartItemButtons}>
                                <button style={styles.quantityButton} onClick={() => decreaseQuantity(item._id)}>
                                    -
                                </button>
                                <button style={styles.quantityButton} onClick={() => increaseQuantity(item._id)}>
                                    +
                                </button>
                                <button style={styles.button} onClick={() => removeFromCart(item._id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))} 
                    <br/>
                    <button style={styles.clearButton} onClick={clearCart}>
                        Clear Cart
                    </button>
                </>
            )}
            <br/>
            <button style={styles.homeButton} onClick={handleBackToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default Cart;
