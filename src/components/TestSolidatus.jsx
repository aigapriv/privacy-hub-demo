import React, { useState } from 'react';
import { MODEL_ID, ENTITY_ID } from '../services/solidatusApi';

const TestSolidatus = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_TOKEN = 'A335FF4247D2D8F819EFA8D689C2FCAE962D01F89A5A4EC4AFFA8B7EEF808AB3';
  const BASE_URL = 'https://trial.solidatus.com';

  const testConnection = async () => {
    setIsLoading(true);
    try {
      // First try to get model details using v1 API
      const modelUrl = `${BASE_URL}/api/v1/models/${MODEL_ID}`;
      console.log('Testing model access:', modelUrl);

      const response = await fetch(modelUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        setConnectionStatus('Connection successful! ✅');
        console.log('Model data:', data);
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      setConnectionStatus('Connection failed! ❌');
      setErrorDetails(`
Error: ${error.message}

Request Details:
- URL: ${BASE_URL}/api/v1/models/${MODEL_ID}
- Method: GET
- Headers:
  * Authorization: Bearer [TOKEN]
  * Content-Type: application/json
  * Accept: application/json

Please verify:
1. API token is correct
2. Model ID is correct
3. You have API access permissions

Documentation Example:
curl --header "Content-Type: application/json" \\
  --header "Authorization: Bearer API_TOKEN" \\
  --request GET \\
  ${BASE_URL}/api/v1/models/${MODEL_ID}
`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p>Testing connection for:</p>
      <ul>
        <li>Base URL: {BASE_URL}</li>
        <li>Model ID: {MODEL_ID}</li>
        <li>Entity ID: {ENTITY_ID}</li>
        <li>Token Present: Yes (length: {API_TOKEN.length})</li>
        <li>API Version: v1</li>
      </ul>
      <button 
        onClick={testConnection} 
        disabled={isLoading}
        style={{
          padding: '8px 16px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>
      {connectionStatus && (
        <p style={{ 
          color: connectionStatus.includes('❌') ? 'red' : 'green',
          marginTop: '10px',
          fontWeight: 'bold'
        }}>
          {connectionStatus}
        </p>
      )}
      {errorDetails && (
        <div style={{ 
          color: 'red', 
          marginTop: '10px', 
          whiteSpace: 'pre-wrap',
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <p>Error Details:</p>
          <pre>{errorDetails}</pre>
        </div>
      )}
    </div>
  );
};

export default TestSolidatus; 