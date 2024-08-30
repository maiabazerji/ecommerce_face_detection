// src/pages/Signup.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const FormContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null, 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      // Handle file input separately
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.photo) {
      data.append("photo", formData.photo); // Append the photo to the FormData
    }

    try {
      const response = await axios.post("/api/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Signup response:", response.data);
      // Handle successful signup (e.g., redirect to login page, display success message)
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <FormContainer>
      <FormTitle>Sign Up</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="photo">
          Want to login using your face?
          <br /> Upload your photo here
        </label>
        <br />
        <Input type="file" name="photo" onChange={handleChange} />
        <Button type="submit">Sign Up</Button>
      </Form>
    </FormContainer>
  );
};

export default Signup;
