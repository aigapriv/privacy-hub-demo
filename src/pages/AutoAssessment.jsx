import React from 'react';
import '../styles/AutoAssessment.css';

const AutoAssessment = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Header Section */}
        <div className="page-header">
          <h1>Auto-Assessment</h1>
          <div className="sub-heading">
            <p>Automated Privacy Impact Assessment</p>
            <span className="definition">
              Automated privacy impact assessments for your projects and processes.
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="assessment-card">
            <div className="card-header">
              <h2>Assessment Status</h2>
              <span className="status-badge pending">Pending Review</span>
            </div>
            <div className="card-content">
              <div className="status-info">
                <div className="info-item">
                  <span className="label">Submission Date</span>
                  <span className="value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Assessment ID</span>
                  <span className="value">PIA-2024-001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoAssessment; 