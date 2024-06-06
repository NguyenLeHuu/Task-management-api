const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskContronller');
const { isAuthenticated,isPM,isDev,userOfSystem } = require('../middleware/AuthMiddleware');

router.post('/',isAuthenticated,isPM, taskController.createTask);
router.get('/',isAuthenticated,userOfSystem, taskController.getAllTasks);
router.get('/:id',isAuthenticated,userOfSystem, taskController.getTaskById);
router.put('/:id',isAuthenticated,isPM, taskController.updateTask);
router.delete('/:id', isAuthenticated,isPM,taskController.deleteTask);

module.exports = router;
