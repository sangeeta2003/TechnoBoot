import React, { useState, useEffect } from 'react';
import { leadService } from '../../services/leadService';
import { toast } from 'react-toastify';

const Leads = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [status, setStatus] = useState('');
  const [subscription, setSubscription] = useState('');
  const [leadType, setLeadType] = useState('');
  const [broker, setBroker] = useState('');

  // State for data and loading
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'new',
    company: '',
    type: '',
    leadId: '',
    objectId: ''
  });

  // Fetch leads when filters change
  useEffect(() => {
    fetchLeads();
  }, [searchTerm, postalCode, dateFrom, dateUntil, status, subscription, leadType, broker, currentPage]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const filters = {
        searchTerm,
        postalCode,
        dateFrom,
        dateUntil,
        status,
        subscription,
        leadType,
        broker,
        page: currentPage
      };
      const { data, total, pages } = await leadService.getLeads(filters);
      setLeads(data);
      setTotalLeads(total);
      setTotalPages(pages);
      setError(null);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      await leadService.exportLeads({
        searchTerm,
        postalCode,
        dateFrom,
        dateUntil,
        status,
        subscription,
        leadType,
        broker
      });
      toast.success('Leads exported successfully');
    } catch (error) {
      toast.error('Failed to export leads');
    }
  };

  const handleView = (id) => {
    // Implement view logic
    console.log('View lead:', id);
  };

  const handleEdit = async (id) => {
    try {
      const lead = await leadService.getLeadById(id);
      setFormData(lead);
      setEditingLead(id);
      setShowModal(true);
    } catch (error) {
      toast.error('Failed to fetch lead details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await leadService.updateLead(editingLead, formData);
        toast.success('Lead updated successfully');
      } else {
        await leadService.createLead(formData);
        toast.success('Lead created successfully');
      }
      setShowModal(false);
      fetchLeads();
    } catch (error) {
      toast.error(editingLead ? 'Failed to update lead' : 'Failed to create lead');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Add New Lead
          </button>
          <button
            onClick={handleExport}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Export Leads
          </button>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Customer ID, Lead ID, Property ID, Agent, Name"
            className="border rounded-md p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Postal Code"
            className="border rounded-md p-2"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <div className="relative">
            <input
              type="date"
              className="border rounded-md p-2 w-full"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span className="absolute right-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <div className="relative">
            <input
              type="date"
              className="border rounded-md p-2 w-full"
              value={dateUntil}
              onChange={(e) => setDateUntil(e.target.value)}
            />
            <span className="absolute right-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
        </div>
                {/* Filters Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            className="border rounded-md p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="no_feedback">No Feedback</option>
            <option value="in_progress">In Progress</option>
            <option value="waiting">Waiting</option>
            <option value="no_success">No Success</option>
            <option value="order_placed">Order Placed</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="border rounded-md p-2"
            value={subscription}
            onChange={(e) => setSubscription(e.target.value)}
          >
            <option value="">Subscription</option>
            <option value="prepaid">Prepaid</option>
            <option value="premium">Premium</option>
          </select>

          <select
            className="border rounded-md p-2"
            value={leadType}
            onChange={(e) => setLeadType(e.target.value)}
          >
            <option value="">Lead Object Type</option>
            <option value="salesperson">Salesperson</option>
            <option value="buyer">Buyer</option>
          </select>

          <select
            className="border rounded-md p-2"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          >
            <option value="">Broker Prime</option>
            <option value="broker1">Broker 1</option>
            <option value="broker2">Broker 2</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.leadId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.objectId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleView(lead.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEdit(lead.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {leads.length} of {totalLeads} leads
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingLead ? 'Edit Lead' : 'Add New Lead'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md p-2"
                    required
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                >
                  {editingLead ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;