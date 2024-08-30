import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-out;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  animation: ${slideIn} 0.5s ease-out;
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.5s ease-out;
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
  background-color: ${props => (props.secondary ? "#007bff" : "#28a745")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: ${props => (props.secondary ? "#0056b3" : "#218838")};
  }
`;

const CameraButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`;

const Video = styled.video`
  display: ${props => (props.$isCameraEnabled ? "block" : "none")};
  width: 320px; /* Adjust the size of the camera preview */
  height: 240px;
  margin-top: 10px;
`;

const SwitchButton = styled.button`
  margin-top: 20px;
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [message, setMessage] = useState(null);

  const stopVideoStream = useCallback(() => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setIsCameraEnabled(false);
  }, [videoStream, setVideoStream, setIsCameraEnabled]);

  useEffect(() => {
    if (!isLogin) {
      stopVideoStream();
    }
  }, [isLogin, stopVideoStream]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const response = isLogin
        ? await axios.post("http://localhost:3000/login", { email: formData.email, password: formData.password })
        : await axios.post("http://localhost:3000/signup", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      console.log(`${isLogin ? "Login" : "Signup"} response:`, response.data);
      setMessage(`${isLogin ? "Login" : "Signup"} successful!`);

      if (isLogin) {
        stopVideoStream();
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} error:`, error.response?.data || error.message);
      setMessage(`${isLogin ? "Login" : "Signup"} failed: ${error.response?.data?.message || error.message}`);
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
    const image = canvas.toDataURL("image/png");

    try {
      const response = await axios.post("http://localhost:3000/face-login", { image });
      console.log("Face recognition result:", response.data);
    } catch (error) {
      console.error("Face recognition error:", error.response?.data || error.message);
      setMessage(`Face recognition failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{isLogin ? "Login" : "Sign Up"}</FormTitle>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
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
        {!isLogin && (
          <>
            <label htmlFor="photo">Upload your photo for facial recognition login:</label>
            <Input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
            <Button type="submit" secondary>
              Sign Up
            </Button>
          </>
        )}
        {isLogin && (
          <>
            <Button type="submit">Login</Button>
            <CameraButton type="button" onClick={handleCameraLogin}>
              <FontAwesomeIcon icon={faCamera} />
              Login by Camera
            </CameraButton>
            <Video id="video" autoPlay $isCameraEnabled={isCameraEnabled}></Video>
            {isCameraEnabled && (
              <Button type="button" onClick={captureImage}>
                Capture Image
              </Button>
            )}
          </>
        )}
      </Form>
      {message && <p>{message}</p>}
      <SwitchButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </SwitchButton>
    </FormContainer>
  );
};

export default Auth;