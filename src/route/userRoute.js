const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContronller');
const { isAuthenticated,isPM,isDev,userOfSystem } = require('../middleware/AuthMiddleware');

router.post('/', userController.createUser);
router.get('/',isAuthenticated,userOfSystem, userController.getAllUsers);
router.get('/:id',isAuthenticated,userOfSystem, userController.getUserById);
router.put('/:id',isAuthenticated,userOfSystem, userController.updateUser);
router.delete('/:id',isAuthenticated,userOfSystem, userController.deleteUser);

module.exports = router;
