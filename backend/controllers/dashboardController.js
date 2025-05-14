const Lead = require('../models/Lead');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const dashboardController = {
  // Get dashboard statistics
  getStats: async (req, res) => {
    try {
      const userId = req.user.id;

      // Get total leads count
      const totalLeads = await Lead.countDocuments({ broker: userId });
      
      // Get active leads count
      const activeLeads = await Lead.countDocuments({ 
        broker: userId,
        status: { $in: ['New', 'In Progress', 'Contacted'] }
      });

      // Get completed leads count
      const completedLeads = await Lead.countDocuments({ 
        broker: userId,
        status: 'Completed'
      });

      // Calculate conversion rate
      const conversionRate = totalLeads > 0 
        ? `${Math.round((completedLeads / totalLeads) * 100)}%`
        : '0%';

      // Get total revenue (sum of all completed leads' values)
      const revenueData = await Lead.aggregate([
        { $match: { broker: userId, status: 'Completed' } },
        { $group: { _id: null, total: { $sum: '$value' } } }
      ]);
      const revenue = revenueData.length > 0 
        ? `€${revenueData[0].total.toLocaleString()}`
        : '€0';

      // Get pending tickets count
      const pendingTickets = await Ticket.countDocuments({ 
        broker: userId,
        status: { $in: ['Open', 'In Progress'] }
      });

      // Get new leads in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const newLeads = await Lead.countDocuments({
        broker: userId,
        createdAt: { $gte: sevenDaysAgo }
      });

      // Get active brokers count (users with active leads)
      const activeBrokers = await User.countDocuments({
        role: 'broker',
        'leads.status': { $in: ['New', 'In Progress', 'Contacted'] }
      });

      res.json({
        success: true,
        data: {
          totalLeads,
          activeLeads,
          completedLeads,
          conversionRate,
          revenue,
          pendingTickets,
          newLeads,
          activeBrokers
        }
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching dashboard statistics'
      });
    }
  },

  // Get recent leads
  getRecentLeads: async (req, res) => {
    try {
      const userId = req.user.id;
      const recentLeads = await Lead.find({ broker: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name type status createdAt')
        .lean();

      const formattedLeads = recentLeads.map(lead => ({
        id: lead._id,
        name: lead.name,
        type: lead.type,
        status: lead.status,
        date: new Date(lead.createdAt).toISOString().split('T')[0]
      }));

      res.json({
        success: true,
        data: formattedLeads
      });
    } catch (error) {
      console.error('Recent leads error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recent leads'
      });
    }
  },

  // Get recent tickets
  getRecentTickets: async (req, res) => {
    try {
      const userId = req.user.id;
      const recentTickets = await Ticket.find({ broker: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title status priority createdAt')
        .lean();

      const formattedTickets = recentTickets.map(ticket => ({
        id: ticket._id,
        title: ticket.title,
        status: ticket.status,
        priority: ticket.priority,
        date: new Date(ticket.createdAt).toISOString().split('T')[0]
      }));

      res.json({
        success: true,
        data: formattedTickets
      });
    } catch (error) {
      console.error('Recent tickets error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recent tickets'
      });
    }
  }
};

module.exports = dashboardController;