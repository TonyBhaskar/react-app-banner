import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import MainContent from './MainContent';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={
            <div>
              <Banner />
              <MainContent />
            </div>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
