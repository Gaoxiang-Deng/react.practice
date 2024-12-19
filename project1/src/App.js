/*
 * @Author: Deng nelsondeng0701@gmail.com
 * @Date: 2024-07-05 20:55:16
 * @LastEditors: Deng nelsondeng0701@gmail.com
 * @LastEditTime: 2024-09-09 21:17:29
 * @FilePath: /project1/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import EnhancedTable from './exhancedTable1';
import SearchAppBar from './header';
import SignIn from './login1';

const isAuthenticated = localStorage.getItem('react-project-token');
function App() {

  
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  return (
    <div>
      {/* 将 handleSearch 传递给 SearchAppBar */}
      <SearchAppBar onSignOut={handleSignOut} handleSearch={handleSearch} />
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard searchQuery={searchQuery} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/products" 
          element={isAuthenticated ? <EnhancedTable searchQuery={searchQuery} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route 
          path="*" 
          element={<Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

function handleSignOut() {
  localStorage.removeItem('react-project-token');
  const isAuthenticated = false;
  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/" /> } 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="*" 
        element={<Navigate to="/" />} 
      />
    </Routes>
  );
}


function Dashboard({ searchQuery }) {
  return (
    <div>
      <EnhancedTable searchQuery={searchQuery} />
    </div>
  );
}

export default App;
