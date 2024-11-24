import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, FaSearch, FaFilter, FaEllipsisV, FaEdit, 
  FaEye, FaTrash, FaCopy, FaDownload, FaSort,
  FaExclamationTriangle, FaCheckCircle, FaClock
} from 'react-icons/fa';
import RopaDetailModal from '../components/RopaDetailModal';
import RopaEditModal from '../components/RopaEditModal';
import '../styles/RopaManagement.css';
import { useRopa } from '../context/RopaContext';

const RopaManagement = () => {
  const { ropaRecords, addRopaRecord } = useRopa();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  console.log('ROPA Records:', ropaRecords);

  const getRiskIcon = (riskLevel) => {
    switch(riskLevel.toLowerCase()) {
      case 'high':
        return <FaExclamationTriangle className="risk-icon high" />;
      case 'medium':
        return <FaClock className="risk-icon medium" />;
      case 'low':
        return <FaCheckCircle className="risk-icon low" />;
      default:
        return null;
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
    setEditingRecord(null);
  };

  const handleSaveRecord = (updatedRecord) => {
    console.log('Saving updated record:', updatedRecord);
    
    const updatedRecords = ropaRecords.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    );
    
    setEditingRecord(null);
  };

  // Add these transformation functions
  const transformPrivacyReviewToRopa = (privacyReviewData) => {
    return {
      id: Date.now(),
      title: privacyReviewData.projectName,
      department: privacyReviewData.businessUnit === 'hr' ? 'Human Resources' : 
                 privacyReviewData.businessUnit === 'it' ? 'Information Technology' : 
                 privacyReviewData.businessUnit.charAt(0).toUpperCase() + privacyReviewData.businessUnit.slice(1),
      processingPurpose: privacyReviewData.businessProcess,
      legalBasis: determineLegalBasis(privacyReviewData),
      legalBasisDetails: "",
      liaRequired: privacyReviewData.riskLevel === "High",
      dataSubjects: [],
      dataCategories: privacyReviewData.sensitiveData,
      specialCategories: privacyReviewData.sensitiveData.includes('sensitive') ? ['Sensitive Personal Data'] : [],
      dataVolume: "",
      retentionPeriod: "",
      retentionJustification: "",
      securityMeasures: privacyReviewData.securityMeasures || [],
      accessControls: "",
      internalRecipients: [],
      recipients: privacyReviewData.thirdPartySharing === 'yes' ? ['Third Party Recipients'] : [],
      transfers: privacyReviewData.crossBorderTransfer === 'yes' ? 
        [privacyReviewData.country, privacyReviewData.dataOwnershipCountry] : [],
      transferSafeguards: privacyReviewData.crossBorderTransfer === 'yes' ? 
        "Standard Contractual Clauses" : "",
      dpiaRequired: isDpiaRequired(privacyReviewData),
      dpiaStatus: "Pending",
      privacyNoticeLink: "",
      relatedPolicies: [],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: "Draft",
      riskLevel: calculateRiskLevel(privacyReviewData),
      createdBy: "",
      dpo: ""
    };
  };

  const determineLegalBasis = (data) => {
    if (data.sensitiveData?.includes('sensitive')) {
      return 'Explicit Consent';
    }
    if (data.businessProcess?.includes('financial')) {
      return 'Legal Obligation';
    }
    if (data.aiUsage === 'yes') {
      return 'Consent';
    }
    return 'Legitimate Interest';
  };

  const isDpiaRequired = (data) => {
    return (
      data.sensitiveData?.includes('sensitive') ||
      data.aiUsage === 'yes' ||
      data.crossBorderTransfer === 'yes' ||
      calculateRiskLevel(data) === 'High'
    );
  };

  const calculateRiskLevel = (data) => {
    let riskScore = 0;
    
    if (data.sensitiveData?.includes('sensitive')) riskScore += 3;
    if (data.crossBorderTransfer === 'yes') riskScore += 2;
    if (data.aiUsage === 'yes') riskScore += 2;
    if (data.thirdPartySharing === 'yes') riskScore += 1;
    
    if (riskScore >= 5) return 'High';
    if (riskScore >= 3) return 'Medium';
    return 'Low';
  };

  // Add this function to handle new ROPA records
  const handlePrivacyReviewSubmission = (privacyReviewData) => {
    const newRopaRecord = transformPrivacyReviewToRopa(privacyReviewData);
    setRopaRecords(prevRecords => [...prevRecords, newRopaRecord]);
  };

  // Add this function to handle updates from Auto Assessment
  const handleAutoAssessmentComplete = (assessmentData, ropaId) => {
    setRopaRecords(prevRecords => {
      return prevRecords.map(record => {
        if (record.id === ropaId) {
          return {
            ...record,
            riskLevel: assessmentData.riskLevel,
            securityMeasures: [
              ...record.securityMeasures,
              ...assessmentData.recommendedMeasures
            ]
          };
        }
        return record;
      });
    });
  };

  // Add this test function
  const addTestRecord = () => {
    const testRecord = {
      id: Date.now(),
      title: "Test Project",
      department: "Test Department",
      processingPurpose: "Test Purpose",
      legalBasis: "Legitimate Interest",
      dataCategories: ["Test Category"],
      riskLevel: "High",
      status: "Draft",
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    console.log('Adding test record:', testRecord);
    addRopaRecord(testRecord);
  };

  // Add this debug log before the table render
  console.log('Rendering table with records:', ropaRecords);

  return (
    <div className="ropa-page">
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

      <div className="content-wrapper" style={{ width: '98%', margin: '0 auto', maxWidth: '1800px' }}>
        <div className="page-header">
          <div className="header-content">
            <h1>ROPA Management</h1>
            <p>Manage your Records of Processing Activities</p>
          </div>
          <div className="header-actions">
            <button 
              onClick={addTestRecord}
              style={{
                marginRight: '10px',
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Test Record
            </button>
            <button className="import-button">
              <FaDownload /> Import
            </button>
            <button className="create-button">
              <FaPlus /> New Record
            </button>
          </div>
        </div>

        <div className="tools-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search ROPA records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>

        <div className="table-container" style={{ width: '100%', margin: '0 auto' }}>
          <div className="ropa-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>
                    <div className="th-content">
                      Title <FaSort className="sort-icon" />
                    </div>
                  </th>
                  <th style={{ width: '12%' }}>Department</th>
                  <th style={{ width: '15%' }}>Processing Purpose</th>
                  <th style={{ width: '10%' }}>Legal Basis</th>
                  <th style={{ width: '15%' }}>Data Categories</th>
                  <th style={{ width: '10%' }}>Risk Level</th>
                  <th style={{ width: '8%' }}>Status</th>
                  <th style={{ width: '8%' }}>Last Updated</th>
                  <th style={{ width: '7%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ropaRecords && ropaRecords.length > 0 ? (
                  ropaRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.title || 'N/A'}</td>
                      <td>{record.department || 'N/A'}</td>
                      <td>{record.processingPurpose || 'N/A'}</td>
                      <td>{record.legalBasis || 'N/A'}</td>
                      <td>
                        {record.dataCategories?.length > 0 
                          ? record.dataCategories.join(', ') 
                          : 'N/A'}
                      </td>
                      <td>
                        <div className="risk-level">
                          {getRiskIcon(record.riskLevel)}
                          <span>{record.riskLevel || 'N/A'}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${(record.status || '').toLowerCase()}`}>
                          {record.status || 'N/A'}
                        </span>
                      </td>
                      <td>{record.lastUpdated || 'N/A'}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn" onClick={() => handleViewRecord(record)}>
                            <FaEye />
                          </button>
                          <button className="action-btn" onClick={() => handleEditRecord(record)}>
                            <FaEdit />
                          </button>
                          <button className="action-btn">
                            <FaCopy />
                          </button>
                          <button className="action-btn delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRecord && (
        <RopaDetailModal 
          record={selectedRecord} 
          onClose={handleCloseModal} 
        />
      )}

      {editingRecord && (
        <RopaEditModal
          record={editingRecord}
          onClose={handleCloseModal}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
};

export default RopaManagement; 