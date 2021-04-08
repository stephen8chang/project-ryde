const User = require('../models/User');
const bcrypt = require('bcryptjs');
module.exports = app => {
  app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      const user = new User({
        firstName,
        lastName,
        email,
        password
      });
      await user.save();
    } else {
      res.send({ message: 'Error: Email already exists' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      res.send({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Email and password does not match');
      res.send({ message: 'Email and password does not match' });
    }
    console.log('User exists');
    res.send({ message: 'Email and password match!' });
    return user;
  });

  app.get('/api/getUserInfo', async (req, res) => {
    
  })
};
