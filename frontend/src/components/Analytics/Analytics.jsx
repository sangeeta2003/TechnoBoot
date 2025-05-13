import React from 'react';

const Analytics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Placeholders */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lead Conversion Rate</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart Placeholder
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Leads</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;