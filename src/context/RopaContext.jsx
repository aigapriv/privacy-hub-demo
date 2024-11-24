import React, { createContext, useContext, useState, useEffect } from 'react';

const RopaContext = createContext();

export const useRopa = () => {
  const context = useContext(RopaContext);
  if (!context) {
    throw new Error('useRopa must be used within a RopaProvider');
  }
  return context;
};

export const RopaProvider = ({ children }) => {
  const [ropaRecords, setRopaRecords] = useState(() => {
    const savedRecords = localStorage.getItem('ropaRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    console.log('Saving ROPA records to localStorage:', ropaRecords);
    localStorage.setItem('ropaRecords', JSON.stringify(ropaRecords));
  }, [ropaRecords]);

  const addRopaRecord = (record) => {
    console.log('Adding ROPA record:', record);
    setRopaRecords(prevRecords => {
      const newRecords = [...prevRecords, record];
      console.log('Updated ROPA records:', newRecords);
      return newRecords;
    });
  };

  return (
    <RopaContext.Provider value={{
      ropaRecords,
      addRopaRecord,
    }}>
      {children}
    </RopaContext.Provider>
  );
}; 