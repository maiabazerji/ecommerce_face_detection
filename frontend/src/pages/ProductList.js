import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/data/fakeData.json')
            .then(response => {
                console.log('Fetched data:', response.data);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('Fetched data is not an array:', response.data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/products');
          const data = await response.json();
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

    const styles = {
        body: {
            backgroundColor: '#e6e6fa', 
            margin: '0',
            fontFamily: 'Arial, sans-serif'
        },
        container: {
            padding: '100px',
            textAlign: 'center',
            maxWidth: '90%',
            margin: '0 auto'
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
        cardHover: {
            transform: 'scale(1.05)'
        },
        image: {
            width: '100%',
            height: '200px', // Reduced height for a smaller appearance
            objectFit: 'contain', // Ensure the whole image is visible, no cropping
            padding: '10px' // Optional: Adds some padding to give the image some space
        },
        info: {
            padding: '16px'
        },
        title: {
            fontSize: '1.5em',
            margin: '0 0 10px'
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
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        link: {
            color: 'white',
            textDecoration: 'none'
        },
        slickArrow: {
            zIndex: 1,
            color: 'light blue',
            background: 'rgba(255, 255, 255, 0.5)', 
            borderRadius: '50%',
            padding: '10px',
            width: '40px',
            height: '40px'
        },
        slickArrowHover: {
            background: 'rgba(255, 255, 255, 0.8)'
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1>Check our Products</h1>
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    <Slider {...sliderSettings}>
                        {products.map(product => (
                            <div style={styles.card} key={product._id}>
                                <img src={product.image} alt={product.name} style={styles.image} />
                                <div style={styles.info}>
                                    <h2 style={styles.title}>{product.name}</h2>
                                    <p style={styles.text}>{product.brand}</p>
                                    <p style={styles.text}>Rating: {product.rating}</p>
                                    <p style={styles.text}>Number of Reviews: {product.numReviews}</p>
                                    <button style={styles.button}>
                                        <Link to={`/product/${product._id}`} style={styles.link}>More details</Link>
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
