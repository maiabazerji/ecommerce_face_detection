import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Gradient background animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main container styling
const HomeContainer = styled.div`
  text-align: center;
  padding: 60px;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #e94560);
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
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Title styling
const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

// Subtitle styling
const Subtitle = styled.h2`
  font-size: 1.75rem;
  color: #f0f0f0;
  margin-bottom: 40px;
`;

// Container for the quotes arranged flexibly
const QuotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 30px 0;
  gap: 20px; // Adds spacing between quotes
`;

// Section for individual quotes
const QuoteSection = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 45%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 1.5s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }
`;

// Quote text styling
const Quote = styled.p`
  font-size: 1.4rem;
  color: #f9c74f;
  font-style: italic;
  margin: 0;
`;

// Quote author styling
const Author = styled.p`
  font-size: 1rem;
  color: #f0a500;
  text-align: right;
  margin-top: 10px;
`;

// Additional content section
const AdditionalContent = styled.div`
  max-width: 800px;
  margin: 30px 0;
  font-size: 1.1rem;
  color: #e0e0e0;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

// Project Images Section
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

// Individual Project Image
const ProjectImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Certifications and Client Logos Section
const SocialProofSection = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const ClientLogo = styled.img`
  max-width: 150px;
  height: auto;
`;

// Main component
const Home = () => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    fetch("/api/products")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setProducts(data.products))
      .catch(error => console.error("Error fetching products:", error));

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <HomeContainer>
      <Title>Transform Your Online Business</Title>
      <Subtitle>Expert IT Solutions for Your eCommerce Needs</Subtitle>
      <QuotesContainer>
        <QuoteSection>
          <Quote>💡 "Innovating the digital world for your success!"</Quote>
          <Author>- BazerjiCode</Author>
        </QuoteSection>

        <QuoteSection>
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Quote>🚀 "Building Tomorrow's Online Success Today!"</Quote>
          </Link>
          <Author>- BazerjiCode</Author>
        </QuoteSection>

        <QuoteSection>
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Quote>📞 "Let’s turn your ideas into reality - Reach out today!"</Quote>
          </Link>
          <Author>- BazerjiCode</Author>
        </QuoteSection>

        <QuoteSection>
          <Quote>🌐 "Empowering brands with innovative tech solutions."</Quote>
          <Author>- BazerjiCode</Author>
        </QuoteSection>
      </QuotesContainer>

      <AdditionalContent>
        <p>Check out some of our recent projects:</p>
        <ProjectsGrid>
          <a href="https://github.com/maiabazerji/ecommerce_face_detection" target="_blank" rel="noopener noreferrer">
            <ProjectImage src="./images/websitetemp.png" alt="Project 1" />
          </a>
          <a href="https://github.com/maiabazerji/ecommerce_face_detection" target="_blank" rel="noopener noreferrer">
            <ProjectImage src="./images/webdevcourse.png" alt="Project 2" />
          </a>
          <a href="https://github.com/maiabazerji/ecommerce_face_detection" target="_blank" rel="noopener noreferrer">
            <ProjectImage src="images/project_ecommerce.png" alt="Project 3" />
          </a>
          <a href="https://github.com/maiabazerji/SentimentAnalysis-bert" target="_blank" rel="noopener noreferrer">
            <ProjectImage src="images/project_bert.png" alt="Project 4" />
          </a>
        </ProjectsGrid>
      </AdditionalContent>

      <SocialProofSection>
        <SectionTitle>Our Trusted Partners & Certifications</SectionTitle>
        <LogosContainer>
          <ClientLogo src="path/to/your/certification1.png" alt="Certification 1" />
          <ClientLogo src="path/to/your/certification2.png" alt="Certification 2" />
          <ClientLogo src="path/to/your/client1.png" alt="Client 1" />
          <ClientLogo src="path/to/your/client2.png" alt="Client 2" />
        </LogosContainer>
      </SocialProofSection>
    </HomeContainer>
  );
};

export default Home;
