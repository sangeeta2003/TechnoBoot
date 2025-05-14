const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  try {
    const {
      searchTerm,
      postalCode,
      dateFrom,
      dateUntil,
      status,
      subscription,
      leadType,
      broker
    } = req.query;

    // Build query
    const query = {};

    if (searchTerm) {
      query.$or = [
        { leadId: { $regex: searchTerm, $options: 'i' } },
        { objectId: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (postalCode) {
      query.postalCode = postalCode;
    }

    if (dateFrom || dateUntil) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateUntil) query.date.$lte = new Date(dateUntil);
    }

    if (status) query.status = status;
    if (subscription) query.subscription = subscription;
    if (leadType) query.type = leadType;
    if (broker) query.broker = broker;

    const leads = await Lead.find(query)
      .sort({ date: -1 })
      .limit(100);

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};