const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  leadId: {
    type: String,
    required: true,
    unique: true
  },
  objectId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Sales', 'Buyer'],
    required: true
  },
  company: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'no_feedback', 'in_progress', 'waiting', 'no_success', 'order_placed', 'completed'],
    default: 'new'
  },
  subscription: {
    type: String,
    enum: ['prepaid', 'premium'],
    required: true
  },
  broker: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);