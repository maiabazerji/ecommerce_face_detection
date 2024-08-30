// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const NavBar = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinksLeft = styled.div`
  display: flex;
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
    color: #f0f0f0;
  }
`;

const Header = () => {
  return (
    <header>
      <NavBar>
        <NavLinksLeft>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/Auth">Signup/Login</NavLink>
        </NavLinksLeft>
        <NavLinksRight>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinksRight>
      </NavBar>
    </header>
  );
};

export default Header;
