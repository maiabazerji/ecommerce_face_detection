import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            console.log('Fetched products:', data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    const styles = {
        body: {
            margin: '0',
            fontFamily: 'Arial, sans-serif',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6a11cb',
            position: 'relative',
            overflow: 'hidden'
        },
        container: {
            padding: '50px',
            textAlign: 'center',
            maxWidth: '90%',
            margin: '0 auto',
            zIndex: 1
        },
        card: {
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            width: '300px',
            margin: '0 auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s'
        },
        image: {
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            padding: '10px'
        },
        title: {
            fontSize: '1.8em',
            margin: '0 0 10px',
            color: '#6a11cb'
        },
        text: {
            margin: '0 0 5px',
            color: 'black'
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
        },
        link: {
            color: 'white',
            textDecoration: 'none'
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1 style={{ color: '#6a11cb' }}>Check Our Products</h1>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <Slider {...sliderSettings}>
                        {products.map(product => (
                            <div style={styles.card} key={product.id}>
                                <img src={process.env.PUBLIC_URL + product.imageURL} alt={product.name} style={styles.image} />
                                <div style={{ padding: '20px' }}>
                                    <h2 style={styles.title}>{product.name}</h2>
                                    <p style={styles.text}>Price: ${product.price.toFixed(2)}</p>
                                    <button style={styles.button}>
                                        <Link to={`/product/${product.id}`} style={styles.link}>More details</Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default ProductList;
