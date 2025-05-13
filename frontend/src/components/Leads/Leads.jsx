// import React, { useState } from 'react';

// const Leads = () => {
//   const [leads] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New', date: '2024-03-20' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted', date: '2024-03-19' },
//   ]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
//           <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
//             Add New Lead
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {leads.map((lead) => (
//                 <tr key={lead.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       lead.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
//                     }`}>
//                       {lead.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{lead.date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button className="text-primary hover:text-secondary mr-3">Edit</button>
//                     <button className="text-red-600 hover:text-red-900">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leads;

import React, { useState } from 'react';

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [status, setStatus] = useState('');
  const [subscription, setSubscription] = useState('');
  const [leadType, setLeadType] = useState('');
  const [broker, setBroker] = useState('');

  // Mock data - replace with your actual data
  const leads = [
    {
      date: '2024-03-20',
      leadId: 'L001',
      objectId: 'P001',
      type: 'Sales',
      company: 'ABC Corp',
      name: 'John Doe',
      act: 'View'
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Act</th>
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
                  <button className="text-indigo-600 hover:text-indigo-900">{lead.act}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;