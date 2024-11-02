import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SlideshowContainer = styled.div`
    max-width: 300px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.5); // Set to a transparent white
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 400px; // Set a height for the vertical slideshow
`;

const ProductItem = styled.div`
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.7); // Slightly darker on hover for better visibility
    }
`;

const Title = styled.h3`
    margin: 0;
    font-size: 1.2em;
    color: #333; // Text color can be adjusted for better contrast
`;

const VerticalSlideshow = ({ onSelectProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:8080/products'); // Adjust the endpoint as needed
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setError("Failed to fetch products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <SlideshowContainer>
            {products.map((product) => (
                <ProductItem key={product.id} onClick={() => onSelectProduct(product)}>
                    <Title>{product.name}</Title>
                </ProductItem>
            ))}
        </SlideshowContainer>
    );
};

export default VerticalSlideshow;
