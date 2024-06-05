const taskService = require('../services/taskServices');

async function createTask(req, res) {
   /* 
        #swagger.tags = ['task']
        */
  const { title, description, status } = req.body;
  try {
    const newTask = await taskService.createTask(title, description, status);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTasks(req, res) {
  /* 
        #swagger.tags = ['task']
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
        */
  const { id } = req.params;
  const taskData = req.body;
  try {
    const updatedTask = await taskService.updateTask(id, taskData);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  /* 
        #swagger.tags = ['task']
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
