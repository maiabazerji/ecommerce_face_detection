import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next"; // Import useTranslation

// Styled Components (unchanged)
const NavBar = styled.nav`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 20px;
`;

const NavLinksLeft = styled.div`
  display: flex;
  align-items: center;
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

const LanguageSelector = styled.select`
  margin-left: 20px; // Space between links and language selector
`;

const Header = () => {
  const { t, i18n } = useTranslation(); // Use translation hook

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header>
      <NavBar>
        <NavLinksLeft>
          <Logo src="./logo/BazerjiCode.png" alt="Logo" />
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/products">{t('products')}</NavLink>
          <NavLink to="/about">{t('about')}</NavLink>
          <NavLink to="/login">{t('login')}</NavLink>
        </NavLinksLeft>
        <NavLinksRight>
          <NavLink to="/contact">{t('contact')}</NavLink>
          <NavLink to="/blog">{t('blog')}</NavLink>
          <LanguageSelector onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </LanguageSelector>
        </NavLinksRight>
      </NavBar>
    </header>
  );
};

export default Header;
