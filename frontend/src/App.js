import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import BrokerLeads from './components/BrokerLeads/BrokerLeads';
import Leads from './components/Leads/Leads';
import Tickets from './components/Tickets/Tickets';
import PostalCodes from './components/PostalCodes/PostalCodes';
import Support from './components/Support/Support';
import Quality from './components/Quality/Quality';
import Finance from './components/Finance/Finance';
import Statistics from './components/Statistics/Statistics';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <div>
                  <Navbar />
                  <div className="flex">
                    <Sidebar />
                    <main className="ml-64 mt-16 p-8 flex-1">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/broker-leads" element={<BrokerLeads />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/postal-codes" element={<PostalCodes />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/quality" element={<Quality />} />
                        <Route path="/finance" element={<Finance />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/broker-leads" element={<BrokerLeads />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/postal-codes" element={<PostalCodes />} />
            <Route path="/support" element={<Support />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;