import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with your actual data
  const supportTickets = [
    {
      id: 'ST001',
      subject: 'Login Issues',
      description: 'Unable to access the platform',
      category: 'Technical',
      status: 'Open',
      priority: 'High',
      user: 'John Doe',
      createdAt: '2024-03-20',
      lastUpdated: '2024-03-20',
      messages: 5
    },
    {
      id: 'ST002',
      subject: 'Billing Question',
      description: 'Invoice clarification needed',
      category: 'Billing',
      status: 'In Progress',
      priority: 'Medium',
      user: 'Jane Smith',
      createdAt: '2024-03-19',
      lastUpdated: '2024-03-20',
      messages: 3
    }
  ];

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create New Ticket
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border rounded-md p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border rounded-md p-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full border rounded-md p-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                    ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-sm font-medium">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                    ${ticket.status === 'Open' ? 'bg-red-100 text-red-800' : 
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>Created: {ticket.createdAt}</p>
                <p>Updated: {ticket.lastUpdated}</p>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex justify-end space-x-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;