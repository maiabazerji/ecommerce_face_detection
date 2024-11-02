import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartProvider';
import styled from 'styled-components';
import Slideshow from './Slideshow'; 

// Styled components
const Body = styled.div`
    background-image: url('logo.jpg');
    min-height: 100vh;
    background-size: cover;
`;

const Container = styled.div`
    display: flex;
    padding: 20px;
    max-width: 100%;
    margin: auto;
    background: linear-gradient(270deg, rgba(0, 0, 128, 0.7), rgba(128, 0, 128, 0.7), rgba(0, 0, 0, 0.7));
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
`;

const Card = styled.div`
    width: 500px;
    padding: 30px;
    margin: 20px auto;
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
    max-width: 100%;
    border-radius: 20px;
`;

const Info = styled.div`
    margin-top: 15px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const Text = styled.p`
    font-size: 16px;
    color: #666;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 10px;
    background-color: #4CAF50; /* Green */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049; /* Darker green */
    }
`;

const LoadingIndicator = styled.div`
    font-size: 18px;
    text-align: center;
    color: #007BFF; /* Bootstrap primary color */
`;

const ErrorMessage = styled.div`
    font-size: 18px;
    text-align: center;
    color: red;
`;

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
                setError("Failed to fetch product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    // Function to handle product selection from slideshow
    const handleSelectProduct = (selectedProduct) => {
        setProduct(selectedProduct);
    };

    if (loading) {
        return <LoadingIndicator>Loading product details...</LoadingIndicator>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Body>
            <Container>
                <ContentWrapper>
                    <Slideshow onSelectProduct={handleSelectProduct} /> 
                    <Card>
                        <Image src={product.image_url || 'placeholder.jpg'} alt={product.name} />
                        <Info>
                            <Title>{product.name}</Title>
                            <Text>Price: ${product.price}</Text>
                            <Text>Description: {product.description}</Text>
                            <Text>Category: {product.category}</Text>
                            <Button onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </Info>
                    </Card>
                </ContentWrapper>
            </Container>
        </Body>
    );
};

export default ProductDetails;
