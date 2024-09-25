// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
