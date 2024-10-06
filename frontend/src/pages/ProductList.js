import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
    const [products, setProducts] = useState([]); // Updated to 'products'

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched products:', data); // Log fetched data
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
      

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,  // Show 1 product per slide
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true // Show left and right arrows
    };

    // Inline styles
    const styles = {
        body: {
            animation: 'gradient 5s ease infinite',
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
        '@keyframes gradient': {
            '0%': { backgroundColor: '#6a11cb' },
            '50%': { backgroundColor: '#2575fc' },
            '100%': { backgroundColor: '#6a11cb' }
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
        },
        link: {
            color: 'white',
            textDecoration: 'none'
        },
        slickArrow: {
            zIndex: 1,
            color: 'lightblue',
            background: 'rgba(255, 255, 255, 0.5)', 
            borderRadius: '50%',
            padding: '10px',
            width: '40px',
            height: '40px'
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1 style={{ color: '#6a11cb' }}>Check Our Products</h1> 
                {products.length === 0 ? (
                    <p>No products available.</p> // Message updated
                ) : (
                    <Slider {...sliderSettings}>
                        {products.map(product => (
                            <div style={styles.card} key={product.id}>
                                <img src={product.image_url} alt={product.name} style={styles.image} />
                                <div style={{ padding: '80px' }}>
                                    <h2 style={styles.title}>{product.name}</h2>
                                    <p style={styles.text}>Price: ${product.price}</p>
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
