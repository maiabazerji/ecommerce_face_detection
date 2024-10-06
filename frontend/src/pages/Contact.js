import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Import icons

// Keyframes for background animation
const gradientAnimation = keyframes`
  0% { background-color: #6a11cb; }   /* Purple */
  25% { background-color: #2575fc; }  /* Blue */
  50% { background-color: #6a11cb; }  /* Purple */
  75% { background-color: #00c6ff; }  /* Light Blue */
  100% { background-color: #6a11cb; } /* Purple */
`;

// Keyframes for icon animation
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Contact page container with animated background
const ContactContainer = styled.div`
  text-align: center;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${gradientAnimation} 10s ease infinite;
  color: #fff;
`;

// Title styling
const Title = styled.h1`
  font-size: 3rem;
  color: #fff; /* White for contrast */
  margin-bottom: 30px;
`;

// Form styles
const FormContainer = styled.div`
  display: flex;
  align-items: flex-start; // Align items to the top
  justify-content: space-between; // Space between icons and form
  width: 100%; // Full width to utilize space
  max-width: 800px; // Maximum width for the container
`;

// Form styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Transparent white */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1; // Allow form to grow
  margin: 0 20px; // Margin for spacing
`;

// Input field styling
const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  width: 320px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #fff;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

// TextArea styling
const TextArea = styled.textarea`
  padding: 12px;
  margin: 10px 0;
  width: 320px;
  height: 120px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #fff;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

// Button styling with hover effect
const Button = styled.button`
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.6);
  }
`;

// Icon container for LinkedIn and GitHub
const IconContainer = styled.div`
  display: flex;
  flex-direction: column; // Arrange icons vertically
  gap: 20px; // Space between icons
  margin: 0 20px; // Margin around the icons
`;

// Icon styles with animation
const Icon = styled.a`
  color: #fff; // Icon color
  font-size: 2rem; // Icon size
  animation: ${bounce} 1.5s infinite; // Apply bounce animation

  &:hover {
    color: #3498db; // Change color on hover
    transition: color 0.3s ease; // Smooth color transition
  }
`;

// Main Contact component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setError(null);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setError(error.message);
      setSubmitted(false);
    }
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <FormContainer>
        <IconContainer>
          <Icon href="https://www.linkedin.com/in/maia-bazerji-980554202" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </Icon>
          <Icon href="https://github.com/maiabazerji" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </Icon>
        </IconContainer>
        {!submitted ? (
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Send Message</Button>
          </Form>
        ) : (
          <p>Thank you for your message. We will get back to you soon!</p>
        )}
      </FormContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ContactContainer>
  );
};

export default Contact;
