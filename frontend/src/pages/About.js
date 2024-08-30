// src/pages/About.js
import React from "react";
import styled from "styled-components";

// Styled Components
const AboutContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #e8f4f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  max-width: 800px;
  line-height: 1.6;
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>About Us</Title>
      <Description>
        Welcome to our store! We are dedicated to providing the best products to our customers. Our mission is to offer high-quality items at affordable prices. We believe in customer satisfaction and strive to make your shopping experience enjoyable.
      </Description>
    </AboutContainer>
  );
};

export default About;
