import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the prediction form after landing on the dashboard
    navigate('/process_video');
  }, [navigate]);

  return <div>Redirecting to Prediction Form...</div>;
};

export default Dashboard;
