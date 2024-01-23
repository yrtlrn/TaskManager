const express = require('express');
const router = express.Router();
const { createTask, getTasks, deleteTask,editTask, updateTask } = require('../controller/taskCon');

router.route('/').post(createTask).get(getTasks)
router.route("/:id").delete(deleteTask).patch(updateTask).get(editTask)

module.exports = router;
