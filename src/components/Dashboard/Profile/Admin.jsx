import React, { useState } from 'react';
import './Admin.css';

const ManageUsers = () => (
  <div>
    <h2>Manage Users</h2>
    <p>name:"h1", email:"h1@gmail.com", password:"h1"</p>
    <p>name:"123", email:"123@gmail.com", password:"123"</p>
  </div>
);

const AdminSettings = () => (
  <div>
    <h2>Admin Settings</h2>
    <p>Update system preferences here.</p>
  </div>
);
//
const AdminDashboard = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <p>Dashboard</p>
    <p>Welcome to the admin control panel.</p>
  </div>
);

const Admin = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'manageUsers':
        return <ManageUsers />;
      case 'settings':
        return <AdminSettings />;
      case 'dashboard':
      default:
        return <AdminDashboard />;
    }
  };

  // ... inside Admin component's return
return (
  <div className="adminProfile">
    <nav className="adminNav">
      <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
      <button onClick={() => setCurrentView('manageUsers')}>Manage Users</button>
      <button onClick={() => setCurrentView('settings')}>Settings</button>
    </nav>

    <div className="main-screen"> {/* Reuse your main-screen styles here */}
      {renderView()}
    </div>
  </div>
);

};

export default Admin;
