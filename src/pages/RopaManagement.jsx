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

const RopaManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  
  const ropaRecords = [
    {
      id: 1,
      title: "Customer Data Processing",
      department: "Sales & Marketing",
      processingPurpose: "Customer relationship management",
      legalBasis: "Legitimate Interest",
      legalBasisDetails: "Business improvement and customer service optimization",
      liaRequired: true,
      dataSubjects: ["Customers", "Prospects"],
      dataCategories: ["Contact Details", "Purchase History", "Preferences"],
      specialCategories: [],
      dataVolume: "~50,000 records",
      retentionPeriod: "5 years",
      retentionJustification: "Legal and business requirements",
      securityMeasures: ["Encryption", "Access Controls", "Regular Audits"],
      accessControls: "Role-based access control",
      internalRecipients: ["Sales Team", "Marketing Team", "Customer Service"],
      recipients: ["CRM System", "Marketing Platform"],
      transfers: ["EU", "UK"],
      transferSafeguards: "Standard Contractual Clauses",
      dpiaRequired: true,
      dpiaStatus: "Completed",
      privacyNoticeLink: "/privacy/customers",
      relatedPolicies: ["Data Protection Policy", "Retention Policy"],
      lastUpdated: "2024-02-20",
      status: "Active",
      riskLevel: "Low",
      createdBy: "Alice Johnson",
      dpo: "Jane Smith"
    },
    {
      id: 2,
      title: "Employee Records",
      department: "Human Resources",
      processingPurpose: "Personnel management",
      legalBasis: "Legal Obligation",
      lastUpdated: "2024-02-18",
      status: "Under Review",
      riskLevel: "Medium",
    },
    {
      id: 3,
      title: "Vendor Management",
      department: "Procurement",
      processingPurpose: "Supplier relationship management",
      legalBasis: "Contract",
      lastUpdated: "2024-02-15",
      status: "Active",
      riskLevel: "Low",
    },
    {
      id: 4,
      title: "Marketing Analytics",
      department: "Marketing",
      processingPurpose: "Campaign performance analysis",
      legalBasis: "Consent",
      lastUpdated: "2024-02-14",
      status: "Inactive",
      riskLevel: "Medium",
    },
    {
      id: 5,
      title: "Financial Records",
      department: "Finance",
      processingPurpose: "Accounting and auditing",
      legalBasis: "Legal Obligation",
      lastUpdated: "2024-02-12",
      status: "Active",
      riskLevel: "High",
    },
    {
      id: 6,
      title: "Website Analytics",
      department: "Digital",
      processingPurpose: "User experience optimization",
      legalBasis: "Legitimate Interest",
      lastUpdated: "2024-02-10",
      status: "Under Review",
      riskLevel: "Low",
    },
    {
      id: 7,
      title: "Clinical Trials Data",
      department: "Research",
      processingPurpose: "Medical research",
      legalBasis: "Explicit Consent",
      lastUpdated: "2024-02-08",
      status: "Active",
      riskLevel: "High",
    },
    {
      id: 8,
      title: "Job Applications",
      department: "Recruitment",
      processingPurpose: "Candidate evaluation",
      legalBasis: "Legitimate Interest",
      lastUpdated: "2024-02-05",
      status: "Pending Review",
      riskLevel: "Medium",
    },
    {
      id: 9,
      title: "CCTV Monitoring",
      department: "Security",
      processingPurpose: "Property protection",
      legalBasis: "Legitimate Interest",
      lastUpdated: "2024-02-03",
      status: "Active",
      riskLevel: "Medium",
    },
    {
      id: 10,
      title: "Customer Support Data",
      department: "Customer Service",
      processingPurpose: "Issue resolution tracking",
      legalBasis: "Contract",
      lastUpdated: "2024-02-01",
      status: "Archived",
      riskLevel: "Low",
    }
  ];

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

      <div className="content-wrapper">
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

        <div className="table-container">
          <table className="ropa-table">
            <thead>
              <tr>
                <th style={{ width: '14%' }}>
                  <div className="th-content">
                    Title <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '11%' }}>
                  <div className="th-content">
                    Department <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '19%' }}>
                  <div className="th-content">
                    Purpose <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '12%' }}>
                  <div className="th-content">
                    Legal Basis <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '10%' }}>
                  <div className="th-content">
                    Risk Level <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '12%' }}>
                  <div className="th-content">
                    Status <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '12%' }}>
                  <div className="th-content">
                    Last Updated <FaSort className="sort-icon" />
                  </div>
                </th>
                <th style={{ width: '10%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ropaRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.title}</td>
                  <td>{record.department}</td>
                  <td>{record.processingPurpose}</td>
                  <td>{record.legalBasis}</td>
                  <td>
                    <div className="risk-level">
                      {getRiskIcon(record.riskLevel)}
                      {record.riskLevel}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`}>
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