import React from 'react';
import '../styles/AutoAssessment.css';
import { useRopa } from '../context/RopaContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const AutoAssessment = () => {
  useDocumentTitle('Auto Assessment');
  const { updateRopaFromAssessment, addRopaRecord } = useRopa();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug log
  console.log('Auto Assessment received state:', location.state);

  // Helper function to generate recommendations based on privacy review data
  const generateRecommendations = (data) => {
    const recommendations = [];
    
    if (data.aiUsage === 'Yes') {
      recommendations.push("Implement enhanced data protection measures for AI processing activities");
    }
    if (data.crossBorderTransfer === 'Yes') {
      recommendations.push("Review and update cross-border data transfer agreements");
    }
    if (data.cookieUsage === 'Yes') {
      recommendations.push("Document cookie usage in privacy notices");
    }
    
    return recommendations;
  };
  
  // Use passed data or fallback to default
  const privacyReviewData = location.state?.assessmentData || {
    projectName: "HR Analytics Platform",
    businessUnit: "Human Resources",
    projectType: "New System Implementation",
    dueDate: new Date(),
    dataCategories: ["Personal Data", "Sensitive Data"],
    aiUsage: "Yes",
    cookieUsage: "Yes",
    crossBorderTransfer: "Yes",
    riskLevel: "High",
    countryOfOperation: "United Kingdom",
    dataOwnershipCountry: "United Kingdom"
  };

  console.log('Received privacy review data:', privacyReviewData);

  // Generate recommendations based on the actual data
  const recommendations = generateRecommendations(privacyReviewData);

  const handleStartPrivacyReview = () => {
    const assessmentData = {
      riskLevel: privacyReviewData.riskLevel,
      recommendedMeasures: recommendations
    };
    updateRopaFromAssessment(assessmentData, privacyReviewData.id);
    navigate('/ropa-management');
  };

  // Add this function to create ROPA record
  const createRopaRecord = () => {
    const data = location.state?.assessmentData;
    if (!data) {
      console.log('No assessment data available');
      return;
    }

    const ropaRecord = {
      id: Date.now(),
      title: data.projectName || 'Untitled Project',
      department: data.businessUnit === 'hr' ? 'Human Resources' : 
                 data.businessUnit === 'it' ? 'Information Technology' : 
                 data.businessUnit.charAt(0).toUpperCase() + data.businessUnit.slice(1),
      processingPurpose: 'Project Assessment',
      legalBasis: data.crossBorderTransfer === 'Yes' ? 'Legal Obligation' : 'Legitimate Interest',
      dataCategories: data.dataCategories || [],
      riskLevel: data.riskLevel || 'High',
      status: 'Draft',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    console.log('Creating ROPA record:', ropaRecord);
    addRopaRecord(ropaRecord);
    alert('ROPA record created successfully!');
  };

  return (
    <div className="page-container">
      <div className="content-wrapper" style={{ marginTop: '120px' }}>
        <div className="page-header" style={{ 
          marginBottom: '28px',
          paddingTop: '64px'
        }}>
          <h1>Auto-Assessment</h1>
          <div className="sub-heading" style={{
            textAlign: 'right',
            marginLeft: 'auto',  /* Pushes content to the right */
            maxWidth: '60%'      /* Limits width for better readability */
          }}>
            <p style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: '500',
              color: '#5cc5ae'
            }}>AI-Powered Risk Analysis</p>
            <span className="definition" style={{
              display: 'block',
              fontSize: '14px',
              color: '#FFFFFF'
            }}>
              Automated assessment of privacy risks and compliance requirements based on your project details.
            </span>
          </div>
        </div>

        <div className="assessment-grid">
          {/* Project Overview Card */}
          <div className="assessment-card overview-card">
            <div className="card-header">
              <h2>Project Overview</h2>
              <span className={`risk-badge ${privacyReviewData.riskLevel.toLowerCase()}`}>
                {privacyReviewData.riskLevel} Risk
              </span>
            </div>
            <div className="card-content">
              <div className="info-grid">
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Project Name
                  </label>
                  <span>{privacyReviewData.projectName}</span>
                </div>
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Business Unit
                  </label>
                  <span>{privacyReviewData.businessUnit}</span>
                </div>
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    </svg>
                    Project Type
                  </label>
                  <span>{privacyReviewData.projectType || 'Not Specified'}</span>
                </div>
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    Country of Operation
                  </label>
                  <span>{privacyReviewData.countryOfOperation || 'Not Specified'}</span>
                </div>
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    Data Ownership Country
                  </label>
                  <span>{privacyReviewData.dataOwnershipCountry || 'Not Specified'}</span>
                </div>
                <div className="info-item">
                  <label>
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due Date
                  </label>
                  <span>{new Date(privacyReviewData.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors Card */}
          <div className="assessment-card risk-factors-card">
            <h2>Key Risk Factors</h2>
            <div className="risk-factors">
              {[
                { 
                  label: 'AI Usage', 
                  value: privacyReviewData.aiUsage,
                  icon: (
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                  )
                },
                { 
                  label: 'Cookie Usage', 
                  value: privacyReviewData.cookieUsage,
                  icon: (
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
                      <path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  )
                },
                { 
                  label: 'Cross-Border Transfer', 
                  value: privacyReviewData.crossBorderTransfer,
                  icon: (
                    <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                  )
                }
              ].map((factor, index) => (
                <div key={index} className="risk-factor">
                  <div className="factor-info">
                    {factor.icon}
                    <span className="factor-label">{factor.label}</span>
                  </div>
                  <span className={`factor-value ${factor.value.toLowerCase()}`}>
                    {factor.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New Full-Width Recommendations Section */}
        <div className="recommendations-section">
          <div className="assessment-card recommendations-card">
            <h2>Recommendations</h2>
            <div className="recommendations-list">
              <div className="recommendation" style={{
                boxShadow: '0 2px 8px rgba(220, 53, 69, 0.15)',
                border: '1px solid rgba(220, 53, 69, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div className="recommendation-header">
                  <span className="priority high">High Priority</span>
                </div>
                <p>Implement enhanced data protection measures for AI processing activities</p>
              </div>
              <div className="recommendation" style={{
                boxShadow: '0 2px 8px rgba(255, 193, 7, 0.15)',
                border: '1px solid rgba(255, 193, 7, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div className="recommendation-header">
                  <span className="priority medium">Medium Priority</span>
                </div>
                <p>Review and update cross-border data transfer agreements</p>
              </div>
              <div className="recommendation" style={{
                boxShadow: '0 2px 8px rgba(40, 167, 69, 0.15)',
                border: '1px solid rgba(40, 167, 69, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div className="recommendation-header">
                  <span className="priority low">Low Priority</span>
                </div>
                <p>Document cookie usage in privacy notices</p>
              </div>
            </div>
          </div>
          
          {/* Add this button */}
          <button 
            onClick={createRopaRecord}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Create ROPA Record
          </button>
        </div>

        {/* Next Steps Section */}
        <div className="next-steps-section">
          <div className="assessment-card next-steps-card">
            <h2>Next Steps</h2>
            <div className="steps-content">
              <div className="step-item">
                <div className="step-header">
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3>Complete Data Transfer Impact Assessment</h3>
                </div>
                <p className="step-description">
                  Based on your cross-border transfer activities, a detailed impact assessment is required.
                </p>
                <button className="step-button">
                  Start Assessment
                  <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div className="step-divider"></div>

              <div className="step-item">
                <div className="step-header">
                  <svg className="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3>Proceed to Full Privacy Review Assessment</h3>
                </div>
                <p className="step-description">
                  Complete a comprehensive privacy review to ensure full compliance with privacy requirements.
                </p>
                <button 
                  className="step-button primary"
                  onClick={handleStartPrivacyReview}
                >
                  Start Privacy Review
                  <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoAssessment; 