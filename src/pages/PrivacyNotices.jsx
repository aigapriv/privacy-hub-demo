import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, FaSearch, FaFilter, FaEllipsisV, FaEdit, 
  FaEye, FaTrash, FaCopy, FaLink, FaUnlink, FaCode,
  FaDesktop, FaMobile, FaGlobe, FaDatabase, FaMapMarkerAlt,
  FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobeAsia
} from 'react-icons/fa';
import '../styles/PrivacyNotices.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PrivacyNotices = () => {
  useDocumentTitle('Privacy Notices');
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const notices = [
    {
      id: 1,
      title: "Website Privacy Notice",
      status: "Published",
      lastUpdated: "2024-02-20",
      version: "2.1",
      type: "External",
      description: "Privacy notice for website visitors and customers detailing data collection and usage practices.",
      applications: ["Company Website", "Customer Portal"],
      apiEnabled: true,
      connectedSystems: ["Web Analytics", "CRM"],
      lastReviewed: "2024-01-15",
      nextReview: "2024-07-15",
      owner: "Jane Smith",
      regions: {
        global: true,
        specific: ["EU", "UK", "US", "Canada"],
        regulations: ["GDPR", "UK GDPR", "CCPA"]
      }
    },
    {
      id: 2,
      title: "Employee Privacy Notice",
      status: "Draft",
      lastUpdated: "2024-02-18",
      version: "1.0",
      type: "Internal",
      description: "Privacy notice for employees covering workplace data processing activities.",
      applications: ["HR Portal"],
      apiEnabled: false,
      connectedSystems: ["HR System"],
      lastReviewed: "2024-02-10",
      nextReview: "2024-08-10",
      owner: "John Doe",
      regions: {
        global: false,
        specific: ["EU", "UK"],
        regulations: ["GDPR", "UK GDPR"]
      }
    },
    {
      id: 3,
      title: "Mobile App Privacy Notice",
      status: "Under Review",
      lastUpdated: "2024-02-15",
      version: "1.5",
      type: "External",
      description: "Privacy notice for mobile application users explaining data handling practices.",
      applications: ["Mobile App"],
      apiEnabled: true,
      connectedSystems: ["Mobile Analytics"],
      lastReviewed: "2024-02-05",
      nextReview: "2024-08-05",
      owner: "Alice Johnson",
      regions: {
        global: false,
        specific: ["EU", "UK"],
        regulations: ["GDPR", "UK GDPR"]
      }
    },
    {
      id: 4,
      title: "Customer Loyalty Program",
      status: "Published",
      lastUpdated: "2024-02-14",
      version: "1.2",
      type: "External",
      description: "Privacy notice for loyalty program members regarding data collection and rewards.",
      applications: ["Customer Loyalty Platform"],
      apiEnabled: true,
      connectedSystems: ["CRM"],
      lastReviewed: "2024-02-08",
      nextReview: "2024-08-08",
      owner: "Bob Brown",
      regions: {
        global: false,
        specific: ["EU", "UK"],
        regulations: ["GDPR", "UK GDPR"]
      }
    },
    {
      id: 5,
      title: "Vendor Privacy Notice",
      status: "Draft",
      lastUpdated: "2024-02-12",
      version: "1.0",
      type: "External",
      description: "Privacy notice for vendors and suppliers detailing business data processing.",
      applications: ["Vendor Portal"],
      apiEnabled: false,
      connectedSystems: ["ERP"],
      lastReviewed: "2024-02-03",
      nextReview: "2024-08-03",
      owner: "Charlie Davis",
      regions: {
        global: false,
        specific: ["EU", "UK"],
        regulations: ["GDPR", "UK GDPR"]
      }
    }
  ];

  // Function to render region icon based on region name
  const getRegionIcon = (region) => {
    switch(region) {
      case 'EU':
        return <FaGlobeEurope className="region-icon" />;
      case 'US':
        return <FaGlobeAmericas className="region-icon" />;
      case 'Asia':
        return <FaGlobeAsia className="region-icon" />;
      default:
        return <FaGlobe className="region-icon" />;
    }
  };

  return (
    <div className="privacy-notices-page">
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/">Privacy Hub</Link>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/components">Components</Link>
          <Link to="/profile" className="profile-link">Profile</Link>
        </div>
      </nav>

      <div className="content-wrapper">
        <div className="page-header">
          <div className="header-content">
            <h1>Privacy Notices</h1>
            <p>Create and manage your organization's privacy notices</p>
          </div>
          <button className="create-button">
            <FaPlus /> Create New Notice
          </button>
        </div>

        <div className="tools-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search privacy notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>

        <div className="notices-grid">
          {notices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <div className="card-header">
                <div className="header-top">
                  <div className="status-version">
                    <span className={`status-badge ${notice.status.toLowerCase()}`}>
                      {notice.status}
                    </span>
                    <span className="version-pill">v{notice.version}</span>
                  </div>
                  <div className="card-menu">
                    <button className="menu-button">
                      <FaEllipsisV />
                    </button>
                    <div className="menu-dropdown">
                      <button><FaEye /> View</button>
                      <button><FaEdit /> Edit</button>
                      <button><FaCopy /> Duplicate</button>
                      <button><FaCode /> API Settings</button>
                      <button><FaLink /> Manage Connections</button>
                      <button className="delete"><FaTrash /> Delete</button>
                    </div>
                  </div>
                </div>
                
                <div className="region-indicator">
                  {notice.regions.global ? (
                    <div className="global-badge">
                      <FaGlobe /> Global Notice
                    </div>
                  ) : (
                    <div className="regions-list">
                      {notice.regions.specific.map((region, index) => (
                        <span key={index} className="region-badge" title={region}>
                          {getRegionIcon(region)}
                          {region}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card-content">
                <h3>{notice.title}</h3>
                <p>{notice.description}</p>
                
                <div className="card-metadata">
                  <div className="metadata-section">
                    <h4>Applicable Regulations</h4>
                    <div className="regulation-tags">
                      {notice.regions.regulations.map((regulation, index) => (
                        <span key={index} className="regulation-tag">
                          <FaFlag /> {regulation}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="metadata-section">
                    <h4>Connected Applications</h4>
                    <div className="app-tags">
                      {notice.applications.map((app, index) => (
                        <span key={index} className="app-tag">
                          <FaDesktop /> {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="metadata-section">
                    <h4>API Status</h4>
                    <div className={`api-status ${notice.apiEnabled ? 'enabled' : 'disabled'}`}>
                      <FaCode /> {notice.apiEnabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="footer-info">
                  <div className="owner-info">
                    Owner: {notice.owner}
                  </div>
                  <div className="last-updated">
                    Updated: {notice.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotices; 