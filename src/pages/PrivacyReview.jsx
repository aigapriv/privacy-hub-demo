import React, { useState } from 'react';
import { FaCheck, FaInfoCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/PrivacyReview.css';

const PrivacyReview = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    businessUnit: '',
    subUnit: '',
    businessProcess: '',
    projectType: '',
    country: '',
    startDate: new Date(),
    sensitiveData: [],
    thirdPartySharing: '',
    dataRetention: '',
    securityMeasures: []
  });

  const totalSteps = 5;
  const progress = Math.round((currentStep / totalSteps) * 100);

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
      { value: 'production', label: 'Production' },
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
    accounting: [
      { value: 'financial-reporting', label: 'Financial Reporting' },
      { value: 'accounts-payable', label: 'Accounts Payable' },
      { value: 'accounts-receivable', label: 'Accounts Receivable' },
      { value: 'general-ledger', label: 'General Ledger' },
      { value: 'cost-accounting', label: 'Cost Accounting' }
    ],
    treasury: [
      { value: 'cash-management', label: 'Cash Management' },
      { value: 'investments', label: 'Investments' },
      { value: 'forex', label: 'Foreign Exchange' },
      { value: 'funding', label: 'Funding & Capital' },
      { value: 'banking-relations', label: 'Banking Relations' }
    ],
    tax: [
      { value: 'tax-planning', label: 'Tax Planning' },
      { value: 'tax-compliance', label: 'Tax Compliance' },
      { value: 'tax-reporting', label: 'Tax Reporting' },
      { value: 'transfer-pricing', label: 'Transfer Pricing' },
      { value: 'vat-management', label: 'VAT Management' }
    ],
    audit: [
      { value: 'internal-controls', label: 'Internal Controls' },
      { value: 'compliance-audit', label: 'Compliance Audit' },
      { value: 'risk-assessment', label: 'Risk Assessment' },
      { value: 'audit-reporting', label: 'Audit Reporting' },
      { value: 'fraud-investigation', label: 'Fraud Investigation' }
    ],
    recruitment: [
      { value: 'talent-acquisition', label: 'Talent Acquisition' },
      { value: 'screening', label: 'Candidate Screening' },
      { value: 'interviewing', label: 'Interviewing' },
      { value: 'onboarding', label: 'Onboarding' },
      { value: 'background-checks', label: 'Background Checks' }
    ],
    compensation: [
      { value: 'payroll', label: 'Payroll' },
      { value: 'benefits-admin', label: 'Benefits Administration' },
      { value: 'salary-review', label: 'Salary Review' },
      { value: 'rewards', label: 'Rewards & Recognition' },
      { value: 'pension-admin', label: 'Pension Administration' }
    ],
    training: [
      { value: 'skills-development', label: 'Skills Development' },
      { value: 'compliance-training', label: 'Compliance Training' },
      { value: 'leadership-dev', label: 'Leadership Development' },
      { value: 'performance-mgmt', label: 'Performance Management' },
      { value: 'career-planning', label: 'Career Planning' }
    ],
    'employee-relations': [
      { value: 'grievance-handling', label: 'Grievance Handling' },
      { value: 'disciplinary', label: 'Disciplinary Procedures' },
      { value: 'engagement', label: 'Employee Engagement' },
      { value: 'wellness', label: 'Employee Wellness' },
      { value: 'union-relations', label: 'Union Relations' }
    ],
    infrastructure: [
      { value: 'network-mgmt', label: 'Network Management' },
      { value: 'server-admin', label: 'Server Administration' },
      { value: 'cloud-ops', label: 'Cloud Operations' },
      { value: 'backup-recovery', label: 'Backup & Recovery' },
      { value: 'hardware-mgmt', label: 'Hardware Management' }
    ],
    development: [
      { value: 'app-dev', label: 'Application Development' },
      { value: 'testing', label: 'Testing & QA' },
      { value: 'deployment', label: 'Deployment' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'api-management', label: 'API Management' }
    ],
    security: [
      { value: 'access-control', label: 'Access Control' },
      { value: 'incident-response', label: 'Incident Response' },
      { value: 'vulnerability-mgmt', label: 'Vulnerability Management' },
      { value: 'security-monitoring', label: 'Security Monitoring' },
      { value: 'penetration-testing', label: 'Penetration Testing' }
    ],
    support: [
      { value: 'helpdesk', label: 'Helpdesk' },
      { value: 'user-training', label: 'User Training' },
      { value: 'system-access', label: 'System Access Management' },
      { value: 'asset-mgmt', label: 'Asset Management' },
      { value: 'change-mgmt', label: 'Change Management' }
    ],
    digital: [
      { value: 'seo', label: 'Search Engine Optimization' },
      { value: 'ppc', label: 'Pay Per Click Advertising' },
      { value: 'email-marketing', label: 'Email Marketing' },
      { value: 'content-mgmt', label: 'Content Management' },
      { value: 'analytics', label: 'Digital Analytics' }
    ],
    brand: [
      { value: 'brand-strategy', label: 'Brand Strategy' },
      { value: 'visual-identity', label: 'Visual Identity' },
      { value: 'brand-guidelines', label: 'Brand Guidelines' },
      { value: 'brand-monitoring', label: 'Brand Monitoring' },
      { value: 'reputation-mgmt', label: 'Reputation Management' }
    ],
    communications: [
      { value: 'pr', label: 'Public Relations' },
      { value: 'media-relations', label: 'Media Relations' },
      { value: 'internal-comms', label: 'Internal Communications' },
      { value: 'crisis-comms', label: 'Crisis Communications' },
      { value: 'stakeholder-comms', label: 'Stakeholder Communications' }
    ],
    'social-media': [
      { value: 'content-creation', label: 'Content Creation' },
      { value: 'community-mgmt', label: 'Community Management' },
      { value: 'campaign-mgmt', label: 'Campaign Management' },
      { value: 'influencer-mgmt', label: 'Influencer Management' },
      { value: 'social-analytics', label: 'Social Media Analytics' }
    ],
    production: [
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'assembly', label: 'Assembly' },
      { value: 'quality-control', label: 'Quality Control' },
      { value: 'inventory-mgmt', label: 'Inventory Management' },
      { value: 'production-planning', label: 'Production Planning' }
    ],
    quality: [
      { value: 'quality-assurance', label: 'Quality Assurance' },
      { value: 'quality-control', label: 'Quality Control' },
      { value: 'compliance', label: 'Compliance' },
      { value: 'standards-mgmt', label: 'Standards Management' },
      { value: 'improvement', label: 'Continuous Improvement' }
    ],
    logistics: [
      { value: 'warehousing', label: 'Warehousing' },
      { value: 'transportation', label: 'Transportation' },
      { value: 'distribution', label: 'Distribution' },
      { value: 'fleet-mgmt', label: 'Fleet Management' },
      { value: 'inventory-control', label: 'Inventory Control' }
    ],
    'supply-chain': [
      { value: 'procurement', label: 'Procurement' },
      { value: 'supplier-mgmt', label: 'Supplier Management' },
      { value: 'demand-planning', label: 'Demand Planning' },
      { value: 'contract-mgmt', label: 'Contract Management' },
      { value: 'risk-mgmt', label: 'Risk Management' }
    ],
    'direct-sales': [
      { value: 'lead-generation', label: 'Lead Generation' },
      { value: 'sales-pipeline', label: 'Sales Pipeline Management' },
      { value: 'account-mgmt', label: 'Account Management' },
      { value: 'sales-forecasting', label: 'Sales Forecasting' },
      { value: 'contract-negotiation', label: 'Contract Negotiation' }
    ],
    retail: [
      { value: 'store-ops', label: 'Store Operations' },
      { value: 'merchandising', label: 'Merchandising' },
      { value: 'inventory-mgmt', label: 'Inventory Management' },
      { value: 'pos-mgmt', label: 'POS Management' },
      { value: 'customer-service', label: 'Customer Service' }
    ],
    'business-dev': [
      { value: 'market-research', label: 'Market Research' },
      { value: 'partnership-dev', label: 'Partnership Development' },
      { value: 'strategy-planning', label: 'Strategy Planning' },
      { value: 'opportunity-analysis', label: 'Opportunity Analysis' },
      { value: 'growth-planning', label: 'Growth Planning' }
    ],
    'customer-service': [
      { value: 'support-desk', label: 'Support Desk' },
      { value: 'complaint-handling', label: 'Complaint Handling' },
      { value: 'feedback-mgmt', label: 'Feedback Management' },
      { value: 'service-quality', label: 'Service Quality' },
      { value: 'customer-retention', label: 'Customer Retention' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedArray = checked
        ? [...formData[name], value]
        : formData[name].filter(item => item !== value);
      setFormData(prev => ({ ...prev, [name]: updatedArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, startDate: date }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add your submission logic here
  };

  const handleBusinessUnitChange = (e) => {
    const newBusinessUnit = e.target.value;
    setFormData(prev => ({
      ...prev,
      businessUnit: newBusinessUnit,
      subUnit: '' // Reset sub unit when business unit changes
    }));
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Project Details</h2>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
              />
            </div>
            <div className="form-group">
              <label>Business Unit</label>
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    businessUnit: e.target.value,
                    subUnit: '',
                    businessProcess: '' // Reset both dependent fields
                  }));
                }}
              >
                <option value="">Select Business Unit</option>
                <option value="finance">Finance</option>
                <option value="hr">Human Resources</option>
                <option value="it">Information Technology</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sub Unit</label>
              <select
                name="subUnit"
                value={formData.subUnit}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    subUnit: e.target.value,
                    businessProcess: '' // Reset business process when sub unit changes
                  }));
                }}
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
            </div>
            <div className="form-group">
              <label>Business Process</label>
              <select
                name="businessProcess"
                value={formData.businessProcess}
                onChange={handleInputChange}
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
            </div>
            <div className="form-group">
              <label>Project Description</label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your project"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Project Classification</h2>
            <div className="form-group">
              <label>Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option value="">Select project type</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>Country of Operation</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Select country</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
                <option value="us">United States</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Data Processing</h2>
            <div className="form-group">
              <label>Sensitive Data Types</label>
              <div className="checkbox-group">
                {['Health', 'Financial', 'Biometric', 'Location'].map(type => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="sensitiveData"
                      value={type.toLowerCase()}
                      checked={formData.sensitiveData.includes(type.toLowerCase())}
                      onChange={handleInputChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Third Party Sharing</label>
              <div className="radio-group">
                {['Yes', 'No', 'Maybe'].map(option => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="thirdPartySharing"
                      value={option.toLowerCase()}
                      checked={formData.thirdPartySharing === option.toLowerCase()}
                      onChange={handleInputChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Timeline & Security</h2>
            <div className="form-group">
              <label>Project Start Date</label>
              <DatePicker
                selected={formData.startDate}
                onChange={handleDateChange}
                className="date-picker"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="form-group">
              <label>Security Measures</label>
              <div className="checkbox-group">
                {['Encryption', 'Access Control', 'Monitoring', 'Backup'].map(measure => (
                  <label key={measure} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="securityMeasures"
                      value={measure.toLowerCase()}
                      checked={formData.securityMeasures.includes(measure.toLowerCase())}
                      onChange={handleInputChange}
                    />
                    {measure}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content summary">
            <h2>Review & Submit</h2>
            <div className="summary-content">
              <h3>Project Details</h3>
              <p><strong>Name:</strong> {formData.projectName}</p>
              <p><strong>Business Unit:</strong> {formData.businessUnit}</p>
              <p><strong>Sub Unit:</strong> {formData.subUnit}</p>
              <p><strong>Business Process:</strong> {formData.businessProcess}</p>
              <p><strong>Description:</strong> {formData.projectDescription}</p>
              
              <h3>Classification</h3>
              <p><strong>Type:</strong> {formData.projectType}</p>
              <p><strong>Country:</strong> {formData.country}</p>
              
              <h3>Data Processing</h3>
              <p><strong>Sensitive Data:</strong> {formData.sensitiveData.join(', ') || 'None'}</p>
              <p><strong>Third Party Sharing:</strong> {formData.thirdPartySharing}</p>
              
              <h3>Timeline & Security</h3>
              <p><strong>Start Date:</strong> {formData.startDate.toLocaleDateString()}</p>
              <p><strong>Security Measures:</strong> {formData.securityMeasures.join(', ') || 'None'}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="main-content">
          <div className="header">
            <h1>Privacy Review</h1>
            <p>Complete this assessment to determine if your project requires a detailed privacy review</p>
          </div>

          <div className="progress-bar-container">
            <div className="progress-text">
              Step {currentStep} of {totalSteps} - {progress}% Complete
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="steps-container">
            {renderStep()}
          </div>

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={prevStep}>
                <FaArrowLeft /> Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button className="btn-primary" onClick={nextStep}>
                Next <FaArrowRight />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit}>
                Submit <FaCheck />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyReview;
