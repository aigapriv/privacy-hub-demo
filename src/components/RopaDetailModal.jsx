import React from 'react';
import { 
  FaTimes, FaBuilding, FaUserShield, FaDatabase, 
  FaGlobe, FaCalendarAlt, FaShieldAlt, FaFileContract,
  FaExchangeAlt, FaServer, FaClock, FaUserCog,
  FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';
import '../styles/RopaDetailModal.css';

const RopaDetailModal = ({ record, onClose }) => {
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

  const detailSections = [
    {
      title: "Basic Information",
      items: [
        { label: "Record ID", value: record.id },
        { label: "Title", value: record.title },
        { label: "Department", value: record.department },
        { label: "Category", value: record.category },
        { 
          label: "Status", 
          value: record.status,
          customDisplay: (
            <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`}>
              {record.status}
            </span>
          )
        },
        { 
          label: "Risk Level", 
          value: record.riskLevel,
          customDisplay: (
            <div className="risk-level-display">
              {getRiskIcon(record.riskLevel)}
              <span>{record.riskLevel}</span>
            </div>
          )
        }
      ]
    },
    {
      title: "Processing Details",
      items: [
        { label: "Processing Purpose", value: record.processingPurpose },
        { label: "Legal Basis", value: record.legalBasis },
        { label: "Legal Basis Details", value: record.legalBasisDetails || "Not specified" },
        { label: "Legitimate Interest Assessment", value: record.liaRequired ? "Required" : "Not Required" }
      ]
    },
    {
      title: "Data Subjects & Categories",
      items: [
        { label: "Data Subjects", value: record.dataSubjects?.join(", ") },
        { label: "Data Categories", value: record.dataCategories?.join(", ") },
        { label: "Special Categories", value: record.specialCategories?.join(", ") || "None" },
        { label: "Data Volume", value: record.dataVolume || "Not specified" }
      ]
    },
    {
      title: "Data Retention & Security",
      items: [
        { label: "Retention Period", value: record.retentionPeriod },
        { label: "Retention Justification", value: record.retentionJustification },
        { label: "Security Measures", value: record.securityMeasures?.join(", ") },
        { label: "Access Controls", value: record.accessControls }
      ]
    },
    {
      title: "Data Transfers & Recipients",
      items: [
        { label: "Internal Recipients", value: record.internalRecipients?.join(", ") },
        { label: "External Recipients", value: record.recipients?.join(", ") },
        { label: "International Transfers", value: record.transfers?.join(", ") },
        { label: "Transfer Safeguards", value: record.transferSafeguards || "Not applicable" }
      ]
    },
    {
      title: "Compliance & Documentation",
      items: [
        { label: "DPIA Required", value: record.dpiaRequired ? "Yes" : "No" },
        { label: "DPIA Status", value: record.dpiaStatus || "Not applicable" },
        { label: "Privacy Notice Link", value: record.privacyNoticeLink || "Not specified" },
        { label: "Related Policies", value: record.relatedPolicies?.join(", ") }
      ]
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>ROPA Record Details</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {detailSections.map((section, index) => (
            <div key={index} className="detail-section">
              <h3 className="section-title">{section.title}</h3>
              <div className="detail-grid">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="detail-item">
                    <span className="detail-label">{item.label}</span>
                    {item.customDisplay ? (
                      item.customDisplay
                    ) : (
                      <span className="detail-value">
                        {Array.isArray(item.value) ? item.value.join(", ") : item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <div className="record-metadata">
            <span>Last Updated: {record.lastUpdated}</span>
            <span>•</span>
            <span>Created by: {record.createdBy}</span>
            <span>•</span>
            <span>DPO: {record.dpo}</span>
          </div>
          <button className="close-button-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RopaDetailModal; 