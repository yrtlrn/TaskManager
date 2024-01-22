const express = require('express');
const router = express.Router();
const { createTask,getTasks } = require('../controller/taskCon');

router.route('/').post(createTask).get(getTasks)

module.exports = router;
