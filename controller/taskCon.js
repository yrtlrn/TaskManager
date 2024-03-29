const Tasks = require('../models/Tasks');

const createTask = async (req, res) => {
  try {
    const reqBody = req.body.data;
    await Tasks.create({ name: reqBody, completed: false });
    res.status(201).json({ reqBody });
  } catch (error) {
    res.status(400).json({ msg: error.messge });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ msg: error.messge });
  }
};

const deleteTask = async (req, res) => {
  const task = await Tasks.findById(req.params.id);
  try {
    if (task) {
      await Tasks.findOneAndDelete({ _id: req.params.id });
      res.status(201).json({ task });
      return;
    }
    res.status(404).json({ msg: 'Task not found' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (task) {
      res.status(200).json(task);
      return;
    }
    res.status(404).json({ msg: 'Task not found' });
  } catch (error) {
    res.status(404).json({ msg: "Task not found" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    const newData = req.body.data;
    if (task) {
      await Tasks.findByIdAndUpdate(
        task._id,
        {
          name: newData.newTask,
          completed: newData.checkboxStatus,
        },
        { runValidators: true }
      );
      res.status(200).json(task);
      return;
    }
    console.log('Task not found - backend');
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  getSingleTask,
  updateTask,
};
