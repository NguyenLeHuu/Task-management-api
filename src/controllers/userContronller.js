const userService = require('../services/userService');

async function createUser(req, res) {
  /* 
        #swagger.tags = ['user']
        */
  const { username, password } = req.body;
  try {
    const newUser = await userService.createUser(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  /* 
        #swagger.tags = ['user']
        */
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  /* 
        #swagger.tags = ['user']
        */
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  /* 
        #swagger.tags = ['user']
        */
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await userService.updateUser(id, userData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  /* 
        #swagger.tags = ['user']
        */
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
