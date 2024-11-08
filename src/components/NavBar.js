import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faBroadcastTower, faCog, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  // State to store the current language
  const [language, setLanguage] = useState('fr'); // Default is French

  // Function to detect language change via Google Translate or other methods
  const handleLanguageChange = () => {
    const selectedLang = document.querySelector('html').lang; // Assuming lang attribute changes
    if (selectedLang === 'ar') {
      setLanguage('ar');
    } else {
      setLanguage('fr');
    }
  };

  useEffect(() => {
    // Assuming Google Translate or some other method adds a listener for language changes
    const interval = setInterval(handleLanguageChange, 1000); // Poll for language change every second
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Determine which image to display based on the selected language
  const bannerImage = language === 'ar' ? '/logo192.png' : '/logo11.png'; // Set your French and Arabic images

  // Determine the alignment for the navigation bar
  const navBarDirection = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="header-container">
      <div className="header-image-container">
        <img src={bannerImage} alt="Header" className="header-image" />
        <div className="header-overlay">
          <h1 className="header-title">Centre Nationale D'informatique</h1>
          <p className="header-tagline">Innovating the Future of Technology</p>
        </div>
      </div>
      {/* Google Translate Widget */}
      <div className="footer-translate">
        <div id="google_translate_element"></div>
      </div>
      <nav className="navbar" style={{ direction: navBarDirection }}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <FontAwesomeIcon icon={faVideo} /> . Videos  
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/live" className="navbar-link">
              <FontAwesomeIcon icon={faBroadcastTower} /> . Video live  
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
