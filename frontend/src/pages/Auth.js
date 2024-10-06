// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import axios from "axios";

// // Styled Components
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const FormContainer = styled.div`
//   text-align: center;
//   padding: 20px;
//   background-color: #f0f8ff;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   animation: ${fadeIn} 1s ease-out;
// `;

// const FormTitle = styled.h2`
//   font-size: 2rem;
//   color: #333;
//   margin-bottom: 20px;
// `;

// const Form = styled.form`
//   width: 300px;
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: ${({ secondary }) => (secondary ? "#007bff" : "#28a745")};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-top: 10px;

//   &:hover {
//     background-color: ${({ secondary }) => (secondary ? "#0056b3" : "#218838")};
//   }
// `;

// const SwitchButton = styled.button`
//   margin-top: 20px;
//   background-color: transparent;
//   border: none;
//   color: #007bff;
//   cursor: pointer;
//   font-size: 1rem;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create FormData for signup, and normal JSON for login
//     const data = isLogin
//       ? { email: formData.email, password: formData.password }
//       : { username: formData.username, email: formData.email, password: formData.password };

//     try {
//       const response = await axios.post(`http://localhost:5000/${isLogin ? "login" : "signup"}`, data);
//       setMessage(`${isLogin ? "Login" : "Signup"} successful: ${response.data.message}`);
//     } catch (error) {
//       setMessage(`${isLogin ? "Login" : "Signup"} failed: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <FormContainer>
//       <FormTitle>{isLogin ? "Login" : "Sign Up"}</FormTitle>
//       <Form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <Input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         )}
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
//       </Form>
//       {message && <p>{message}</p>}
//       <SwitchButton onClick={() => setIsLogin(!isLogin)}>
//         {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
//       </SwitchButton>
//     </FormContainer>
//   );
// };

// export default Auth;
