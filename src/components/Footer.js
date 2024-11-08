import React, { useEffect } from 'react';
import './Footer.css'; // Importer le fichier CSS pour le style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'fr,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);
  
  return (
    <footer className="footer">
      <div className="container">
        {/* Section Contact */}
        <div className="footer-column">
          <h3>Contactez-nous</h3>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Ave Mohamed Ali Akid, Tunis 1003</p>
          <p><FontAwesomeIcon icon={faPhone} /> 71 770 667</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> contact@cnipe.com</p>
        </div>
        
        {/* Section Suivez-nous */}
        <div className="footer-column">
          <h3>Suivez-nous</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
         
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} /> YouTube
          </a>
        </div>
        
        {/* Section Liens rapides */}
       
        {/* Section Newsletter */}
        
      </div>

      

      {/* Section Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 Radio Exemple. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
