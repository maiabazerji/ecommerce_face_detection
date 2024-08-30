import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container for the homepage
const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Title styling
const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

// Section for quotes
const QuoteSection = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  width: 80%;
  max-width: 600px;
`;

// Quote text styling
const Quote = styled.p`
  font-size: 1.5rem;
  color: #00796b;
  font-style: italic;
  margin: 0;
`;

// Quote author styling
const Author = styled.p`
  font-size: 1rem;
  color: #004d40;
  text-align: right;
  margin-top: 10px;
`;

// Styled link button
const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


// Additional content section
const AdditionalContent = styled.div`
  max-width: 800px;
  margin: 20px 0;
`;

// Main component
const Home = () => {
  const [, setProducts] = useState([]);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    // Fetch product images from an API or local data
    fetch("/api/products") // Example endpoint
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error("Error fetching products:", error));

    // Example of fetching username if the user is logged in
    // For demonstration purposes, assuming username is fetched from local storage or context
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <HomeContainer>
      <Title>Welcome to Our Tech Store</Title>
      <QuoteSection>
        <Quote>"Technology is best when it brings people together."</Quote>
        <Author>- Matt Mullenweg</Author>
      </QuoteSection>
      <h2>Hello, {username}!</h2>
      <AdditionalContent>
        <p>
          Explore the latest in technology with our wide range of products. From cutting-edge gadgets to essential accessories, we have everything you need to stay ahead in the tech world. 
        </p>
        <p>
          Discover our top picks and find the perfect product for your needs.
        </p>
      </AdditionalContent>
      <ButtonLink to="/products">Shop Now</ButtonLink>

      <ButtonLink to="/cart">View Cart</ButtonLink>
    </HomeContainer>
  );
};

export default Home;
