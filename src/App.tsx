import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AdminUser from './features/Admin/User/AdminUser';
import Manageprojects from './features/ProjectManager/Content/Manageprojects';
import Login from './features/Login/Content/Login';
import Sidebar from './features/Sidebar/Content/Sidebar';
import MainContent from './features/Maincontent/MainContent';
import Titlebar from './features/Titlebar/Content/Titlebar';
import PrivateRoute from './features/PrivateRoute/PrivateRoute';
import LogoutButton from './features/Logout/Content/LogoutButton';
import Dashboard from './features/Dashboard/Content/Dashboard';
import CreateAccount from './features/CreateAccount/Content/CreateAccount';
import ForgotPassword from './features/ForgotPassword/Content/ForgotPassword';

const App: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarVisible] = useState<boolean>(true);
  const location = useLocation();
  const isLoginPage = useMemo(() => location.pathname === '/login', [location.pathname]);

  return (
    <div className={`app-timesheet ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      {!isLoginPage && <Sidebar userName={''} email={''} />}
      {!isLoginPage && <Titlebar />}
      {!isLoginPage && <LogoutButton />}
      <div className="main-content">
        <Routes>
          {/* Add the routes for Login, CreateAccount, and ForgotPassword */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<MainContent page={''} />} />
            <Route path="/profile" element={<MainContent page={''} />} />
            <Route path="/users" element={<AdminUser />} />
            <Route path="/roles" element={<MainContent page={''} />} />
            <Route path="/configuration" element={<MainContent page={''} />} />
            <Route path="/clients" element={<MainContent page={''} />} />
            <Route path="/tasks" element={<MainContent page={''} />} />
            <Route path="/leave-types" element={<MainContent page={''} />} />
            <Route path="/branches" element={<MainContent page={''} />} />
            <Route path="/position" element={<MainContent page={''} />} />
            <Route path="/capability" element={<MainContent page={''} />} />
            <Route path="/capability-settings" element={<MainContent page={''} />} />
            <Route path="/calendar-settings" element={<MainContent page={''} />} />
            <Route path="/clock" element={<MainContent page={''} />} />
            <Route path="/projects" element={<Manageprojects />} />
            <Route path="/timesheets" element={<MainContent page={''} />} />
            <Route path="/requests" element={<MainContent page={''} />} />
            <Route path="/working-time" element={<MainContent page={''} />} />
            <Route path="/manage-timesheet" element={<MainContent page={''} />} />
            <Route path="/manage-requests" element={<MainContent page={''} />} />
            <Route path="/manage-working-times" element={<MainContent page={''} />} />
            <Route path="/manage-working" element={<MainContent page={''} />} />
            <Route path="/manage-supervised" element={<MainContent page={''} />} />
            <Route path="/manage-todo" element={<MainContent page={''} />} />
            <Route path="/manage-messages" element={<MainContent page={''} />} />
            <Route path="/manage-documents" element={<MainContent page={''} />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
