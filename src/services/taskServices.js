const Task = require('../models/task');
const {parseToObjectID} = require("../utils");


async function createTask(title, description, status) {
  try {
    const newTask = new Task({ title, description, status });
    return await newTask.save();
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllTasks(payload) {
  try {
    return await Task.find(payload);
  } catch (error) {
    throw new Error(error);
  }
}

async function getTaskById(id) {
  try {
    return await Task.findById(parseToObjectID(id));
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTask(id, taskData) {
  try {
    return await Task.findByIdAndUpdate(parseToObjectID(id), taskData, { new: true });
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(id) {
  try {
    return await Task.findByIdAndDelete(parseToObjectID(id));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
