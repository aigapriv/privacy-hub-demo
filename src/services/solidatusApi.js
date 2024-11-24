// API configuration and functions
const SOLIDATUS_BASE_URL = import.meta.env.VITE_SOLIDATUS_BASE_URL || 'https://trial.solidatus.com/api/v1';
const API_TOKEN = import.meta.env.VITE_SOLIDATUS_API_TOKEN;
const MODEL_ID = import.meta.env.VITE_SOLIDATUS_MODEL_ID || '669f723e16212cd36a509554';
const ENTITY_ID = import.meta.env.VITE_SOLIDATUS_ENTITY_ID || 'ce490be5-dadb-492b-bbbf-65844f7eb261';

// Export your API functions
export { SOLIDATUS_BASE_URL, API_TOKEN, MODEL_ID, ENTITY_ID };
// ... rest of your API functions ... 