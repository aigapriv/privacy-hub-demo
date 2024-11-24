import React, { useState, useEffect } from 'react';

export default function ApiTest() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://trial.solidatus.com/api/v1/models/67437d4fed10ecee1b215e7b/load', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer A335FF4247D2D8F819EFA8D689C2FCAE962D01F89A5A4EC4AFFA8B7EEF808AB3'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Solidatus API Test</h1>
            
            <button 
                onClick={fetchData}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
                Test API Connection
            </button>

            {isLoading && <p>Loading...</p>}
            
            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}

            {data && (
                <div>
                    <h2 className="text-xl font-bold mb-2">API Response:</h2>
                    <div className="bg-gray-100 p-4 rounded">
                        <h3 className="font-bold">Model Name: {data.model?.name}</h3>
                        <p>Model ID: {data.model?.id}</p>
                        <p>Owner: {data.model?.owner?.name}</p>
                        
                        <h3 className="font-bold mt-4">Test Entity 2 Children:</h3>
                        <ul className="list-disc pl-5">
                            {data.data?.entities['a107c87c-bc61-4016-ba0e-efe2cf09d04b']?.children.map(childId => (
                                <li key={childId}>
                                    {data.data?.entities[childId]?.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <pre className="mt-4 bg-gray-100 p-4 rounded overflow-auto max-h-96">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
} 