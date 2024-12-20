import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Retailer from './pages/Retailer';
import NotFoundPage from './pages/NotFoundPage';
import LogInPage from './pages/LogInPage';
import CreateAccountPage from './pages/CreateAccountPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
