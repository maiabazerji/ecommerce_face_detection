import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Signup failed: ${response.statusText}`);
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error:", error);
        }
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
            backgroundColor: '#6a11cb', // Fallback color
            position: 'relative',
            overflow: 'hidden'
        },
        '@keyframes gradient': {
            '0%': { backgroundColor: '#6a11cb' }, // Purple
            '50%': { backgroundColor: '#2575fc' }, // Blue
            '100%': { backgroundColor: '#6a11cb' } // Purple
        },
        form: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '300px',
            textAlign: 'center',
            zIndex: 1 // Ensure form is above the background
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #ddd',
            boxSizing: 'border-box',
            fontSize: '16px'
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
            fontSize: '16px'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        title: {
            color: '#6a11cb', // Title color
            marginBottom: '20px'
        }
    };

    return (
        <div style={styles.body}>
            <form style={styles.form} onSubmit={handleSignup}>
                <h2 style={styles.title}>Sign Up</h2>
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
                <input 
                    type="file" 
                    onChange={handlePhotoChange} 
                    accept="image/*" 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Sign Up</button>
                <div>
                    <p>
                        Already have an account? 
                        <span 
                            style={{ cursor: 'pointer', color: '#007bff' }} 
                            onClick={() => navigate('/login')}> Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
