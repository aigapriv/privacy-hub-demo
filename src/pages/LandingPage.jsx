import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

console.log('LandingPage component is loading');

const LandingPage = () => {
  useDocumentTitle('Home');
  console.log('LandingPage is rendering');
  return (
    <div className="page">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="content">
          <h1>
            Privacy Hub
            <span className="accent-dot">.</span>
          </h1>
          <p>Elevate your data privacy and compliance</p>
          <div className="button-group">
            <Link to="/components" className="button primary">
              Get Started
            </Link>
            <Link to="/demo" className="button secondary">
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 