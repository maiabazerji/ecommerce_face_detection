import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';


// Styled Components
const FormContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fff3cd;
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

  &:hover {
    background-color: #218838;
  }
`;

const Video = styled.video`
  display: none;
  margin-top: 20px;


`;

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the login request to your backend
      const response = await axios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response.data);
  
      // Handle successful login
      if (response.data.success) {
        window.location.href = "/UserDashboard";
      } else {
        // Handle the case where login fails
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle any errors (network issues, backend errors, etc.)
      console.error("Login error:", error.response?.data || error.message);
    }
  };
  
  const handleCameraLogin = async () => {
    setIsCameraEnabled(true);
    const video = document.getElementById("video");

    if (!videoStream) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
      setVideoStream(stream);
      video.play();
    }
  };

  const captureImage = async () => {
    const video = document.getElementById("video");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png", "image/jpeg");

    // Send image to backend
    const response = await fetch("YOUR_BACKEND_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image })
    });

    const result = await response.json();
    console.log("Face recognition result:", result);

  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Login</Button> <br />
        <Button type="button" onClick={handleCameraLogin}>Login by Camera</Button>
        {isCameraEnabled && (
          <>
            <Video id="video" width="720" height="560" autoPlay></Video>
            <Button type="button" onClick={captureImage}>Capture Image</Button>
          </>
        )}
      </Form>
    </FormContainer>
  );
};

export default Login;
