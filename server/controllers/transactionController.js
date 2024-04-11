const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const transactions = await transactionModel.find({});
    res.status(200).json({ success: true, transactions });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, e });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();

    res.status(201).json({ success: true, newTransaction });
  } catch (e) {
    console.error(e);
    res.status(400).send({ success: false, e });
  }
};

module.exports = { getAllTransaction, addTransaction };
