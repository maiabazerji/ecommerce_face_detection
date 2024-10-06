import React from "react";
import styled, { keyframes } from "styled-components";

// Background animation with a purple base
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container for the About page with purple gradient background
const AboutContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(-45deg, #6a1b9a, #8e24aa, #7b1fa2, #512da8); /* Shades of purple */
  background-size: 400% 400%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${backgroundAnimation} 10s ease infinite;
  color: #fff;
`;

// Title styling with animations
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  color: #f3e5f5; /* Light purple */
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${backgroundAnimation} 2s ease-in-out;
`;

// Description text with subtle fade-in effect
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

const Description = styled.p`
  font-size: 1.5rem;
  max-width: 900px;
  line-height: 1.8;
  margin: 0 auto;
  animation: ${fadeIn} 1.5s ease-in-out;
  color: #e1bee7; /* Light purple */
`;

// Additional Info Section with animations
const AdditionalInfo = styled.div`
  margin-top: 30px;
  font-size: 1.2rem;
  max-width: 700px;
  line-height: 1.6;
  color: #d1c4e9; /* Light purple */
  animation: ${fadeIn} 2s ease-in-out;
`;

// Main About Component
const About = () => {
  return (
    <AboutContainer>
      <Title>About Us</Title>
      <Description>
        Welcome to our e-commerce platform, your gateway to cutting-edge IT solutions. 
        We specialize in web development, AI integration, and cybersecurity services designed to empower your business.
        Our mission is to provide high-quality solutions that push boundaries in the digital world.
      </Description>
      <AdditionalInfo>
        <p>
          From AI-powered applications to secure web platforms, we offer the expertise you need to stay ahead in the tech industry.
        </p>
        <p>
          Explore our services and discover how we can transform your digital presence.
        </p>
      </AdditionalInfo>
    </AboutContainer>
  );
};

export default About;
