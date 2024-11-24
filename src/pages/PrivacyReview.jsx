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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              >
                <option value="">Select Sub Unit</option>
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
                <option value="team3">Team 3</option>
                <option value="team4">Team 4</option>
              </select>
            </div>
            <div className="form-group">
              <label>Business Process</label>
              <select
                name="businessProcess"
                value={formData.businessProcess}
                onChange={handleInputChange}
              >
                <option value="">Select Business Process</option>
                <option value="customer-onboarding">Customer Onboarding</option>
                <option value="data-processing">Data Processing</option>
                <option value="reporting">Reporting</option>
                <option value="compliance">Compliance</option>
                <option value="audit">Audit</option>
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
