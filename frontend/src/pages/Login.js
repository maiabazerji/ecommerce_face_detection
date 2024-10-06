import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraCapture from '../components/CameraCapture'; // Adjust the path as necessary

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null); // State to store captured image
    const [isCameraActive, setIsCameraActive] = useState(false); // State to track camera status
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        const requestBody = { username, password, image }; // Include captured image

        // Send the login request
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Check if token is received and store it
            if (data.token) {
                localStorage.setItem('token', data.token); // Store JWT token in local storage
                alert('Login successful!'); // Show success message
                navigate('/dashboard'); // Navigate to dashboard
            } else {
                alert('Login failed: No token received.'); // Handle token not received
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCapture = (imageData) => {
        setImage(imageData); // Store the captured image
        setIsCameraActive(false); // Deactivate the camera after capture
    };

    // Inline styles
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
        },
        title: {
            color: '#6a11cb',
            marginBottom: '20px',
        },
        cameraButton: {
            backgroundColor: '#28a745', // Different color for camera button
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: '100%',
            fontSize: '16px',
            marginTop: '10px', // Add margin to separate from other inputs
        },
    };

    return (
        <div style={styles.body}>
            <form style={styles.form} onSubmit={handleLogin}>
                <h2 style={styles.title}>Login</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    onClick={() => setIsCameraActive(true)} 
                    style={styles.cameraButton}>
                    Login by Camera
                </button>
                
                {isCameraActive && (
                    <CameraCapture onCapture={handleCapture} />
                )}
                
                <div>
                    <p>
                        Don't have an account? 
                        <span 
                            style={{ cursor: 'pointer', color: '#007bff' }} 
                            onClick={() => navigate('/signup')}> Sign Up
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
