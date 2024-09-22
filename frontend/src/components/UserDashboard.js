import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Container for the dashboard
const DashboardContainer = styled.div`
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

// Section for welcome message
const WelcomeSection = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  width: 80%;
  max-width: 600px;
`;

// Welcome message styling
const WelcomeMessage = styled.p`
  font-size: 1.5rem;
  color: #00796b;
  margin: 0;
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
const UserDashboard = () => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    // Example of fetching username if the user is logged in
    // For demonstration purposes, assuming username is fetched from local storage or context
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <DashboardContainer>
      <Title>User Dashboard</Title>
      <WelcomeSection>
        <WelcomeMessage>Welcome, {username}!</WelcomeMessage>
      </WelcomeSection>
      <h2>Check our Products</h2>
      <AdditionalContent>
        <p>
          Here, you can manage your account, view your order history, and explore personalized product recommendations based on your preferences.
        </p>
      </AdditionalContent>
      {/* <ButtonLink to="/account">Manage Account</ButtonLink> */}
      <ButtonLink to="/products">View Products</ButtonLink>
      <ButtonLink to="/cart">Order History</ButtonLink>
    </DashboardContainer>
  );
};

export default UserDashboard;
