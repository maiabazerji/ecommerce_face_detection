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

const Video = styled.video`
  display: none;
  margin-top: 20px;
`;


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null, 
  });

  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

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
    if (formData.photo) data.append("photo", formData.photo);
    try {
      const response = await axios.post("/signup", data);
      console.log("Signup response:", response.data);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };
  

  const handleCameraSignup = async () => {
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
    await sendImageToBackend(image);
  };

  const sendImageToBackend = async (image) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image })
      });

      const result = await response.json();
      console.log("Face recognition result:", result);
    } catch (error) {
      console.error("Error sending image to backend:", error);
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
        <Button type="submit">Sign Up</Button>
        <Button type="button" onClick={handleCameraSignup}>
          Signup by Camera
        </Button>
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

export default Signup;
