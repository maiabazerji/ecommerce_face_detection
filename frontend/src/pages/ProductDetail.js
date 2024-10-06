import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';

// Styled Components
const Body = styled.div`
    background-image: url('logo.jpg');
`;

const Container = styled.div`
    display: flex;
    padding: 20px;
    max-width: 100%;
    margin: auto;
    background: linear-gradient(270deg, rgba(0, 0, 128, 1), rgba(128, 0, 128, 1), rgba(0, 0, 0, 1));
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

const Card = styled.div`
    width: 500px;
    padding: 70px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: 10px;
`;

const Info = styled.div`
    padding: 10px;
    text-align: left;
`;

const Title = styled.h2`
    font-size: 1.5em;
    margin: 0 0 10px;
    color: #333;
    animation: fadeIn 0.5s;
`;

const Text = styled.p`
    margin: 0 0 8px;
    color: #555;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.response ? err.response.data.error : err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Body>
            <Container>
                {product ? (
                    <Card>
                        <Image src={product.image_url} alt={product.name} />
                        <Info>
                            <Title>{product.name}</Title>
                            <Text>Price: ${product.price}</Text>
                            <Text>Category: {product.category}</Text>
                            <Button onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </Info>
                    </Card>
                ) : (
                    <p>Product not found</p>
                )}
            </Container>
        </Body>
    );
};

export default ProductDetails;
