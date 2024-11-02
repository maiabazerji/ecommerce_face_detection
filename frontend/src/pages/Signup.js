import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
    
        const signupData = {
            email,
            password,
            username,
            photo
        };
    
        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Signup failed');
            }
    
            const data = await response.json();
            // alert(data.message);
            navigate('/login');
        } catch (error) {
            console.error("Error:", error);
            setError("Signup failed. Please try again.");
        }
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
            overflow: 'hidden'
        },
        form: {
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            width: '300px',
            textAlign: 'center',
            zIndex: 1
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
        title: {
            color: '#6a11cb',
            marginBottom: '20px'
        },
        error: {
            color: 'red',
            margin: '10px 0'
        }
    };

    return (
        <div style={styles.body}>
            <form style={styles.form} onSubmit={handleSignup}>
                <h2 style={styles.title}>Sign Up</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
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
                <input 
                    type="file" 
                    onChange={handlePhotoChange} 
                    accept="image/*" 
                    required
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
