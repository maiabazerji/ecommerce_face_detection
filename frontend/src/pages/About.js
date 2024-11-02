import React from "react";
import styled, { keyframes } from "styled-components";
import { FaLaptopCode, FaShieldAlt, FaBrain } from "react-icons/fa"; // Importing icons

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

// Service List with icons styling
const ServiceList = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
`;

const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;

  // Link styling
  a {
    color: white;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      color: purple; // Change color to purple on hover
    }

    &:active {
      color: purple; // Change color to purple when clicking
    }
  }
`;

// Main About Component
const About = () => {
  return (
    <AboutContainer>
      <Title>About Us</Title>
      <Description>
        Hi, I’m a passionate student from Epitech launching an innovative e-commerce platform dedicated to providing 
        advanced IT services. With a strong focus on <b>web development</b>, <b>AI integration</b>, and <b>cybersecurity</b>, 
        I’m here to help businesses and individuals harness the power of technology.
      </Description>
      <ServiceList>
        <ServiceItem>
          <a href="/pdfs/webdev-code-coffee.pdf" download>
            <FaLaptopCode size={50} />
            <p>Web Development</p>
          </a>
        </ServiceItem>
        <ServiceItem>
          <a href="/pdfs/ai-integration.pdf" download>
            <FaBrain size={50} />
            <p>AI Integration</p>
          </a>
        </ServiceItem>
        <ServiceItem>
          <a href="/pdfs/cybersecurity.pdf" download>
            <FaShieldAlt size={50} />
            <p>Cybersecurity</p>
          </a>
        </ServiceItem>
      </ServiceList>
      <AdditionalInfo>
        <p>
          My journey at <b>Epitech</b> has driven me to push boundaries and create solutions that reflect the ever-evolving digital landscape.
          This platform is not just a service – it's a vision of where I believe the future of technology is heading.
        </p>
        <p>
          Whether you're looking to transform your online presence with a robust website, integrate smart AI solutions into your business,
          or safeguard your data with state-of-the-art cybersecurity tools, I've got you covered. Together, let's shape the future of tech!
        </p>
        <p>
          Explore the range of services I offer and find out how we can collaborate to bring your vision to life.
        </p>
      </AdditionalInfo>
    </AboutContainer>
  );
};

export default About;
