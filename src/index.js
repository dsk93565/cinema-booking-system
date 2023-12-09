import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './DataContext';
import App from './pages/App';
import './stylings/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  
);