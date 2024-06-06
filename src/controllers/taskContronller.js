const taskService = require('../services/taskServices');
const User = require('../models/user');
const {parseToObjectID} = require("../utils");


async function createTask(req, res) {
   /* 
        #swagger.tags = ['task']
        #swagger.description = "create a task (just for PM role)"
        */
  const { title, description } = req.body;
  try {
    const newTask = await taskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTasks(req, res) {
  /* 
        #swagger.tags = ['task']
        #swagger.description = "get list task in system"
        */
  try {
    const {status,title} = req.query
    const tasks = await taskService.getAllTasks(req.query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res) {
  /* 
        #swagger.tags = ['task']
        #swagger.description = "get task by id"
        */
  const { id } = req.params;
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  /* 
        #swagger.tags = ['task']
        #swagger.description = "(just for PM role) update task status('completed/incomplete') or assign task to dev('pass user_id parameter')"
        */
  const { id } = req.params;
  const {status,assignTo} = req.body;
  try {
    const updatedTask = await taskService.updateTask(id, status,assignTo);
    await User.findByIdAndUpdate(
      parseToObjectID(assignTo),
      { $push: { tasks: parseToObjectID(id) } },
     {new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  /* 
        #swagger.tags = ['task']
        #swagger.description = "(just for PM role) delete one task"
        */
  const { id } = req.params;
  try {
    await taskService.deleteTask(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
