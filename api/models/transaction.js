const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  items: [
    {
      category: { type: String },
      account: { type: String },
      amount: { type: Number },
      note: { type: String },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model('Transaction', TransactionSchema);
