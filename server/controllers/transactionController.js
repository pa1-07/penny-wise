const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    const dateFilter =
      frequency !== "custom"
        ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
        : { date: { $gte: selectedDate[0], $lte: selectedDate[1] } };

    const typeFilter = type !== "all" ? { type } : {};

    // Fetch data only if pass inputs Frequency & selectedDate & type & userid
    const transactions = await transactionModel.find({
      ...dateFilter,
      ...typeFilter,
      userid,
    });

    res.status(200).json({ success: true, transactions });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

const getDashboardTransaction = async (req, res) => {
  try {
    const { userid } = req.body;

    // Fetch transactions only by userid
    const transactions = await transactionModel.find({ userid });

    res.status(200).json({ success: true, transactions });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, error: e.message });
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

const editTransaction = async (req, res) => {
  try {
    const editTransaction = await transactionModel.findOneAndUpdate(
      {_id: req.body.transactionid},
      req.body.payload
    )
    res.status(200).send({success:true, editTransaction})
  } catch (e) {
    console.error(e);
    res.status(400).send({ success: false, e });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  getDashboardTransaction,
  editTransaction,
};
