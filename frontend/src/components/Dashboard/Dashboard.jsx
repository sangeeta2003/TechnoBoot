import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardServices';
import { websocketService } from '../../services/websocketService';
import { exportService } from '../../services/exportService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalLeads: 0,
      activeLeads: 0,
      completedLeads: 0,
      conversionRate: '0%',
      revenue: '€0',
      pendingTickets: 0,
      newLeads: 0,
      activeBrokers: 0
    },
    recentLeads: [],
    recentTickets: []
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [stats, recentLeads, recentTickets] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentLeads(),
        dashboardService.getRecentTickets()
      ]);

      setDashboardData({
        stats,
        recentLeads,
        recentTickets
      });
    } catch (error) {
      setError(error.message);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Subscribe to real-time updates
    const subscriptionId = websocketService.subscribeToDashboardUpdates((data) => {
      setDashboardData(prevData => ({
        ...prevData,
        ...data
      }));
    });

    return () => {
      websocketService.unsubscribeFromDashboardUpdates(subscriptionId);
    };
  }, []);

  const handleExport = async () => {
    try {
      await exportService.exportToExcel(dashboardData, 'dashboard-report');
      toast.success('Dashboard data exported successfully');
    } catch (error) {
      toast.error('Failed to export dashboard data');
    }
  };

  const refreshData = () => {
    fetchDashboardData();
    toast.info('Refreshing dashboard data...');
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>
      </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Leads Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.totalLeads}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">↑ 12%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        {/* Active Leads Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.activeLeads}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">↑ 8%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.revenue}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">↑ 15%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        {/* Pending Tickets Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">{dashboardData.stats.pendingTickets}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm font-medium">↑ 3%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Leads and Tickets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lead.status === 'Active' ? 'bg-green-100 text-green-800' :
                      lead.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                    <Link
                      to={`/leads/${lead.id}`}
                      className="text-primary hover:text-primary-dark"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Tickets</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {ticket.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                      <p className="text-sm text-gray-500">{ticket.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-primary hover:text-primary-dark"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;