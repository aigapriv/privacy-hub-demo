import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaDatabase, FaFileAlt, FaUserShield, 
         FaCheckSquare, FaExclamationTriangle, FaCog, 
         FaRobot, FaHeadset } from 'react-icons/fa';
import '../styles/ComponentsPage.css';

const ComponentsPage = () => {
  const components = [
    {
      title: "Privacy Review",
      description: "Conduct comprehensive privacy assessments and manage compliance requirements.",
      icon: <FaShieldAlt className="card-icon" />,
      path: "/privacy-review"
    },
    {
      title: "ROPA Management",
      description: "Maintain and update your Records of Processing Activities in compliance with GDPR Article 30.",
      icon: <FaDatabase className="card-icon" />,
      path: "/ropa"
    },
    {
      title: "Privacy Notices",
      description: "Create and manage transparent privacy notices that build trust with stakeholders.",
      icon: <FaFileAlt className="card-icon" />,
      path: "/privacy-notices"
    },
    {
      title: "Data Subject Rights",
      description: "Efficiently handle DSR requests and maintain compliance with privacy regulations.",
      icon: <FaUserShield className="card-icon" />,
      path: "/dsr"
    },
    {
      title: "Consent Management",
      description: "Track and manage user consents across your digital platforms.",
      icon: <FaCheckSquare className="card-icon" />,
      path: "/consent"
    },
    {
      title: "Risk Management",
      description: "Identify, assess, and mitigate privacy risks across your organization.",
      icon: <FaExclamationTriangle className="card-icon" />,
      path: "/risk"
    },
    {
      title: "Privacy by Design",
      description: "Implement privacy controls early in your development lifecycle.",
      icon: <FaCog className="card-icon" />,
      path: "/privacy-by-design"
    },
    {
      title: "Auto-Assessment",
      description: "Automated privacy impact assessments for your projects and processes.",
      icon: <FaRobot className="card-icon" />,
      path: "/auto-assessment"
    },
    {
      title: "Privacy Support",
      description: "Access privacy expertise and get support for your compliance needs.",
      icon: <FaHeadset className="card-icon" />,
      path: "/support"
    }
  ];

  return (
    <div className="components-page">
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/">Privacy Hub</Link>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/privacy-review">Privacy Review</Link>
          <Link to="/ropa">ROPA</Link>
          <Link to="/profile" className="profile-link">Profile</Link>
        </div>
      </nav>
      
      <div className="components-content">
        <h1>Welcome to Privacy Hub</h1>
        <p>Choose a module to begin your compliance journey</p>
        
        <div className="component-grid">
          {components.map((component, index) => (
            <div className="component-card" key={index}>
              <div className="card-content">
                <div className="icon-wrapper">
                  {component.icon}
                </div>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
              </div>
              <Link to={component.path} className="card-link">
                Get Started →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage; 