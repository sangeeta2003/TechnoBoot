import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Quality = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [qualityMetrics, setQualityMetrics] = useState({
    overall: 0,
    performance: 0,
    reliability: 0,
    usability: 0,
    security: 0
  });
  const [issues, setIssues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch quality data
  useEffect(() => {
    fetchQualityData();
  }, []);

  // Mock API call - Replace with your actual API
  const fetchQualityData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockMetrics = {
        overall: 85,
        performance: 90,
        reliability: 88,
        usability: 82,
        security: 92
      };

      const mockIssues = [
        {
          id: 'QI001',
          title: 'Slow Page Load Time',
          category: 'Performance',
          severity: 'High',
          status: 'Open',
          assignedTo: 'John Doe',
          createdAt: '2024-03-20',
          lastUpdated: '2024-03-20',
          description: 'Homepage takes more than 3 seconds to load'
        },
        {
          id: 'QI002',
          title: 'Login Form Validation',
          category: 'Usability',
          severity: 'Medium',
          status: 'In Progress',
          assignedTo: 'Jane Smith',
          createdAt: '2024-03-19',
          lastUpdated: '2024-03-20',
          description: 'Form validation messages are not clear'
        }
      ];

      setQualityMetrics(mockMetrics);
      setIssues(mockIssues);
    } catch (error) {
      toast.error('Failed to fetch quality data');
      console.error('Error fetching quality data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter issues based on search and category
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleViewIssue = (issueId) => {
    // Implement view issue logic
    console.log('Viewing issue:', issueId);
    // You can add navigation or modal opening logic here
  };

  const handleEditIssue = (issueId) => {
    // Implement edit issue logic
    console.log('Editing issue:', issueId);
    // You can add navigation or modal opening logic here
  };

  const handleDeleteIssue = (issueId) => {
    // Implement delete issue logic
    console.log('Deleting issue:', issueId);
    // Add confirmation dialog before deletion
    if (window.confirm('Are you sure you want to delete this issue?')) {
      // Add your delete API call here
      toast.success('Issue deleted successfully');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality Management</h1>
          <p className="text-gray-600 mt-1">Monitor and improve product quality</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Report Issue
        </motion.button>
      </motion.div>

      {/* Quality Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">Overall Quality</h3>
          <div className="mt-2 flex items-center">
            <div className="text-2xl font-bold text-gray-900">{qualityMetrics.overall}%</div>
            <div className="ml-2 text-sm text-green-600">↑ 2%</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full" 
              style={{ width: `${qualityMetrics.overall}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">Performance</h3>
          <div className="mt-2 flex items-center">
            <div className="text-2xl font-bold text-gray-900">{qualityMetrics.performance}%</div>
            <div className="ml-2 text-sm text-green-600">↑ 3%</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full" 
              style={{ width: `${qualityMetrics.performance}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">Reliability</h3>
          <div className="mt-2 flex items-center">
            <div className="text-2xl font-bold text-gray-900">{qualityMetrics.reliability}%</div>
            <div className="ml-2 text-sm text-green-600">↑ 1%</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-yellow-600 rounded-full" 
              style={{ width: `${qualityMetrics.reliability}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">Usability</h3>
          <div className="mt-2 flex items-center">
            <div className="text-2xl font-bold text-gray-900">{qualityMetrics.usability}%</div>
            <div className="ml-2 text-sm text-red-600">↓ 1%</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-purple-600 rounded-full" 
              style={{ width: `${qualityMetrics.usability}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-sm font-medium text-gray-500">Security</h3>
          <div className="mt-2 flex items-center">
            <div className="text-2xl font-bold text-gray-900">{qualityMetrics.security}%</div>
            <div className="ml-2 text-sm text-green-600">↑ 2%</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-red-600 rounded-full" 
              style={{ width: `${qualityMetrics.security}%` }}
            ></div>
          </div>
        </motion.div>
      </div>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search issues..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Performance">Performance</option>
            <option value="Usability">Usability</option>
            <option value="Reliability">Reliability</option>
            <option value="Security">Security</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </motion.button>
      </div>

      {/* Additional Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Assignees</option>
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Issues List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quality Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <motion.tr
                  key={issue.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                    <div className="text-sm text-gray-500">{issue.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {issue.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.severity === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : issue.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.status === 'Open' 
                        ? 'bg-red-100 text-red-800'
                        : issue.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issue.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewIssue(issue.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditIssue(issue.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Quality;