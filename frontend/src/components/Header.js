// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const NavBar = styled.nav`
  background-color: #000; // Set navbar background to black
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px; // Adjust the height of the logo as needed
  margin-right: 20px; // Space between logo and links
`;

const NavLinksLeft = styled.div`
  display: flex;
  align-items: center; // Center items vertically
`;

const NavLinksRight = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1rem;

  &:hover {
    color: #f0f0f0; // Lighten color on hover
  }
`;

const Header = () => {
  return (
    <header>
      <NavBar>
        <NavLinksLeft>
          <Logo src="/BazerjiCode.png" alt="Logo" />
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
        </NavLinksLeft>
        <NavLinksRight>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinksRight>
      </NavBar>
    </header>
  );
};

export default Header;
