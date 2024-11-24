import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaInfoCircle } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/PrivacyReview.css';

const subUnitOptions = {
  finance: [
    { value: 'accounting', label: 'Accounting' },
    { value: 'treasury', label: 'Treasury' },
    { value: 'tax', label: 'Tax' },
    { value: 'audit', label: 'Internal Audit' }
  ],
  hr: [
    { value: 'recruitment', label: 'Recruitment' },
    { value: 'compensation', label: 'Compensation & Benefits' },
    { value: 'training', label: 'Training & Development' },
    { value: 'employee-relations', label: 'Employee Relations' }
  ],
  it: [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'development', label: 'Development' },
    { value: 'security', label: 'Security' },
    { value: 'support', label: 'IT Support' }
  ],
  marketing: [
    { value: 'digital', label: 'Digital Marketing' },
    { value: 'brand', label: 'Brand Management' },
    { value: 'communications', label: 'Communications' },
    { value: 'social-media', label: 'Social Media' }
  ],
  operations: [
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'quality', label: 'Quality Control' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'supply-chain', label: 'Supply Chain' }
  ],
  sales: [
    { value: 'direct-sales', label: 'Direct Sales' },
    { value: 'retail', label: 'Retail' },
    { value: 'business-dev', label: 'Business Development' },
    { value: 'customer-service', label: 'Customer Service' }
  ]
};

const businessProcessOptions = {
  // Finance processes
  accounting: [
    { value: 'financial-reporting', label: 'Financial Reporting' },
    { value: 'accounts-payable', label: 'Accounts Payable' },
    { value: 'accounts-receivable', label: 'Accounts Receivable' },
    { value: 'general-ledger', label: 'General Ledger' }
  ],
  treasury: [
    { value: 'cash-management', label: 'Cash Management' },
    { value: 'investments', label: 'Investments' },
    { value: 'forex', label: 'Foreign Exchange' },
    { value: 'funding', label: 'Funding & Capital' }
  ],
  // ... other finance processes

  // HR processes
  recruitment: [
    { value: 'talent-acquisition', label: 'Talent Acquisition' },
    { value: 'screening', label: 'Candidate Screening' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'onboarding', label: 'Onboarding' }
  ],
  compensation: [
    { value: 'payroll', label: 'Payroll' },
    { value: 'benefits', label: 'Benefits Administration' },
    { value: 'salary-review', label: 'Salary Review' },
    { value: 'performance-mgmt', label: 'Performance Management' }
  ],
  // ... continue with all other processes
};

