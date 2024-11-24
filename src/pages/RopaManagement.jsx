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
  const { ropaRecords } = useRopa();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

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
          <table className="ropa-table">
            <thead>
              <tr>
                <th style={{ width: '16%' }}>
                  <div className="th-content">
                    Title <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '11%' }}>
                  <div className="th-content">
                    Department <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '14%' }}>
                  <div className="th-content">
                    Purpose <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '11%' }}>
                  <div className="th-content">
                    Legal Basis <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '15%' }}>
                  <div className="th-content">
                    Data Categories <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '10%' }}>
                  <div className="th-content">
                    Risk Level <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '8%' }}>
                  <div className="th-content">
                    Status <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '8%' }}>
                  <div className="th-content">
                    Last Updated <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '7%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ropaRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.title}</td>
                  <td>{record.department}</td>
                  <td>{record.processingPurpose}</td>
                  <td>{record.legalBasis}</td>
                  <td style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {record.dataCategories?.map((category, index) => (
                      <span key={index}>
                        {category}
                        {index < record.dataCategories.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td>
                    <div className="risk-level" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {getRiskIcon(record.riskLevel)}
                      <span>{record.riskLevel}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`} 
                      style={{ 
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        width: 'fit-content',
                        minWidth: 'auto'
                      }}>
                      {record.status}
                    </span>
                  </td>
                  <td>{record.lastUpdated}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn" 
                        title="View"
                        onClick={() => handleViewRecord(record)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn" 
                        title="Edit"
                        onClick={() => handleEditRecord(record)}
                      >
                        <FaEdit />
                      </button>
                      <button className="action-btn" title="Duplicate">
                        <FaCopy />
                      </button>
                      <button className="action-btn delete" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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