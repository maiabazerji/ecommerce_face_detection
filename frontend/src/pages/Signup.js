import React, { useState } from 'react';

const Signup = () => {
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

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input type="file" onChange={handlePhotoChange} accept="image/*" />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
