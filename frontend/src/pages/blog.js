import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Gradient background animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Blog container styling
const BlogContainer = styled.div`
  text-align: center;
  padding: 60px;
  background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #e94560);
  background-size: 400% 400%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${backgroundAnimation} 15s ease infinite;
`;

// Blog title styling
const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// Subtitle styling
const Subtitle = styled.h2`
  font-size: 1.75rem;
  color: #f0f0f0;
  margin-bottom: 40px;
`;

// Blog item grid container
const BlogItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  width: 100%;
`;

// Individual blog item styling
const BlogItem = styled.a`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  text-align: center;
  color: #fff;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }
`;

// Blog item icon styling
const BlogIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

// Blog item title styling
const BlogTitle = styled.h4`
  font-size: 1.2rem;
  margin: 0;
`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs([
      { title: "AI Fundamentals", icon: "🤖", file: "/pdfs/AI_fundamentals.pdf" },
      { title: "Cybersecurity Essentials", icon: "🔒", file: "/pdfs/Cybersecurity_Essentials.pdf"},
      { title: "Web Development", icon: "🌐", file: "/pdfs/Web_Development.pdf"},
      { title: "Data Science Basics", icon: "📊", file: "/pdfs/Data_Science_Basics.pdf" },   
      { title: "Cloud Computing", icon: "☁️", file: "/pdfs/Cloud_Computing.pdf" },
      { title: "Machine Learning", icon: "⚙️", file: "/pdfs/Machine_Learning.pdf" },
      { title: "Docker Basics", icon: "🐳", file: "/pdfs/Docker_Basics.pdf" },
      { title: "API Development", icon: "🔌", file: "/pdfs/API_Development.pdf" },
      // Add more blog items as needed
    ]);
  }, []);

  return (
    <BlogContainer>
      <Title>Explore Our Blog</Title>
      <Subtitle>Download insightful resources on tech topics</Subtitle>

      <BlogItemsGrid>
        {blogs.map((blog, index) => (
          <BlogItem key={index} href={blog.file} download>
            <BlogIcon>{blog.icon}</BlogIcon>
            <BlogTitle>{blog.title}</BlogTitle>
          </BlogItem>
        ))}
      </BlogItemsGrid>
    </BlogContainer>
  );
};

export default Blog;
