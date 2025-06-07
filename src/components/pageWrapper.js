import React from 'react';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const location = useLocation();

  // ✅ Assign background image based on route
  const backgroundImage = {
    '/login': 'https://images.unsplash.com/photo-1746091066530-4a7c0319df8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '/signup': 'https://images.unsplash.com/photo-1748274048033-6a5644a270ec?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }[location.pathname] || '';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <div className="glass-card">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
