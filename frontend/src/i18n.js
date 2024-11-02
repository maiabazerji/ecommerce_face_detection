// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to our e-commerce store",
          "home": "Home",
          "products": "Products",
          "about": "About",
          "contact": "Contact",
          "login": "Login",
          "signup": "Signup",
          // Add more keys and translations as needed
        }
      },
      fr: {
        translation: {
          "welcome": "Bienvenue dans notre magasin de commerce électronique",
          "home": "Accueil",
          "products": "Produits",
          "about": "À propos",
          "contact": "Contact",
          "login": "Connexion",
          "signup": "S'inscrire",
          // Add more keys and translations as needed
        }
      }
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false // React already escapes values to prevent XSS
    }
  });

export default i18n;
