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
  // Finance - Accounting processes
  accounting: [
    { value: 'financial-reporting', label: 'Financial Reporting' },
    { value: 'accounts-payable', label: 'Accounts Payable' },
    { value: 'accounts-receivable', label: 'Accounts Receivable' },
    { value: 'general-ledger', label: 'General Ledger' }
  ],
  // Finance - Treasury processes
  treasury: [
    { value: 'cash-management', label: 'Cash Management' },
    { value: 'investments', label: 'Investments' },
    { value: 'risk-management', label: 'Risk Management' },
    { value: 'funding', label: 'Funding & Capital' }
  ],
  // HR - Recruitment processes
  recruitment: [
    { value: 'talent-acquisition', label: 'Talent Acquisition' },
    { value: 'screening', label: 'Candidate Screening' },
    { value: 'onboarding', label: 'Employee Onboarding' },
    { value: 'offboarding', label: 'Employee Offboarding' }
  ],
  // HR - Compensation processes
  compensation: [
    { value: 'payroll', label: 'Payroll Processing' },
    { value: 'benefits', label: 'Benefits Administration' },
    { value: 'performance', label: 'Performance Management' },
    { value: 'rewards', label: 'Rewards & Recognition' }
  ],
  // IT - Infrastructure processes
  infrastructure: [
    { value: 'network', label: 'Network Management' },
    { value: 'servers', label: 'Server Administration' },
    { value: 'cloud', label: 'Cloud Services' },
    { value: 'storage', label: 'Data Storage' }
  ],
  // IT - Development processes
  development: [
    { value: 'application-dev', label: 'Application Development' },
    { value: 'testing', label: 'Testing & QA' },
    { value: 'deployment', label: 'Deployment' },
    { value: 'maintenance', label: 'Maintenance' }
  ],
  // Marketing - Digital processes
  digital: [
    { value: 'social-media', label: 'Social Media Management' },
    { value: 'email-marketing', label: 'Email Marketing' },
    { value: 'content-mgmt', label: 'Content Management' },
    { value: 'analytics', label: 'Digital Analytics' }
  ],
  // Marketing - Brand processes
  brand: [
    { value: 'brand-strategy', label: 'Brand Strategy' },
    { value: 'creative', label: 'Creative Development' },
    { value: 'campaigns', label: 'Campaign Management' },
    { value: 'market-research', label: 'Market Research' }
  ]
};

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'sg', label: 'Singapore' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' }
];

