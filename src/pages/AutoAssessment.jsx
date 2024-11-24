import React from 'react';
import '../styles/AutoAssessment.css';

const AutoAssessment = () => {
  // Mock data from Privacy Review (replace with actual data later)
  const privacyReviewData = {
    projectName: "HR Analytics Platform",
    businessUnit: "Human Resources",
    projectType: "New System Implementation",
    dataCategories: ["Personal Data", "Sensitive Data"],
    aiUsage: "Yes",
    cookieUsage: "Yes",
    crossBorderTransfer: "Yes",
    riskLevel: "High"
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
                  <label>Project Name</label>
                  <span>{privacyReviewData.projectName}</span>
                </div>
                <div className="info-item">
                  <label>Business Unit</label>
                  <span>{privacyReviewData.businessUnit}</span>
                </div>
                <div className="info-item">
                  <label>Project Type</label>
                  <span>{privacyReviewData.projectType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors Card */}
          <div className="assessment-card risk-factors-card">
            <h2>Key Risk Factors</h2>
            <div className="risk-factors">
              {[
                { label: 'AI Usage', value: privacyReviewData.aiUsage },
                { label: 'Cookie Usage', value: privacyReviewData.cookieUsage },
                { label: 'Cross-Border Transfer', value: privacyReviewData.crossBorderTransfer }
              ].map((factor, index) => (
                <div key={index} className="risk-factor">
                  <span className="factor-label">{factor.label}</span>
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
      </div>
    </div>
  );
};

export default AutoAssessment; 