const PrivacyReview = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    businessUnit: '',
    subUnit: '',
    businessProcess: '',
    projectDescription: '',
    projectType: '',
    country: '',
    dueDate: new Date(),
    sensitiveData: [],
    thirdPartySharing: '',
    securityMeasures: []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusinessUnitChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      businessUnit: value,
      subUnit: '',
      businessProcess: ''
    }));
  };

  const handleSubUnitChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      subUnit: value,
      businessProcess: ''
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 1:
        if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
        if (!formData.businessUnit) newErrors.businessUnit = 'Business unit is required';
        if (!formData.subUnit) newErrors.subUnit = 'Sub unit is required';
        if (!formData.businessProcess) newErrors.businessProcess = 'Business process is required';
        if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = 'Project type is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        break;
      // Add validation for other steps as needed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const Tooltip = ({ content }) => (
    <span className="tooltip-icon">
      <FaInfoCircle className="info-icon" />
      <span className="tooltip-text">{content}</span>
    </span>
  );

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Project Details</h2>
            
            <div className="form-group">
              <label className="required-field">
                Project Name
                <Tooltip content="Enter the official name of your project or initiative" />
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                required
              />
              {errors.projectName && <span className="error-message">{errors.projectName}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Business Unit
                <Tooltip content="Select the primary business unit responsible for this project" />
              </label>
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleBusinessUnitChange}
                required
              >
                <option value="">Select Business Unit</option>
                <option value="finance">Finance</option>
                <option value="hr">Human Resources</option>
                <option value="it">Information Technology</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
              </select>
              {errors.businessUnit && <span className="error-message">{errors.businessUnit}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Sub Unit
                <Tooltip content="Select the specific team or department within the business unit" />
              </label>
              <select
                name="subUnit"
                value={formData.subUnit}
                onChange={handleSubUnitChange}
                required
                disabled={!formData.businessUnit}
              >
                <option value="">Select Sub Unit</option>
                {formData.businessUnit && 
                  subUnitOptions[formData.businessUnit]?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                }
              </select>
              {errors.subUnit && <span className="error-message">{errors.subUnit}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Business Process
                <Tooltip content="Choose the main business process this project relates to" />
              </label>
              <select
                name="businessProcess"
                value={formData.businessProcess}
                onChange={handleInputChange}
                required
                disabled={!formData.subUnit}
              >
                <option value="">Select Business Process</option>
                {formData.subUnit && 
                  businessProcessOptions[formData.subUnit]?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                }
              </select>
              {errors.businessProcess && <span className="error-message">{errors.businessProcess}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Project Description
                <Tooltip content="Provide a detailed description of your project's purpose and scope" />
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your project"
                required
              />
              {errors.projectDescription && <span className="error-message">{errors.projectDescription}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Project Information</h2>
            
            <div className="form-group">
              <label className="required-field">
                Project Type
                <Tooltip content="Select the type of project you are implementing" />
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project Type</option>
                <option value="new-system">New System Implementation</option>
                <option value="system-change">System Change</option>
                <option value="process-change">Process Change</option>
                <option value="vendor-engagement">Vendor Engagement</option>
                <option value="other">Other</option>
              </select>
              {errors.projectType && <span className="error-message">{errors.projectType}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Country of Operation
                <Tooltip content="Select the primary country where this project will operate" />
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Project Due Date
                <Tooltip content="Select the expected completion date for this project" />
              </label>
              <DatePicker
                selected={formData.dueDate}
                onChange={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                dateFormat="MM/dd/yyyy"
                minDate={new Date()}
                className="date-picker"
                required
              />
              {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Data Processing</h2>
            
            <div className="form-group">
              <label className="required-field">
                Sensitive Data Processing
                <Tooltip content="Select all types of sensitive data that will be processed" />
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="sensitiveData"
                    value="personal"
                    checked={formData.sensitiveData.includes('personal')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        sensitiveData: e.target.checked
                          ? [...prev.sensitiveData, value]
                          : prev.sensitiveData.filter(item => item !== value)
                      }));
                    }}
                  />
                  Personal Information
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="sensitiveData"
                    value="financial"
                    checked={formData.sensitiveData.includes('financial')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        sensitiveData: e.target.checked
                          ? [...prev.sensitiveData, value]
                          : prev.sensitiveData.filter(item => item !== value)
                      }));
                    }}
                  />
                  Financial Information
                </label>
                {/* Add more sensitive data types as needed */}
              </div>
            </div>

            <div className="form-group">
              <label className="required-field">
                Third Party Data Sharing
                <Tooltip content="Indicate if data will be shared with third parties" />
              </label>
              <select
                name="thirdPartySharing"
                value={formData.thirdPartySharing}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Security Measures</h2>
            
            <div className="form-group">
              <label className="required-field">
                Security Controls
                <Tooltip content="Select all security measures that will be implemented" />
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="securityMeasures"
                    value="encryption"
                    checked={formData.securityMeasures.includes('encryption')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        securityMeasures: e.target.checked
                          ? [...prev.securityMeasures, value]
                          : prev.securityMeasures.filter(item => item !== value)
                      }));
                    }}
                  />
                  Encryption
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="securityMeasures"
                    value="access-control"
                    checked={formData.securityMeasures.includes('access-control')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        securityMeasures: e.target.checked
                          ? [...prev.securityMeasures, value]
                          : prev.securityMeasures.filter(item => item !== value)
                      }));
                    }}
                  />
                  Access Control
                </label>
                {/* Add more security measures as needed */}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content summary-step">
            <h2>Review & Submit</h2>
            
            <div className="summary-section">
              <div className="summary-header">
                <h3>Project Information</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Project Name:</span>
                  <span className="summary-value">{formData.projectName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Business Unit:</span>
                  <span className="summary-value">
                    {formData.businessUnit === 'hr' ? 'Human Resources' : 
                     formData.businessUnit === 'it' ? 'Information Technology' : 
                     formData.businessUnit.charAt(0).toUpperCase() + formData.businessUnit.slice(1)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Sub Unit:</span>
                  <span className="summary-value">
                    {formData.subUnit}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Project Due Date:</span>
                  <span className="summary-value">
                    {formData.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-section">
              <div className="summary-header">
                <h3>Data Processing Details</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Project Type:</span>
                  <span className="summary-value">
                    {formData.projectType}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Country of Operation:</span>
                  <span className="summary-value">
                    {formData.country === 'us' ? 'United States' :
                     formData.country === 'uk' ? 'United Kingdom' :
                     formData.country === 'eu' ? 'European Union' : formData.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-section">
              <div className="summary-header">
                <h3>Third Party Sharing</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Third Party Data Sharing:</span>
                  <span className="summary-value">
                    {formData.thirdPartySharing === 'yes' ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {formData.sensitiveData.length > 0 && (
              <div className="summary-section risk-section">
                <div className="summary-header">
                  <h3>Risk Assessment</h3>
                </div>
                <div className="summary-content">
                  <div className="risk-indicator high">
                    <span className="risk-label">Sensitive Data Processing</span>
                    <span className="risk-value">High Risk</span>
                  </div>
                  <div className="risk-details">
                    {formData.sensitiveData.map((item, index) => (
                      <span key={index} className="sensitive-data-tag">
                        {item.charAt(0).toUpperCase() + item.slice(1)} Information
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {formData.securityMeasures.length > 0 && (
              <div className="summary-section">
                <div className="summary-header">
                  <h3>Security Measures</h3>
                </div>
                <div className="summary-content">
                  <div className="security-measures-grid">
                    {formData.securityMeasures.map((measure, index) => (
                      <span key={index} className="security-measure-tag">
                        {measure.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="main-content">
          {renderStep()}
          <div className="button-group">
            {currentStep > 1 && (
              <button className="btn btn-secondary" onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < 5 && (
              <button className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyReview;
