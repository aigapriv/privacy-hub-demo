import React from 'react';
import '../styles/AutoAssessment.css';
import { useRopa } from '../context/RopaContext';

const AutoAssessment = () => {
  const { updateRopaFromAssessment } = useRopa();

  // Mock data from Privacy Review (replace with actual data later)
  const privacyReviewData = {
    projectName: "HR Analytics Platform",
    businessUnit: "Human Resources",
    projectType: "New System Implementation",
    dueDate: "2024-06-30",
    dataCategories: ["Personal Data", "Sensitive Data"],
    aiUsage: "Yes",
    cookieUsage: "Yes",
    crossBorderTransfer: "Yes",
    riskLevel: "High"
  };

  const handleStartPrivacyReview = () => {
    const assessmentData = {
      riskLevel: privacyReviewData.riskLevel,
      recommendedMeasures: [
        "Implement enhanced data protection",
        "Review cross-border transfers",
        "Update privacy notices"
      ]
    };
    updateRopaFromAssessment(assessmentData, privacyReviewData.id);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Auto-Assessment</h1>
          <div className="sub-heading">
            <p>Automated Privacy Impact Assessment</p>
            <span className="definition">
              AI-powered privacy risk analysis and recommendations
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
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    Project Type
                  </label>
                  <span>{privacyReviewData.projectType}</span>
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
              <div className="recommendation">
                <div className="recommendation-header">
                  <span className="priority high">High Priority</span>
                </div>
                <p>Implement enhanced data protection measures for AI processing activities</p>
              </div>
              <div className="recommendation">
                <div className="recommendation-header">
                  <span className="priority medium">Medium Priority</span>
                </div>
                <p>Review and update cross-border data transfer agreements</p>
              </div>
              <div className="recommendation">
                <div className="recommendation-header">
                  <span className="priority low">Low Priority</span>
                </div>
                <p>Document cookie usage in privacy notices</p>
              </div>
            </div>
          </div>
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