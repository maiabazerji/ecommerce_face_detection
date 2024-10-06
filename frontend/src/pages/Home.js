import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Gradient background animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container for the homepage with gradient and animation
const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(-45deg, #1e88e5, #7b1fa2, #5e35b1, #00bcd4);
  background-size: 400% 400%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${backgroundAnimation} 15s ease infinite;
`;

// Fade-in animation for elements
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Title styling with tech-inspired colors
const Title = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

// Section for quotes with hover effect
const QuoteSection = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

// Quote text styling
const Quote = styled.p`
  font-size: 1.5rem;
  color: #ffeb3b;
  font-style: italic;
  margin: 0;
`;

// Quote author styling
const Author = styled.p`
  font-size: 1rem;
  color: #ffc107;
  text-align: right;
  margin-top: 10px;
`;

// Styled link button with hover effect
const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  background-color: #43a047;
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #388e3c;
    transform: scale(1.1);
  }
`;

// Additional content section with subtle animations
const AdditionalContent = styled.div`
  max-width: 800px;
  margin: 20px 0;
  font-size: 1.2rem;
  color: #e0f7fa;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

// Main component
const Home = () => {
  const [, setProducts] = useState([]);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    fetch("/api/products") // Example endpoint
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error("Error fetching products:", error));

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <HomeContainer>
      <Title>IT Solutions: Web Dev, AI & Cybersecurity</Title>
      <QuoteSection>
        <Quote>"Innovating the digital world, one solution at a time."</Quote>
        <Author>- Your Tech Partner</Author>
      </QuoteSection>
      <h2 style={{ color: "#fff" }}>Hello, {username}!</h2>
      <AdditionalContent>
        <p>
          We offer cutting-edge IT services, including web development, AI integration, and cybersecurity solutions.
          Stay secure, innovate faster, and grow your digital presence with our expert team.
        </p>
        <p>
          Discover how we can bring your vision to life.
        </p>
      </AdditionalContent>
      <ButtonLink to="/products">Explore Our Services</ButtonLink>
      <ButtonLink to="/contact">Get In Touch</ButtonLink>
    </HomeContainer>
  );
};

export default Home;
