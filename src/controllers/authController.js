const jwt = require("jsonwebtoken");
const User = require('../models/user');

async function login(req, res) {
  /* 
        #swagger.tags = ['auth']
        #swagger.description = "Please login/create account to using api"
        */
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ user_id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login
};