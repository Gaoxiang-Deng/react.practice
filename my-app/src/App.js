import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import DenseTable from './DenseTable';

function App() {
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.clear(); // Clear user session
    setMessage(''); // Reset message state
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage message={message} setMessage={setMessage} />}
        />
       <Route
  path="/products"
  element={
    localStorage.getItem('email') ? (
      <DenseTable handleLogout={handleLogout} />
    ) : (
      <Navigate to="/" />
    )
  }
/>

        <Route
          path="/logout"
          element={
            <Navigate to="/" replace onNavigate={handleLogout} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
