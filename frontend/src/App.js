import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Navbar from './components/Layout/Navbar';
import PredictionForm from './components/PredictionForm';
import TrafficCongestion from './pages/TrafficCongestion'; 

const App = () => (
  <AuthProvider>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/process_video" element={<PredictionForm />} />
        <Route path="/traffic-congestion" element={<TrafficCongestion />} />
      </Routes>
    </div>
  </AuthProvider>
);

export default App;
