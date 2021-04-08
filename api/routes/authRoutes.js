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
      res.send({ message: 'Registered!', redirectUrl: '/login' });
    } else {
      res.send({ message: 'Email already exists.' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: 'User does not exist.'
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send({ message: 'Email and password does not match' });
      }
      req.session.user = user;
      return res.status(200).json({
        message: 'Logged in!',
        redirectUrl: '/'
      });
    }
  });
  app.get('/api/user', async (req, res) => {
    res.send(req.session.user);
  });
  app.get('/api/logout', async (req, res) => {
    req.session.destroy(err => {});
    res.redirect('/');
  });

  app.get('/api/getUserInfo', async (req, res) => {
    
  })
};
