const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  deleteTask,
  getSingleTask,
  updateTask,
} = require('../controller/taskCon');

router.route('/').post(createTask).get(getTasks)
router.route('/:id').delete(deleteTask).patch(updateTask).get(getSingleTask);

module.exports = router;
