import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const ContactContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const Contact = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // State to store submission status
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Mock submitting the form data to the backend (replace with actual logic)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ContactContainer>
  );
};

export default Contact;
