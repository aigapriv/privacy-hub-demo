import React, { useState } from 'react';
import { 
  FaTimes, FaBuilding, FaUserShield, FaDatabase, 
  FaGlobe, FaCalendarAlt, FaShieldAlt, FaFileContract,
  FaExchangeAlt, FaServer, FaClock, FaUserCog,
  FaSave, FaExclamationTriangle
} from 'react-icons/fa';
import '../styles/RopaEditModal.css';

const RopaEditModal = ({ record, onClose, onSave }) => {
  const [formData, setFormData] = useState(record);
  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInput = (field, value) => {
    const arrayValues = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: arrayValues
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here
    onSave(formData);
  };

  const formSections = [
    {
      title: "Basic Information",
      fields: [
        { name: "title", label: "Title", type: "text", required: true },
        { name: "department", label: "Department", type: "text", required: true },
        { name: "category", label: "Category", type: "text", required: true },
        { 
          name: "status", 
          label: "Status", 
          type: "select",
          options: ["Active", "Under Review", "Inactive", "Pending Review", "Archived"]
        },
        { 
          name: "riskLevel", 
          label: "Risk Level", 
          type: "select",
          options: ["Low", "Medium", "High"]
        }
      ]
    },
    {
      title: "Processing Details",
      fields: [
        { name: "processingPurpose", label: "Processing Purpose", type: "textarea", required: true },
        { 
          name: "legalBasis", 
          label: "Legal Basis", 
          type: "select",
          options: ["Consent", "Contract", "Legal Obligation", "Vital Interests", "Public Task", "Legitimate Interest"]
        },
        { name: "legalBasisDetails", label: "Legal Basis Details", type: "textarea" },
        { name: "liaRequired", label: "LIA Required", type: "checkbox" }
      ]
    },
    {
      title: "Data Subjects & Categories",
      fields: [
        { name: "dataSubjects", label: "Data Subjects (comma-separated)", type: "text", isArray: true },
        { name: "dataCategories", label: "Data Categories (comma-separated)", type: "text", isArray: true },
        { name: "specialCategories", label: "Special Categories (comma-separated)", type: "text", isArray: true },
        { name: "dataVolume", label: "Data Volume", type: "text" }
      ]
    },
    {
      title: "Data Retention & Security",
      fields: [
        { name: "retentionPeriod", label: "Retention Period", type: "text", required: true },
        { name: "retentionJustification", label: "Retention Justification", type: "textarea" },
        { name: "securityMeasures", label: "Security Measures (comma-separated)", type: "text", isArray: true },
        { name: "accessControls", label: "Access Controls", type: "text" }
      ]
    },
    {
      title: "Data Transfers & Recipients",
      fields: [
        { name: "internalRecipients", label: "Internal Recipients (comma-separated)", type: "text", isArray: true },
        { name: "recipients", label: "External Recipients (comma-separated)", type: "text", isArray: true },
        { name: "transfers", label: "International Transfers (comma-separated)", type: "text", isArray: true },
        { name: "transferSafeguards", label: "Transfer Safeguards", type: "text" }
      ]
    },
    {
      title: "Compliance & Documentation",
      fields: [
        { name: "dpiaRequired", label: "DPIA Required", type: "checkbox" },
        { name: "dpiaStatus", label: "DPIA Status", type: "text" },
        { name: "privacyNoticeLink", label: "Privacy Notice Link", type: "text" },
        { name: "relatedPolicies", label: "Related Policies (comma-separated)", type: "text", isArray: true }
      ]
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-modal">
        <div className="modal-header">
          <h2>Edit ROPA Record</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {formSections.map((section, index) => (
              <div key={index} className="edit-section">
                <h3 className="section-title">{section.title}</h3>
                <div className="edit-grid">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="form-group">
                      <label htmlFor={field.name}>
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(section.title, field.name, e.target.value)}
                          className={errors[field.name] ? 'error' : ''}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(section.title, field.name, e.target.value)}
                          className={errors[field.name] ? 'error' : ''}
                        />
                      ) : field.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          id={field.name}
                          checked={formData[field.name] || false}
                          onChange={(e) => handleInputChange(section.title, field.name, e.target.checked)}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          value={field.isArray ? (formData[field.name] || []).join(', ') : (formData[field.name] || '')}
                          onChange={(e) => field.isArray ? 
                            handleArrayInput(field.name, e.target.value) : 
                            handleInputChange(section.title, field.name, e.target.value)
                          }
                          className={errors[field.name] ? 'error' : ''}
                        />
                      )}
                      {errors[field.name] && (
                        <span className="error-message">{errors[field.name]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <div className="footer-content">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RopaEditModal; 