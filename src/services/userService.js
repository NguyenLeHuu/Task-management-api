const User = require('../models/user');
const {parseToObjectID} = require("../utils");

async function createUser(username, password) {
  try {
    const newUser = new User({ username, password });
    return await newUser.save();
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllUsers() {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(error);
  }
}

async function getUserById(id) {
  try {
    return await User.findById(parseToObjectID(id));
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUser(id, userData) {
  try {
    return await User.findByIdAndUpdate(parseToObjectID(id), userData, { new: true });
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(parseToObjectID(id));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
