import axios from '../utils/axios';

class DashboardService {
  async getStats() {
    try {
      // For development, return mock data
      return {
        totalLeads: 150,
        activeLeads: 45,
        completedLeads: 105,
        conversionRate: '70%',
        revenue: '€45,000',
        pendingTickets: 12,
        newLeads: 8,
        activeBrokers: 15
      };

      // Uncomment this when your backend is ready
      // const response = await axios.get('/api/dashboard/stats');
      // return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRecentLeads() {
    try {
      // For development, return mock data
      return [
        {
          id: 1,
          name: 'John Doe',
          type: 'Property',
          status: 'Active',
          date: '2024-03-15',
          email: 'john@example.com',
          phone: '+1234567890',
          source: 'Website'
        },
        {
          id: 2,
          name: 'Jane Smith',
          type: 'Mortgage',
          status: 'Pending',
          date: '2024-03-14',
          email: 'jane@example.com',
          phone: '+1987654321',
          source: 'Referral'
        }
      ];

      // Uncomment this when your backend is ready
      // const response = await axios.get('/api/dashboard/recent-leads');
      // return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRecentTickets() {
    try {
      // For development, return mock data
      return [
        {
          id: 1,
          title: 'Property Viewing Request',
          status: 'Open',
          priority: 'High',
          date: '2024-03-15',
          assignedTo: 'John Broker',
          category: 'Viewing'
        },
        {
          id: 2,
          title: 'Mortgage Application',
          status: 'In Progress',
          priority: 'Medium',
          date: '2024-03-14',
          assignedTo: 'Sarah Agent',
          category: 'Mortgage'
        }
      ];

      // Uncomment this when your backend is ready
      // const response = await axios.get('/api/dashboard/recent-tickets');
      // return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      return new Error('No response from server');
    } else {
      return new Error('Error setting up request');
    }
  }
}

export const dashboardService = new DashboardService();