const dataOwnershipCountries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'sg', label: 'Singapore' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' }
];

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
    dataOwnershipCountry: '',
    dueDate: new Date(),
    sensitiveData: [],
    thirdPartySharing: '',
    crossBorderTransfer: '',
    aiUsage: '',
    cookieUsage: '',
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
        if (!formData.country) newErrors.country = 'Country of operation is required';
        if (!formData.dataOwnershipCountry) newErrors.dataOwnershipCountry = 'Country of data ownership is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        break;
      case 3:
        if (!formData.thirdPartySharing) newErrors.thirdPartySharing = 'Please select an option';
        if (!formData.crossBorderTransfer) newErrors.crossBorderTransfer = 'Please select an option';
        if (!formData.aiUsage) newErrors.aiUsage = 'Please select an option';
        if (!formData.cookieUsage) newErrors.cookieUsage = 'Please select an option';
        break;
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

  const formatSubUnitLabel = (subUnit) => {
    if (!subUnit) return '';
    
    // Find the label from subUnitOptions
    const businessUnit = formData.businessUnit;
    const subUnitOption = subUnitOptions[businessUnit]?.find(
      option => option.value === subUnit
    );
    
    return subUnitOption ? subUnitOption.label : subUnit
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getRiskScore = (criterion, value) => {
    const riskMatrix = {
      businessProcess: {
        'financial-reporting': 'High',
        'payroll': 'High',
        'talent-acquisition': 'Medium',
        default: 'Low'
      },
      projectType: {
        'new-system': 'High',
        'system-change': 'Medium',
        'process-change': 'Medium',
        'vendor-engagement': 'High',
        default: 'Low'
      },
      dataOwnership: {
        'us': 'Medium',
        'uk': 'Medium',
        'ch': 'Low',
        default: 'High'
      },
      dataOperation: {
        'us': 'Medium',
        'uk': 'Medium',
        'ch': 'Low',
        default: 'High'
      }
    };

    switch(criterion) {
      case 'businessProcess':
        return riskMatrix.businessProcess[value] || riskMatrix.businessProcess.default;
      case 'projectType':
        return riskMatrix.projectType[value] || riskMatrix.projectType.default;
      case 'dataOwnership':
        return riskMatrix.dataOwnership[value] || riskMatrix.dataOwnership.default;
      case 'dataOperation':
        return riskMatrix.dataOperation[value] || riskMatrix.dataOperation.default;
      case 'personalData':
        // Return Low if only personal data is selected (not sensitive)
        return value && !formData.sensitiveData.includes('sensitive') ? 'Low' : 'Low';
      case 'sensitiveData':
        // Return High only if sensitive data is selected
        return value ? 'High' : 'Low';
      case 'aiUsage':
        return value === 'yes' ? 'High' : 'Low';
      case 'cookieUsage':
        return value === 'yes' ? 'Medium' : 'Low';
      default:
        return 'Low';
    }
  };

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
                className={!formData.businessUnit ? 'unselected' : ''}
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
                className={!formData.subUnit ? 'unselected' : ''}
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
                <Tooltip content="Select the specific business process this project relates to" />
              </label>
              <select
                name="businessProcess"
                value={formData.businessProcess}
                onChange={handleInputChange}
                className={!formData.businessProcess ? 'unselected' : ''}
                required
                disabled={!formData.subUnit}
              >
                <option value="">Select Business Process</option>
                {formData.subUnit && businessProcessOptions[formData.subUnit]?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
                className={!formData.country ? 'unselected' : ''}
                required
              >
                <option value="">Select Country</option>
                {countryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Country of Data Ownership
                <Tooltip content="Select the country where data ownership and control resides" />
              </label>
              <select
                name="dataOwnershipCountry"
                value={formData.dataOwnershipCountry}
                onChange={handleInputChange}
                className={!formData.dataOwnershipCountry ? 'unselected' : ''}
                required
              >
                <option value="">Select Country</option>
                {dataOwnershipCountries.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.dataOwnershipCountry && <span className="error-message">{errors.dataOwnershipCountry}</span>}
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
            <h2>Data Usage</h2>
            
            <div className="form-group">
              <label className="required-field">
                Data Processing
                <Tooltip content="Select all types of data that will be processed" />
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
                  Personal Categories of Data
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="sensitiveData"
                    value="sensitive"
                    checked={formData.sensitiveData.includes('sensitive')}
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
                  Sensitive Categories of Data
                </label>
                {/* Add more data types as needed */}
              </div>
            </div>

            <div className="form-group">
              <label className="required-field">
                Third Party Data Sharing
                <Tooltip content="Indicate if data will be shared with third parties" />
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="thirdPartySharing"
                    value="yes"
                    checked={formData.thirdPartySharing === 'yes'}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="thirdPartySharing"
                    value="no"
                    checked={formData.thirdPartySharing === 'no'}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>
              {errors.thirdPartySharing && <span className="error-message">{errors.thirdPartySharing}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Cross-Border Data Transfer
                <Tooltip content="Indicate if data will be transferred across country borders" />
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="crossBorderTransfer"
                    value="yes"
                    checked={formData.crossBorderTransfer === 'yes'}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="crossBorderTransfer"
                    value="no"
                    checked={formData.crossBorderTransfer === 'no'}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>
              {errors.crossBorderTransfer && <span className="error-message">{errors.crossBorderTransfer}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                AI Usage
                <Tooltip content="Indicate if this project involves artificial intelligence or machine learning" />
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="aiUsage"
                    value="yes"
                    checked={formData.aiUsage === 'yes'}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="aiUsage"
                    value="no"
                    checked={formData.aiUsage === 'no'}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>
              {errors.aiUsage && <span className="error-message">{errors.aiUsage}</span>}
            </div>

            <div className="form-group">
              <label className="required-field">
                Cookie Usage
                <Tooltip content="Indicate if this project will use cookies" />
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="cookieUsage"
                    value="yes"
                    checked={formData.cookieUsage === 'yes'}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="cookieUsage"
                    value="no"
                    checked={formData.cookieUsage === 'no'}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>
              {errors.cookieUsage && <span className="error-message">{errors.cookieUsage}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content summary-step">
            <div className="page-header">
              <h1>Review & Submit</h1>
              <div className="sub-heading">
                <p>Final Review</p>
                <span className="definition">
                  Please review all the information provided before submitting your privacy review request.
                </span>
              </div>
            </div>

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
                  <span className="summary-value">{formatSubUnitLabel(formData.subUnit)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Project Due Date:</span>
                  <span className="summary-value">
                    {formData.dueDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Business Process:</span>
                  <span className="summary-value">
                    {formData.businessProcess && businessProcessOptions[formData.subUnit]?.find(
                      bp => bp.value === formData.businessProcess
                    )?.label || formData.businessProcess}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-section">
              <div className="summary-header">
                <h3>Data Usage Details</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Project Type:</span>
                  <span className="summary-value">
                    {formData.projectType.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Country of Operation:</span>
                  <span className="summary-value">
                    {countryOptions.find(c => c.value === formData.country)?.label || formData.country}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Country of Data Ownership:</span>
                  <span className="summary-value">
                    {dataOwnershipCountries.find(c => c.value === formData.dataOwnershipCountry)?.label || formData.dataOwnershipCountry}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Third Party Data Sharing:</span>
                  <span className="summary-value">{formData.thirdPartySharing === 'yes' ? 'Yes' : 'No'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Cross-Border Data Transfer:</span>
                  <span className="summary-value">{formData.crossBorderTransfer === 'yes' ? 'Yes' : 'No'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">AI Usage:</span>
                  <span className="summary-value">{formData.aiUsage === 'yes' ? 'Yes' : 'No'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Cookie Usage:</span>
                  <span className="summary-value">{formData.cookieUsage === 'yes' ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="summary-section risk-section">
              <div className="summary-header">
                <h3>Risk Assessment</h3>
              </div>
              <div className="summary-content">
                <div className="risk-details">
                  {[
                    {
                      label: 'Business Process',
                      criterion: 'businessProcess',
                      value: formData.businessProcess,
                    },
                    {
                      label: 'Project Type',
                      criterion: 'projectType',
                      value: formData.projectType,
                    },
                    {
                      label: 'Data Ownership Location',
                      criterion: 'dataOwnership',
                      value: formData.dataOwnershipCountry,
                    },
                    {
                      label: 'Operation Location',
                      criterion: 'dataOperation',
                      value: formData.country,
                    },
                    {
                      label: 'Personal Categories of Data',
                      criterion: 'personalData',
                      value: formData.sensitiveData.includes('personal'),
                    },
                    {
                      label: 'Sensitive Categories of Data',
                      criterion: 'sensitiveData',
                      value: formData.sensitiveData.includes('sensitive'),
                    },
                    {
                      label: 'AI Usage',
                      criterion: 'aiUsage',
                      value: formData.aiUsage,
                    },
                    {
                      label: 'Cookie Usage',
                      criterion: 'cookieUsage',
                      value: formData.cookieUsage,
                    }
                  ].map((item, index) => {
                    const riskLevel = getRiskScore(item.criterion, item.value);
                    return (
                      <div key={index} className="risk-criterion">
                        <span className="criterion-label">{item.label}</span>
                        <span className={`risk-indicator risk-${riskLevel.toLowerCase()}`}>
                          {riskLevel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="page-header">
          <h1>Privacy Review</h1>
          <div className="sub-heading">
            <p>Pre-Screening Assessment</p>
            <span className="definition">
              This privacy review helps identify potential privacy risks and compliance requirements for your project.
            </span>
          </div>
        </div>

        <div className="status-bar">
          <div className="status-steps">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`status-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
              >
                <div className="step-circle">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Project Details'}
                  {step === 2 && 'Project Information'}
                  {step === 3 && 'Data Usage'}
                  {step === 4 && 'Review & Submit'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="page-content">
          <div className="main-content">
            {renderStep()}
            <div className="button-group">
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
              )}
              {currentStep < 4 && (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyReview;
