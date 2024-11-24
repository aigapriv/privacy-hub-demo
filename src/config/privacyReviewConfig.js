export const privacyReviewConfig = {
  // Step definitions
  steps: [
    {
      id: 1,
      title: 'Project Details',
      description: 'Basic project information'
    },
    {
      id: 2,
      title: 'Project Information',
      description: 'Project type and location details'
    },
    {
      id: 3,
      title: 'Data Processing',
      description: 'Data handling information'
    },
    {
      id: 4,
      title: 'Security Measures',
      description: 'Security controls and measures'
    },
    {
      id: 5,
      title: 'Summary',
      description: 'Review and submit'
    }
  ],

  // Dropdown options
  options: {
    businessUnit: [
      { value: 'finance', label: 'Finance' },
      { value: 'hr', label: 'Human Resources' },
      { value: 'it', label: 'Information Technology' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
      { value: 'sales', label: 'Sales' }
    ],

    subUnit: {
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
      // ... other sub units
    },

    projectType: [
      { value: 'new-system', label: 'New System Implementation' },
      { value: 'system-change', label: 'System Change' },
      { value: 'process-change', label: 'Process Change' },
      { value: 'vendor-engagement', label: 'Vendor Engagement' },
      { value: 'other', label: 'Other' }
    ],

    countries: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'eu', label: 'European Union' }
    ],

    sensitiveData: [
      { value: 'health', label: 'Health Information' },
      { value: 'financial', label: 'Financial Information' },
      { value: 'personal', label: 'Personal Information' },
      { value: 'biometric', label: 'Biometric Data' }
    ],

    securityMeasures: [
      { value: 'encryption', label: 'Encryption' },
      { value: 'access-control', label: 'Access Control' },
      { value: 'monitoring', label: 'Monitoring' },
      { value: 'backup', label: 'Backup' }
    ]
  },

  // Form field definitions
  fields: {
    projectDetails: [
      {
        name: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
        placeholder: 'Enter project name',
        tooltip: 'Enter the official name of your project or initiative'
      },
      {
        name: 'businessUnit',
        label: 'Business Unit',
        type: 'select',
        required: true,
        tooltip: 'Select the primary business unit responsible for this project',
        optionsKey: 'businessUnit'
      },
      // ... other fields
    ],

    projectInformation: [
      {
        name: 'projectType',
        label: 'Project Type',
        type: 'select',
        required: true,
        tooltip: 'Select the type of project you are implementing',
        optionsKey: 'projectType'
      },
      {
        name: 'country',
        label: 'Country of Operation',
        type: 'select',
        required: true,
        tooltip: 'Select the primary country where this project will operate',
        optionsKey: 'countries'
      },
      {
        name: 'dueDate',
        label: 'Project Due Date',
        type: 'date',
        required: true,
        tooltip: 'Select the expected completion date for this project'
      }
    ]
  },

  // Summary section configuration
  summary: {
    sections: [
      {
        title: 'Project Information',
        fields: ['projectName', 'businessUnit', 'subUnit', 'businessProcess', 'dueDate']
      },
      {
        title: 'Data Processing Details',
        fields: ['projectType', 'country']
      },
      {
        title: 'Risk Assessment',
        fields: ['sensitiveData']
      },
      {
        title: 'Third Party Sharing',
        fields: ['thirdPartySharing']
      },
      {
        title: 'Security Measures',
        fields: ['securityMeasures']
      }
    ]
  },

  // Validation rules
  validation: {
    required: ['projectName', 'businessUnit', 'subUnit', 'projectType', 'country', 'dueDate'],
    custom: {
      dueDate: (value) => {
        return value > new Date() ? true : 'Due date must be in the future';
      }
    }
  },

  // Tooltips content
  tooltips: {
    projectName: "Enter the official name of your project or initiative",
    businessUnit: "Select the primary business unit responsible for this project",
    subUnit: "Select the specific team or department within the business unit",
    businessProcess: "Choose the main business process this project relates to",
    projectType: "Select the type of project you are implementing",
    country: "Select the primary country where this project will operate",
    dueDate: "Select the expected completion date for this project"
  }
}; 