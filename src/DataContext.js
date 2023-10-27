import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState('');

  const setSharedData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, setSharedData }}>
      {children}
    </DataContext.Provider>
  );
}
