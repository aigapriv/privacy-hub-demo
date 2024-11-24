import React, { createContext, useState, useContext } from 'react';

const RopaContext = createContext();

// Add initial test data
const initialRopaRecords = [
  {
    id: 1,
    title: "HR Analytics Platform",
    department: "Human Resources",
    processingPurpose: "Employee Performance Analysis",
    legalBasis: "Legitimate Interest",
    dataCategories: ["Personal Data", "Performance Data"],
    riskLevel: "High",
    dpiaRequired: true,
    dpiaStatus: "Required",
    status: "Draft",
    lastUpdated: "2024-03-15"
  },
  {
    id: 2,
    title: "Marketing Campaign Tool",
    department: "Marketing",
    processingPurpose: "Customer Analytics",
    legalBasis: "Consent",
    dataCategories: ["Contact Details", "Preferences"],
    riskLevel: "Medium",
    dpiaRequired: false,
    dpiaStatus: "Not Required",
    status: "Under Review",
    lastUpdated: "2024-03-14"
  },
  {
    id: 3,
    title: "Financial Reporting System",
    department: "Finance",
    processingPurpose: "Regulatory Reporting",
    legalBasis: "Legal Obligation",
    dataCategories: ["Financial Data", "Personal Data"],
    riskLevel: "Low",
    dpiaRequired: false,
    dpiaStatus: "Not Required",
    status: "Active",
    lastUpdated: "2024-03-13"
  }
];

export const RopaProvider = ({ children }) => {
  const [ropaRecords, setRopaRecords] = useState(initialRopaRecords);  // Initialize with test data

  const transformPrivacyReviewToRopa = (privacyReviewData) => {
    return {
      id: Date.now(),
      // From Privacy Review
      title: privacyReviewData.projectName,
      department: formatDepartment(privacyReviewData.businessUnit),
      processingPurpose: formatProcessingPurpose(privacyReviewData.businessProcess),
      dataCategories: privacyReviewData.sensitiveData || [],
      status: "Draft",
      
      // Derived from Privacy Review
      legalBasis: determineLegalBasis(privacyReviewData),
      dpiaRequired: isDpiaRequired(privacyReviewData),
      dpiaStatus: isDpiaRequired(privacyReviewData) ? "Required" : "Not Required",
      
      // From Auto Assessment
      riskLevel: privacyReviewData.riskLevel || "Low",
      securityMeasures: [],
      lastUpdated: new Date().toISOString().split('T')[0],
      
      // Additional ROPA fields
      dataSubjects: getDataSubjects(privacyReviewData.businessUnit),
      transfers: privacyReviewData.crossBorderTransfer === 'yes' ? 
        [privacyReviewData.country, privacyReviewData.dataOwnershipCountry] : [],
      recipients: privacyReviewData.thirdPartySharing === 'yes' ? ['Third Party Recipients'] : []
    };
  };

  // Helper functions
  const formatDepartment = (businessUnit) => {
    const departments = {
      'hr': 'Human Resources',
      'it': 'Information Technology',
      'finance': 'Finance',
      'marketing': 'Marketing',
      'sales': 'Sales',
      'operations': 'Operations'
    };
    return departments[businessUnit] || businessUnit;
  };

  const formatProcessingPurpose = (process) => {
    return process?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'N/A';
  };

  const determineLegalBasis = (data) => {
    if (data.sensitiveData?.includes('sensitive')) return 'Explicit Consent';
    if (data.businessProcess?.includes('financial')) return 'Legal Obligation';
    if (data.aiUsage === 'yes') return 'Consent';
    return 'Legitimate Interest';
  };

  const isDpiaRequired = (data) => {
    return (
      data.sensitiveData?.includes('sensitive') ||
      data.aiUsage === 'yes' ||
      data.crossBorderTransfer === 'yes' ||
      data.riskLevel === 'High'
    );
  };

  const getDataSubjects = (businessUnit) => {
    const subjectMap = {
      'hr': ['Employees', 'Candidates'],
      'sales': ['Customers', 'Prospects'],
      'marketing': ['Customers', 'Subscribers'],
      'finance': ['Employees', 'Vendors'],
      'it': ['Employees', 'Contractors'],
      'operations': ['Employees', 'Vendors', 'Contractors']
    };
    return subjectMap[businessUnit] || [];
  };

  const addRopaRecord = (privacyReviewData) => {
    const newRecord = transformPrivacyReviewToRopa(privacyReviewData);
    setRopaRecords(prev => [...prev, newRecord]);
  };

  const updateRopaFromAssessment = (assessmentData, recordId) => {
    setRopaRecords(prev => 
      prev.map(record => {
        if (record.id === recordId) {
          return {
            ...record,
            riskLevel: assessmentData.riskLevel,
            securityMeasures: [
              ...record.securityMeasures,
              ...assessmentData.recommendedMeasures
            ],
            lastUpdated: new Date().toISOString().split('T')[0],
            status: 'Under Review'
          };
        }
        return record;
      })
    );
  };

  return (
    <RopaContext.Provider value={{ 
      ropaRecords, 
      addRopaRecord,
      updateRopaFromAssessment
    }}>
      {children}
    </RopaContext.Provider>
  );
};

export const useRopa = () => useContext(RopaContext); 