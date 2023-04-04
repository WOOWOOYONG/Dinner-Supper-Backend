const Dinner = require('../models/dinnerModel');
const mongoose = require('mongoose');

// get all dinners
const getDinners = async (req, res) => {
  const dinners = await Dinner.find({}).sort({ createdAt: -1 });
  res.status(200).json(dinners);
};
// get a single dinner
const getDinner = async (req, res) => {
  const { id } = req.params;
  //檢查id是否合法
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '找不到這個東東' });
  }

  const dinner = await Dinner.findById(id);
  if (!dinner) {
    return res.status(400).json({ error: '找不到這個東東' });
  }

  res.status(200).json(dinner);
};

// create new dinner
const createDinner = async (req, res) => {
  const { name, imgUrl, address, type } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push('name');
  }
  if (!imgUrl) {
    emptyFields.push('imgUrl');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!type) {
    emptyFields.push('type');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: '請填寫正確資料', emptyFields });
  }

  try {
    const dinner = await Dinner.create({ name, imgUrl, address, type });
    res.status(200).json(dinner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a dinner
const deleteDinner = async (req, res) => {
  const { id } = req.params;
  //檢查id是否合法
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '找不到這個東東' });
  }

  const dinner = await Dinner.findOneAndDelete({ _id: id });
  if (!dinner) {
    return res.status(400).json({ error: '找不到這個東東' });
  }
  res.status(200).json(dinner);
};

// update a dinner
const updateDinner = async (req, res) => {
  const { id } = req.params;
  //檢查id是否合法
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: '找不到這個東東' });
  }

  const dinner = await Dinner.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!dinner) {
    return res.status(400).json({ error: '找不到這個東東' });
  }
  res.status(200).json(dinner);
};

module.exports = {
  getDinners,
  getDinner,
  createDinner,
  deleteDinner,
  updateDinner,
};
