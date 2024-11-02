import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraCapture from '../components/CameraCapture'; // Ensure correct import path for CameraCapture component

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null); 
    const [isCameraActive, setIsCameraActive] = useState(false); // Track the camera status
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        const requestBody = { email, password, image }; // Include image in the login request

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody), // Send JSON with image data if captured
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Check for token and store it if received
            if (data.token) {
                localStorage.setItem('token', data.token); // Save JWT token to local storage
                // alert('Login successful!');
                localStorage.setItem("username", data.username);
                localStorage.setItem("userId", data.userId);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                alert('Login failed: No token received.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Login failed. Please try again.'); // Display a user-friendly error message
        }
    };

    const handleCapture = (imageData) => {
        setImage(imageData); // Store captured image data
        setIsCameraActive(false); // Deactivate the camera after capturing the image
    };

    const styles = {
        body: {
            animation: 'gradient 5s ease infinite',
            margin: '0',
            fontFamily: 'Arial, sans-serif',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6a11cb',
            position: 'relative',
            overflow: 'hidden',
        },
        form: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '300px',
            textAlign: 'center',
            zIndex: 1,
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box',
            fontSize: '16px',
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: '100%',
            fontSize: '16px',
            marginTop: '10px', // Added margin for spacing
        },
        title: {
            color: '#6a11cb',
            marginBottom: '20px',
        }
    };

    return (
        <div style={styles.body}>
            <form style={styles.form} onSubmit={handleLogin}>
                <h2 style={styles.title}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>

                <button
                    type="button"
                    onClick={() => setIsCameraActive(true)} // Activate the camera when the button is clicked
                    style={styles.button} // Reuse the same button style
                >
                    Login by Camera
                </button>

                {isCameraActive && (
                    <CameraCapture onCapture={handleCapture} /> // Render camera component if active
                )}

                <div>
                    <p>
                        Don't have an account? 
                        <span
                            style={{ cursor: 'pointer', color: '#007bff' }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
