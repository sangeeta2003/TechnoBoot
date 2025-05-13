// import React from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           Welcome, {user?.name || 'User'}!
//         </h1>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-blue-50 p-6 rounded-lg">
//             <h2 className="text-xl font-semibold text-blue-800 mb-2">Total Leads</h2>
//             <p className="text-3xl font-bold text-blue-600">0</p>
//           </div>
          
//           <div className="bg-green-50 p-6 rounded-lg">
//             <h2 className="text-xl font-semibold text-green-800 mb-2">Active Projects</h2>
//             <p className="text-3xl font-bold text-green-600">0</p>
//           </div>
          
//           <div className="bg-purple-50 p-6 rounded-lg">
//             <h2 className="text-xl font-semibold text-purple-800 mb-2">Tasks</h2>
//             <p className="text-3xl font-bold text-purple-600">0</p>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-gray-50 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
//           <div className="space-y-4">
//             <p className="text-gray-600">No recent activity</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data - replace with your actual data
  const stats = {
    totalLeads: 1250,
    activeLeads: 450,
    completedLeads: 800,
    conversionRate: '64%',
    revenue: '€125,000',
    pendingTickets: 15,
    newLeads: 25,
    activeBrokers: 45
  };

  const recentLeads = [
    {
      id: 'L001',
      name: 'John Doe',
      type: 'Buyer',
      status: 'In Progress',
      date: '2024-03-20'
    },
    {
      id: 'L002',
      name: 'Jane Smith',
      type: 'Seller',
      status: 'New',
      date: '2024-03-19'
    },
    {
      id: 'L003',
      name: 'Mike Johnson',
      type: 'Buyer',
      status: 'Completed',
      date: '2024-03-18'
    }
  ];

  const recentTickets = [
    {
      id: 'T001',
      title: 'Property Viewing Request',
      status: 'Open',
      priority: 'High',
      date: '2024-03-20'
    },
    {
      id: 'T002',
      title: 'Document Verification',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-03-19'
    },
    {
      id: 'T003',
      title: 'Contract Review',
      status: 'Pending',
      priority: 'Low',
      date: '2024-03-18'
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Leads Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLeads}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.activeLeads}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.revenue}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingTickets}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm font-medium">↑ 3</span>
            <span className="text-gray-500 text-sm ml-2">from yesterday</span>
          </div>
        </div>
      </div>
            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
              <Link to="/leads" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
            </div>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {lead.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {lead.type} • {lead.status}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-sm text-gray-500">{lead.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
              <Link to="/tickets" className="text-sm text-blue-600 hover:text-blue-800">View All</Link>
            </div>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentTickets.map((ticket) => (
                  <li key={ticket.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {ticket.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ticket.status} • {ticket.priority} Priority
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-sm text-gray-500">{ticket.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/leads/new"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">New Lead</h3>
                <p className="text-sm text-gray-500">Create a new lead entry</p>
              </div>
            </div>
          </Link>

          <Link
            to="/tickets/new"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">New Ticket</h3>
                <p className="text-sm text-gray-500">Create a support ticket</p>
              </div>
            </div>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Reports</h3>
                <p className="text-sm text-gray-500">View performance reports</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;