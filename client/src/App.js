import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import TestDashboard from './pages/testDashboard';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/testDashboard" element={<TestDashboard />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;