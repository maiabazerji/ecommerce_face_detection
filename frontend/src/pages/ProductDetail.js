import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; 

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext); 
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]); // State for all products
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/data/fakeData.json')
            .then(response => {
                setProducts(response.data); // Set all products
                const foundProduct = response.data.find(p => p._id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching product data');
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    const styles = {
        body: {
            backgroundColor: '#e6e6fa', 
            margin: '0',
            fontFamily: 'Arial, sans-serif'
        },
        container: {
            display: 'flex',
            padding: '20px',
            textAlign: 'center',
            maxWidth: '80%',
            margin: 'auto',
            backgroundColor: "#f9f9f9"
        },
        sideMenu: {
            width: '30%',
            padding: '7px',
            borderRight: '1px solid #ddd',
            overflowY: 'scroll',
            height: '100vh',
            textAlign: 'left'
        },
        productItem: {
            marginBottom: '10px',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '5px',
            transition: 'background-color 0.3s'
        },
        selectedProductItem: {
            border: '1px solid #007bff', // Blue frame for selected product
            backgroundColor: '#f0f8ff', // Light blue background for selected product
        },
        card: {
            width: '75%',
            padding: '30px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s',
            margin: 'auto'
        },
        image: {
            width: '100%',
            height: '300px',
            objectFit: 'contain'
        },
        info: {
            padding: '16px',
            textAlign: 'left',
            width: '100%'
        },
        title: {
            fontSize: '1.8em',
            margin: '0 0 10px'
        },
        text: {
            margin: '0 0 8px',
            color: '#555'
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.sideMenu}>
                {products.map((item) => (
                    <div
                        key={item._id}
                        style={item._id === id ? { ...styles.productItem, ...styles.selectedProductItem } : styles.productItem}
                        onClick={() => navigate(`/product/${item._id}`)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <div style={styles.card}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <div style={styles.info}>
                    <h2 style={styles.title}>{product.name}</h2>
                    <p style={styles.text}><strong>Brand:</strong> {product.brand}</p>
                    <p style={styles.text}><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    <p style={styles.text}><strong>Rating:</strong> {product.rating}</p>
                    <p style={styles.text}><strong>Number of Reviews:</strong> {product.numReviews}</p>
                    <p style={styles.text}><strong>Description:</strong> {product.description}</p>
                    <button style={styles.button} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
