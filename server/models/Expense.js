const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  // Define your expense schema here
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
