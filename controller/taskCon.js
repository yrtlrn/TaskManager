const Tasks = require('../models/Tasks');

const createTask = async (req, res) => {
  const reqBody = req.body.data;
  console.log(reqBody);
};

const getTasks = async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks });
};

module.exports = {
  createTask,
  getTasks,
};
